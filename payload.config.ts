import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { fileURLToPath } from 'url'

import { Pages } from '@/payload/collections/Pages'
import { Services } from '@/payload/collections/Services'
import { ServiceAreas } from '@/payload/collections/ServiceAreas'
import { Reviews } from '@/payload/collections/Reviews'
import { Posts } from '@/payload/collections/Posts'
import { Media } from '@/payload/collections/Media'
import { Leads } from '@/payload/collections/Leads'
import { Opportunities } from '@/payload/collections/Opportunities'
import { Users } from '@/payload/collections/Users'

import { SiteSettings } from '@/payload/globals/SiteSettings'
import { Header } from '@/payload/globals/Header'
import { Footer } from '@/payload/globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
  collections: [Pages, Services, ServiceAreas, Reviews, Posts, Media, Leads, Opportunities, Users],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [SiteSettings, Header, Footer],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
