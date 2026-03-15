import { getPayload } from 'payload'
import config from '@payload-config'

type LegacyContactSubmission = {
  id: number | string
  name: string
  email: string
  phone?: string | null
  service?: string | null
  message: string
  source: string
}

function hasFlag(flag: string) {
  return process.argv.includes(flag)
}

async function migrate() {
  const payload = await getPayload({ config })
  const dryRun = hasFlag('--dry-run')
  const deleteSource = hasFlag('--delete-source')

  if (dryRun && deleteSource) {
    throw new Error('Cannot use --delete-source together with --dry-run.')
  }

  let page = 1
  let processed = 0
  let created = 0
  let skipped = 0
  let deleted = 0

  console.log(`Starting legacy contact-submission migration${dryRun ? ' (dry run)' : ''}...`)

  while (true) {
    const result = await payload.find({
      collection: 'contact-submissions',
      limit: 100,
      page,
      sort: 'createdAt',
    })

    if (result.docs.length === 0) {
      break
    }

    for (const rawDoc of result.docs) {
      const doc = rawDoc as unknown as LegacyContactSubmission
      processed += 1
      const legacyId = String(doc.id)

      const existingLead = await payload.find({
        collection: 'leads',
        where: { legacyContactSubmissionId: { equals: legacyId } },
        limit: 1,
      })

      if (existingLead.totalDocs > 0) {
        skipped += 1
        console.log(`Skipping legacy submission ${legacyId}; already migrated.`)
        continue
      }

      if (!dryRun) {
        await payload.create({
          collection: 'leads',
          data: {
            legacyContactSubmissionId: legacyId,
            contactName: doc.name,
            contactEmail: doc.email,
            contactPhone: doc.phone ?? undefined,
            serviceCategory: doc.service ?? undefined,
            inquiryMessage: doc.message,
            contactPath: 'web_form',
            source: 'inbound_form',
            duplicateCheckStatus: 'new',
            outreachStatus: 'notContacted',
          },
        })

        if (deleteSource) {
          await payload.delete({
            collection: 'contact-submissions',
            id: doc.id,
          })
          deleted += 1
        }
      }

      created += 1
      console.log(`${dryRun ? 'Would migrate' : 'Migrated'} legacy submission ${legacyId}.`)
    }

    if (page >= result.totalPages) {
      break
    }

    page += 1
  }

  console.log(
    [
      'Legacy contact-submission migration complete.',
      `Processed: ${processed}`,
      `${dryRun ? 'Would create' : 'Created'}: ${created}`,
      `Skipped: ${skipped}`,
      `${deleteSource ? 'Deleted source rows' : 'Deleted source rows'}: ${deleteSource ? deleted : 0}`,
    ].join(' '),
  )
}

migrate().catch((error) => {
  console.error('Legacy contact-submission migration failed:', error)
  process.exit(1)
})