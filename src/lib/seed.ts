import { getPayload } from 'payload'
import config from '@payload-config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // Create admin user
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'changeme123',
        name: 'Admin',
        role: 'admin',
      },
    })
    console.log('Created admin user (admin@example.com / changeme123)')
  }

  // Create services
  const services = [
    { title: 'Plumbing', summary: 'Professional plumbing services for residential and commercial properties.' },
    { title: 'HVAC', summary: 'Heating, ventilation, and air conditioning installation and repair.' },
    { title: 'Electrical', summary: 'Licensed electrical services, from panel upgrades to full rewiring.' },
    { title: 'Roofing', summary: 'Roof repair, replacement, and maintenance for all types.' },
    { title: 'Landscaping', summary: 'Complete landscaping design, installation, and maintenance.' },
    { title: 'Painting', summary: 'Interior and exterior painting for homes and businesses.' },
  ]

  for (const svc of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { title: { equals: svc.title } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'services',
        data: { ...svc, status: 'published' },
      })
    }
  }
  console.log(`Seeded ${services.length} services`)

  // Create service areas
  const areas = [
    { title: 'Toronto', description: 'Serving downtown Toronto and surrounding neighborhoods.' },
    { title: 'Mississauga', description: 'Full-service coverage across Mississauga.' },
    { title: 'Brampton', description: 'Reliable home services throughout Brampton.' },
    { title: 'Markham', description: 'Professional services in Markham and Unionville.' },
    { title: 'Vaughan', description: 'Trusted services in Vaughan and Woodbridge.' },
    { title: 'Oakville', description: 'Quality home services in Oakville and Burlington.' },
  ]

  for (const area of areas) {
    const existing = await payload.find({
      collection: 'service-areas',
      where: { title: { equals: area.title } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'service-areas',
        data: { ...area, status: 'published' },
      })
    }
  }
  console.log(`Seeded ${areas.length} service areas`)

  // Create reviews
  const reviews = [
    { author: 'Sarah M.', rating: 5, content: 'Excellent plumbing work. Fixed our emergency leak within the hour. Highly recommended!' },
    { author: 'James T.', rating: 5, content: 'The HVAC team was professional and efficient. Our new system works perfectly.' },
    { author: 'Maria L.', rating: 4, content: 'Great landscaping job. Transformed our backyard completely.' },
    { author: 'David K.', rating: 5, content: 'Best roofing company in the GTA. Fair pricing and outstanding work.' },
  ]

  for (const review of reviews) {
    const existing = await payload.find({
      collection: 'reviews',
      where: { author: { equals: review.author } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'reviews',
        data: { ...review, featured: true, status: 'published' },
      })
    }
  }
  console.log(`Seeded ${reviews.length} reviews`)

  // Create home page
  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  if (existingHome.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        status: 'published',
        layout: [
          {
            blockType: 'hero',
            heading: 'Professional Home Services in the GTA',
            subheading: 'Trusted by thousands of homeowners across the Greater Toronto Area.',
            ctaLabel: 'Get a Free Estimate',
            ctaUrl: '/contact',
          },
          {
            blockType: 'trustIndicators',
            heading: 'Why Choose Us',
            indicators: [
              { value: '500+', label: 'Projects Completed' },
              { value: '4.9', label: 'Average Rating' },
              { value: '24/7', label: 'Emergency Service' },
              { value: '10+', label: 'Years Experience' },
            ],
          },
          {
            blockType: 'ctaBand',
            heading: 'Ready to get started?',
            description: 'Contact us today for a free, no-obligation estimate.',
            ctaLabel: 'Contact Us',
            ctaUrl: '/contact',
          },
        ],
      },
    })
    console.log('Seeded home page')
  }

  // Seed globals
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      businessName: 'Agency Starter',
      phone: '(416) 555-0100',
      email: 'hello@agency-starter.com',
      address: {
        street: '123 Main St',
        city: 'Toronto',
        province: 'Ontario',
        postalCode: 'M5V 1A1',
      },
      primaryCTA: {
        label: 'Get a Free Estimate',
        url: '/contact',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { label: 'Services', url: '/services' },
        { label: 'Service Areas', url: '/service-areas' },
        { label: 'Blog', url: '/blog' },
        { label: 'Contact', url: '/contact' },
      ],
      cta: { label: 'Free Estimate', url: '/contact' },
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navGroups: [
        {
          title: 'Services',
          items: [
            { label: 'Plumbing', url: '/services/plumbing' },
            { label: 'HVAC', url: '/services/hvac' },
            { label: 'Electrical', url: '/services/electrical' },
            { label: 'Roofing', url: '/services/roofing' },
          ],
        },
        {
          title: 'Company',
          items: [
            { label: 'About', url: '/about' },
            { label: 'Blog', url: '/blog' },
            { label: 'Contact', url: '/contact' },
          ],
        },
      ],
      contactInfo: {
        phone: '(416) 555-0100',
        email: 'hello@agency-starter.com',
      },
      trustLinks: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
      ],
      copyright: '© 2026 Agency Starter. All rights reserved.',
    },
  })
  console.log('Seeded globals (site settings, header, footer)')

  console.log('Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
