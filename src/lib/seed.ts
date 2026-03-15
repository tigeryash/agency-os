import { getPayload } from 'payload'
import config from '@payload-config'

// --- Lexical RichText helpers ---

function text(t: string, format: number = 0) {
  return { type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1 }
}

function paragraph(...children: ReturnType<typeof text>[]) {
  return {
    type: 'paragraph',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}

function heading(tag: 'h2' | 'h3' | 'h4', ...children: ReturnType<typeof text>[]) {
  return {
    type: 'heading',
    tag,
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  }
}

function listItem(...children: ReturnType<typeof text>[]) {
  return {
    type: 'listitem',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    value: 1,
  }
}

function bulletList(...items: ReturnType<typeof listItem>[]) {
  return {
    type: 'list',
    listType: 'bullet' as const,
    children: items,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    start: 1,
    tag: 'ul' as const,
  }
}

function richText(...nodes: object[]) {
  return {
    root: {
      type: 'root',
      children: nodes,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

// --- Seed ---

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding GTA Pro Plumbing demo...')

  // --- Clean stale data from previous seeds ---
  const keepServiceSlugs = ['drain-cleaning', 'water-heater-installation', 'pipe-repair-replacement', 'bathroom-plumbing']
  const { docs: existingServices } = await payload.find({ collection: 'services', limit: 100 })
  for (const svc of existingServices) {
    if (!keepServiceSlugs.includes(svc.slug as string)) {
      await payload.delete({ collection: 'services', id: svc.id })
    }
  }

  const keepAreaSlugs = ['toronto', 'mississauga', 'brampton']
  const { docs: existingAreas } = await payload.find({ collection: 'service-areas', limit: 100 })
  for (const area of existingAreas) {
    if (!keepAreaSlugs.includes(area.slug as string)) {
      await payload.delete({ collection: 'service-areas', id: area.id })
    }
  }

  const keepPostSlugs = ['5-signs-emergency-drain-cleaning', 'tank-vs-tankless-water-heaters']
  const { docs: existingPosts } = await payload.find({ collection: 'posts', limit: 100 })
  for (const post of existingPosts) {
    if (!keepPostSlugs.includes(post.slug as string)) {
      await payload.delete({ collection: 'posts', id: post.id })
    }
  }

  const keepPageSlugs = ['home', 'about']
  const { docs: existingPages } = await payload.find({ collection: 'pages', limit: 100 })
  for (const page of existingPages) {
    if (!keepPageSlugs.includes(page.slug as string)) {
      await payload.delete({ collection: 'pages', id: page.id })
    }
  }

  // --- Admin user ---
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

  // --- Services ---
  const serviceData = [
    {
      title: 'Drain Cleaning',
      slug: 'drain-cleaning',
      summary: 'Professional drain cleaning for kitchens, bathrooms, and main sewer lines across the GTA.',
      content: richText(
        heading('h2', text('Expert Drain Cleaning Services')),
        paragraph(
          text('Clogged drains are one of the most common plumbing problems homeowners face. Whether it\'s a slow kitchen sink, a backed-up shower drain, or a main sewer line blockage, our licensed technicians have the tools and experience to get your water flowing again.'),
        ),
        heading('h3', text('What We Offer')),
        bulletList(
          listItem(text('Video camera inspection to locate blockages')),
          listItem(text('Hydro jetting for stubborn clogs and grease buildup')),
          listItem(text('Kitchen, bathroom, and laundry drain clearing')),
          listItem(text('Main sewer line cleaning and root removal')),
          listItem(text('Preventive drain maintenance plans')),
        ),
        heading('h3', text('When to Call')),
        paragraph(
          text('Don\'t wait for a small clog to become a major backup. Call us if you notice slow drainage, gurgling sounds, recurring clogs, or unpleasant odours coming from your drains. We offer same-day service across the Greater Toronto Area.'),
        ),
      ),
      meta: {
        title: 'Drain Cleaning Services in the GTA | GTA Pro Plumbing',
        description: 'Professional drain cleaning for kitchens, bathrooms, and sewer lines. Same-day service across Toronto, Mississauga, and Brampton.',
        structuredDataType: 'Service',
      },
    },
    {
      title: 'Water Heater Installation',
      slug: 'water-heater-installation',
      summary: 'Tank and tankless water heater installation, replacement, and repair with same-day service.',
      content: richText(
        heading('h2', text('Water Heater Installation & Replacement')),
        paragraph(
          text('A reliable water heater is essential for every home. Whether your current unit is failing, inefficient, or you\'re upgrading to a modern tankless system, we handle the full process — from selection advice through installation and old unit removal.'),
        ),
        heading('h3', text('Our Services Include')),
        bulletList(
          listItem(text('Traditional tank water heater installation')),
          listItem(text('Tankless (on-demand) water heater installation')),
          listItem(text('Water heater replacement and upgrades')),
          listItem(text('Proper permitting and code-compliant installation')),
          listItem(text('Old unit removal and disposal')),
          listItem(text('Emergency water heater repair')),
        ),
        heading('h3', text('Tank vs Tankless')),
        paragraph(
          text('Not sure which type is right for your home? Tank heaters are reliable and affordable upfront. Tankless units cost more initially but save energy long-term and never run out of hot water. We\'ll help you choose based on your household size, usage, and budget.'),
        ),
      ),
      meta: {
        title: 'Water Heater Installation & Replacement | GTA Pro Plumbing',
        description: 'Tank and tankless water heater installation across the GTA. Same-day service, proper permits, and old unit removal included.',
        structuredDataType: 'Service',
      },
    },
    {
      title: 'Pipe Repair & Replacement',
      slug: 'pipe-repair-replacement',
      summary: 'Burst pipe repair, leak detection, repiping, and emergency pipe services for GTA homes.',
      content: richText(
        heading('h2', text('Pipe Repair & Replacement You Can Trust')),
        paragraph(
          text('From minor leaks to burst pipes, damaged plumbing can cause serious water damage if not addressed quickly. Our team responds fast with the right equipment to repair or replace your pipes and protect your home.'),
        ),
        heading('h3', text('Services We Provide')),
        bulletList(
          listItem(text('Emergency burst pipe repair')),
          listItem(text('Leak detection and pinpoint repair')),
          listItem(text('Full and partial repiping (copper and PEX)')),
          listItem(text('Frozen pipe thawing and insulation')),
          listItem(text('Slab leak repair')),
          listItem(text('Gas line repair and installation')),
        ),
        heading('h3', text('Signs You Need Pipe Repair')),
        paragraph(
          text('Watch for unexplained increases in your water bill, damp spots on walls or ceilings, low water pressure, discoloured water, or the sound of running water when nothing is on. These can all indicate a hidden leak or failing pipe.'),
        ),
      ),
      meta: {
        title: 'Pipe Repair & Replacement in the GTA | GTA Pro Plumbing',
        description: 'Fast pipe repair, leak detection, and repiping services. Emergency response across Toronto, Mississauga, and Brampton.',
        structuredDataType: 'Service',
      },
    },
    {
      title: 'Bathroom Plumbing',
      slug: 'bathroom-plumbing',
      summary: 'Complete bathroom plumbing services — fixture installation, toilet repair, shower valves, and renovation rough-ins.',
      content: richText(
        heading('h2', text('Complete Bathroom Plumbing Services')),
        paragraph(
          text('Whether you\'re renovating your bathroom or need a quick fixture repair, our licensed plumbers handle every aspect of bathroom plumbing. We work with homeowners and contractors across the GTA to deliver clean, code-compliant work.'),
        ),
        heading('h3', text('What We Do')),
        bulletList(
          listItem(text('Toilet repair and replacement')),
          listItem(text('Faucet and fixture installation')),
          listItem(text('Shower valve repair and replacement')),
          listItem(text('Bathtub drain and plumbing work')),
          listItem(text('Renovation rough-in plumbing')),
          listItem(text('Bathroom addition plumbing from scratch')),
        ),
        heading('h3', text('Renovation Plumbing')),
        paragraph(
          text('Planning a bathroom renovation? We work with your contractor or directly with you to plan the plumbing layout, handle permits, run new supply and drain lines, and install fixtures. Our work meets Ontario building code and passes inspection the first time.'),
        ),
      ),
      meta: {
        title: 'Bathroom Plumbing Services | GTA Pro Plumbing',
        description: 'Fixture installation, toilet repair, shower valves, and renovation plumbing for GTA homeowners. Licensed and insured.',
        structuredDataType: 'Service',
      },
    },
  ]

  const serviceIds: Record<string, string> = {}
  for (const svc of serviceData) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: svc.slug } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      const doc = await payload.create({
        collection: 'services',
        data: { ...svc, slugLock: true, status: 'published' },
      })
      serviceIds[svc.slug] = doc.id as string
    } else {
      serviceIds[svc.slug] = existing.docs[0].id as string
    }
  }
  console.log(`Seeded ${serviceData.length} services`)

  // --- Service Areas ---
  const areaData = [
    {
      title: 'Toronto',
      slug: 'toronto',
      description: 'Serving all of Toronto — from downtown to North York, Scarborough, and Etobicoke. Fast response times across the city.',
      areaType: 'city' as const,
      geoModifier: 'in Toronto',
      content: richText(
        heading('h2', text('Plumbing Services in Toronto')),
        paragraph(
          text('GTA Pro Plumbing has been serving Toronto homeowners since 2015. We cover every neighbourhood in the city, from the downtown core to the suburbs.'),
        ),
        heading('h3', text('Neighbourhoods We Serve')),
        bulletList(
          listItem(text('Downtown Toronto')),
          listItem(text('North York')),
          listItem(text('Scarborough')),
          listItem(text('Etobicoke')),
          listItem(text('East York')),
          listItem(text('York')),
        ),
        paragraph(
          text('Our Toronto-based team typically arrives within 60 minutes for emergency calls. For scheduled work, we offer flexible morning and afternoon appointment windows.'),
        ),
      ),
      meta: {
        title: 'Plumber in Toronto | GTA Pro Plumbing',
        description: 'Licensed plumber serving all Toronto neighbourhoods. Emergency and scheduled plumbing services. Call (416) 555-0199.',
        structuredDataType: 'LocalBusiness',
      },
    },
    {
      title: 'Mississauga',
      slug: 'mississauga',
      description: 'Full-service plumbing across Mississauga — Port Credit, Streetsville, Meadowvale, Erin Mills, and beyond.',
      areaType: 'city' as const,
      geoModifier: 'in Mississauga',
      content: richText(
        heading('h2', text('Plumbing Services in Mississauga')),
        paragraph(
          text('Mississauga homeowners trust GTA Pro Plumbing for reliable, licensed plumbing work. From Port Credit waterfront homes to Meadowvale subdivisions, we know the area and respond fast.'),
        ),
        heading('h3', text('Areas We Cover')),
        bulletList(
          listItem(text('Port Credit')),
          listItem(text('Streetsville')),
          listItem(text('Meadowvale')),
          listItem(text('Erin Mills')),
          listItem(text('Cooksville')),
          listItem(text('Clarkson')),
        ),
        paragraph(
          text('We handle everything from emergency drain cleaning to full bathroom renovations across Mississauga. All work is backed by our satisfaction guarantee.'),
        ),
      ),
      meta: {
        title: 'Plumber in Mississauga | GTA Pro Plumbing',
        description: 'Trusted plumbing services across Mississauga. From Port Credit to Meadowvale — licensed, insured, and available 24/7.',
        structuredDataType: 'LocalBusiness',
      },
    },
    {
      title: 'Brampton',
      slug: 'brampton',
      description: 'Reliable plumbing services throughout Brampton — Bramalea, Heart Lake, Mount Pleasant, and Castlemore.',
      areaType: 'city' as const,
      geoModifier: 'in Brampton',
      content: richText(
        heading('h2', text('Plumbing Services in Brampton')),
        paragraph(
          text('Brampton is one of the fastest-growing cities in the GTA, and GTA Pro Plumbing is growing with it. We serve both new construction homes and older properties across every Brampton neighbourhood.'),
        ),
        heading('h3', text('Areas We Cover')),
        bulletList(
          listItem(text('Bramalea')),
          listItem(text('Heart Lake')),
          listItem(text('Mount Pleasant')),
          listItem(text('Castlemore')),
          listItem(text('Springdale')),
          listItem(text('Gore Meadows')),
        ),
        paragraph(
          text('Whether you need a quick repair or a complete plumbing overhaul, our Brampton service area team is ready to help. We offer upfront pricing with no hidden fees.'),
        ),
      ),
      meta: {
        title: 'Plumber in Brampton | GTA Pro Plumbing',
        description: 'Professional plumbing services across Brampton. Bramalea, Heart Lake, Mount Pleasant, and more. Call for a free estimate.',
        structuredDataType: 'LocalBusiness',
      },
    },
  ]

  const areaIds: Record<string, string> = {}
  for (const area of areaData) {
    const existing = await payload.find({
      collection: 'service-areas',
      where: { slug: { equals: area.slug } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      const doc = await payload.create({
        collection: 'service-areas',
        data: { ...area, slugLock: true, status: 'published' },
      })
      areaIds[area.slug] = doc.id as string
    } else {
      areaIds[area.slug] = existing.docs[0].id as string
    }
  }
  console.log(`Seeded ${areaData.length} service areas`)

  // Link services to areas
  const allAreaIds = Object.values(areaIds)
  for (const svcId of Object.values(serviceIds)) {
    await payload.update({
      collection: 'services',
      id: svcId,
      data: { servedAreas: allAreaIds },
    })
  }
  console.log('Linked services to service areas')

  // --- Reviews ---
  const reviewData = [
    {
      author: 'Sarah M.',
      rating: 5,
      content: 'Called at 10pm with a basement drain backup. They had someone here within the hour and fixed it fast. Could not recommend more highly.',
      featured: true,
    },
    {
      author: 'James T.',
      rating: 5,
      content: 'Replaced our 15-year-old water heater with a tankless unit. Installation was clean, they handled the permit, and removed the old tank. Hot water has never been better.',
      featured: true,
    },
    {
      author: 'Maria L.',
      rating: 5,
      content: 'Hired them for our full bathroom reno plumbing. Everything was done to code, on schedule, and the crew was respectful of our home. Will use again for the ensuite.',
      featured: true,
    },
    {
      author: 'David K.',
      rating: 4,
      content: 'Had a burst pipe in the garage during a cold snap. They arrived quickly and did a solid repair. Fair pricing and very professional crew.',
      featured: true,
    },
    {
      author: 'Linda R.',
      rating: 5,
      content: 'Kitchen drain had been slow for weeks. They ran a camera, found the problem, and cleared it with hydro jetting. Like a brand new drain. On time and reasonably priced.',
      featured: false,
    },
    {
      author: 'Mike P.',
      rating: 5,
      content: 'Excellent advice on going tankless. Walked us through the options, gave an honest quote, and the install was done in one day. Very happy with the result.',
      featured: false,
    },
  ]

  const reviewIds: string[] = []
  for (const review of reviewData) {
    const existing = await payload.find({
      collection: 'reviews',
      where: { author: { equals: review.author } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      const doc = await payload.create({
        collection: 'reviews',
        data: { ...review, status: 'published' },
      })
      reviewIds.push(doc.id as string)
    } else {
      reviewIds.push(existing.docs[0].id as string)
    }
  }
  console.log(`Seeded ${reviewData.length} reviews`)

  const featuredReviewIds = reviewIds.slice(0, 4)

  // --- Blog Posts ---
  const postData = [
    {
      title: '5 Signs You Need Emergency Drain Cleaning',
      slug: '5-signs-emergency-drain-cleaning',
      summary: 'Don\'t ignore these warning signs — a small drain issue can become a costly backup fast.',
      content: richText(
        paragraph(
          text('A slow drain might not seem like an emergency, but ignoring the warning signs can lead to sewage backups, water damage, and expensive repairs. Here are five signs it\'s time to call a professional.'),
        ),
        heading('h2', text('1. Multiple Drains Are Slow at Once')),
        paragraph(
          text('If more than one drain in your home is sluggish, the problem is likely in your main sewer line — not a single fixture. This requires professional clearing before it becomes a full backup.'),
        ),
        heading('h2', text('2. Gurgling Sounds')),
        paragraph(
          text('Hearing gurgling from your drains or toilet? That\'s air trapped by a blockage. It means water isn\'t flowing freely and pressure is building up in the line.'),
        ),
        heading('h2', text('3. Water Backing Up in Other Fixtures')),
        paragraph(
          text('If running the washing machine causes water to back up in the shower, your main drain is partially blocked. This will only get worse without intervention.'),
        ),
        heading('h2', text('4. Foul Odours From Drains')),
        paragraph(
          text('Persistent sewer smells coming from your drains indicate a blockage or dry trap. If cleaning the P-trap doesn\'t fix it, the problem is deeper in the line.'),
        ),
        heading('h2', text('5. Recurring Clogs')),
        paragraph(
          text('A clog that keeps coming back after plunging is a symptom of a larger issue — often tree root intrusion, grease buildup, or a pipe belly. Professional hydro jetting and camera inspection can diagnose and resolve the root cause.'),
        ),
        heading('h2', text('Don\'t Wait')),
        paragraph(
          text('If you notice any of these signs, call us for same-day drain cleaning service across the GTA. A quick professional visit now can save thousands in water damage repair later.'),
        ),
      ),
      publishedAt: '2026-03-01T12:00:00.000Z',
      meta: {
        title: '5 Signs You Need Emergency Drain Cleaning | GTA Pro Plumbing',
        description: 'Learn the warning signs of a serious drain problem. Slow drains, gurgling, and backups all mean it\'s time to call a professional.',
        structuredDataType: 'Article',
      },
    },
    {
      title: 'Tank vs Tankless Water Heaters: Which Is Right for Your GTA Home?',
      slug: 'tank-vs-tankless-water-heaters',
      summary: 'Comparing tank and tankless water heaters on cost, efficiency, and suitability for GTA homes.',
      content: richText(
        paragraph(
          text('Choosing a new water heater is one of the bigger home decisions you\'ll make. Both tank and tankless models have clear advantages — the right choice depends on your household size, budget, and hot water needs.'),
        ),
        heading('h2', text('Tank Water Heaters')),
        paragraph(
          text('Traditional tank water heaters store 40–60 gallons of pre-heated water. They\'re proven, affordable upfront, and work well for most GTA homes.'),
        ),
        bulletList(
          listItem(text('Lower upfront cost ($800–$1,500 installed)')),
          listItem(text('Simple, proven technology')),
          listItem(text('Works with existing plumbing in most homes')),
          listItem(text('Lifespan: 8–12 years')),
        ),
        heading('h2', text('Tankless Water Heaters')),
        paragraph(
          text('Tankless units heat water on demand. They\'re more efficient, take up less space, and never run out of hot water — but they cost more upfront.'),
        ),
        bulletList(
          listItem(text('Higher upfront cost ($2,500–$4,500 installed)')),
          listItem(text('20–30% more energy-efficient')),
          listItem(text('Unlimited hot water on demand')),
          listItem(text('Compact wall-mounted design')),
          listItem(text('Lifespan: 15–20 years')),
        ),
        heading('h2', text('Which Should You Choose?')),
        paragraph(
          text('For a household of 1–3 people with moderate hot water use, a quality tank heater is usually the best value. For larger families, homes with high simultaneous hot water demand, or homeowners who plan to stay long-term, tankless is worth the investment.'),
        ),
        paragraph(
          text('Not sure? We offer free in-home assessments to help you choose. Call us or fill out our contact form for an honest recommendation with no obligation.'),
        ),
      ),
      publishedAt: '2026-03-10T12:00:00.000Z',
      meta: {
        title: 'Tank vs Tankless Water Heaters | GTA Pro Plumbing',
        description: 'Compare tank and tankless water heaters for your GTA home. Cost, efficiency, and honest advice from licensed plumbers.',
        structuredDataType: 'Article',
      },
    },
  ]

  for (const post of postData) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'posts',
        data: { ...post, slugLock: true, status: 'published' },
      })
    }
  }
  console.log(`Seeded ${postData.length} blog posts`)

  // --- Pages ---

  // Homepage
  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const homeData = {
        title: 'Home',
        slug: 'home',
        status: 'published',
        layout: [
          {
            blockType: 'hero',
            heading: 'GTA\'s Trusted Plumbing Experts',
            subheading: 'Licensed, insured, and serving the Greater Toronto Area since 2015. From emergency repairs to bathroom renovations — we do it right the first time.',
            ctaLabel: 'Get a Free Estimate',
            ctaUrl: '/contact',
          },
          {
            blockType: 'trustIndicators',
            heading: 'Why Homeowners Trust Us',
            indicators: [
              { value: 'Licensed & Insured', label: 'Ontario Certified' },
              { value: '2,000+', label: 'Jobs Completed' },
              { value: '4.9 ★', label: 'Average Rating' },
              { value: '24/7', label: 'Emergency Service' },
            ],
          },
          {
            blockType: 'servicesGrid',
            heading: 'Our Services',
            services: Object.values(serviceIds),
          },
          {
            blockType: 'processSteps',
            heading: 'How It Works',
            steps: [
              { title: 'Call or Book Online', description: 'Describe your plumbing issue and we\'ll schedule a visit — often same-day.' },
              { title: 'We Diagnose the Problem', description: 'Our licensed technician arrives on time, inspects the issue, and gives you an upfront quote.' },
              { title: 'We Fix It Right', description: 'We complete the repair or installation to code, clean up, and make sure you\'re satisfied.' },
            ],
          },
          {
            blockType: 'review',
            heading: 'What Our Customers Say',
            reviews: featuredReviewIds,
          },
          {
            blockType: 'serviceAreaCoverage',
            heading: 'Serving the Greater Toronto Area',
            description: 'Fast response times across Toronto, Mississauga, Brampton, and surrounding communities.',
            areas: Object.values(areaIds),
          },
          {
            blockType: 'emergencyCallout',
            heading: 'Plumbing Emergency?',
            description: 'Burst pipe, sewer backup, or no hot water? Our emergency team is available 24/7.',
            phone: '(416) 555-0199',
            ctaLabel: 'Call Now: (416) 555-0199',
          },
          {
            blockType: 'ctaBand',
            heading: 'Ready for a Free Estimate?',
            description: 'Tell us about your project and we\'ll get back to you within the hour.',
            ctaLabel: 'Contact Us',
            ctaUrl: '/contact',
          },
        ],
        meta: {
          title: 'GTA Pro Plumbing | Trusted Plumbing Experts in the Greater Toronto Area',
          description: 'Licensed plumbing services across Toronto, Mississauga, and Brampton. Drain cleaning, water heaters, pipe repair, and bathroom plumbing. 24/7 emergency service.',
          structuredDataType: 'LocalBusiness',
        },
  }

  if (existingHome.totalDocs === 0) {
    await payload.create({ collection: 'pages', data: homeData })
  } else {
    await payload.update({ collection: 'pages', id: existingHome.docs[0].id, data: homeData })
  }
  console.log('Seeded home page')

  // About page
  const existingAbout = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })

  const aboutData = {
        title: 'About',
        slug: 'about',
        status: 'published',
        layout: [
          {
            blockType: 'hero',
            heading: 'About GTA Pro Plumbing',
            subheading: 'Family-owned and operated since 2015. We built this company on honest work, fair pricing, and treating every home like our own.',
          },
          {
            blockType: 'teamIntro',
            heading: 'Our Story',
            description: richText(
              paragraph(
                text('GTA Pro Plumbing was founded by a licensed master plumber with over 20 years of experience in the trade. What started as a one-person operation has grown into a team of skilled technicians serving thousands of homeowners across the Greater Toronto Area.'),
              ),
              paragraph(
                text('We believe plumbing work should be done right the first time — with clear communication, upfront pricing, and respect for your home. Every member of our team is background-checked, licensed, and trained to our standards.'),
              ),
              paragraph(
                text('We\'re not the cheapest plumber in the GTA, and we\'re not trying to be. We\'re the one you\'ll want to call again.'),
              ),
            ),
          },
          {
            blockType: 'trustIndicators',
            heading: 'What Sets Us Apart',
            indicators: [
              { value: '10+', label: 'Years in Business' },
              { value: '100%', label: 'Licensed & Insured' },
              { value: 'Background Checked', label: 'Every Technician' },
              { value: 'Upfront', label: 'No Hidden Fees' },
            ],
          },
          {
            blockType: 'review',
            heading: 'From Our Customers',
            reviews: featuredReviewIds.slice(0, 2),
          },
          {
            blockType: 'ctaBand',
            heading: 'Let\'s Talk About Your Project',
            description: 'Whether it\'s a quick repair or a major renovation, we\'re here to help.',
            ctaLabel: 'Get a Free Estimate',
            ctaUrl: '/contact',
          },
        ],
    meta: {
      title: 'About Us | GTA Pro Plumbing',
      description: 'Family-owned plumbing company serving the GTA since 2015. Licensed, insured, and trusted by thousands of homeowners.',
    },
  }

  if (existingAbout.totalDocs === 0) {
    await payload.create({ collection: 'pages', data: aboutData })
  } else {
    await payload.update({ collection: 'pages', id: existingAbout.docs[0].id, data: aboutData })
  }
  console.log('Seeded about page')

  // --- Globals ---
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      businessName: 'GTA Pro Plumbing',
      tagline: 'Trusted Plumbing Experts Across the Greater Toronto Area',
      phonePrimary: '(416) 555-0199',
      emailPrimary: 'hello@gtaproplumbing.com',
      address: {
        street: '45 King St W',
        city: 'Toronto',
        province: 'Ontario',
        postalCode: 'M5H 1J8',
        country: 'CA',
      },
      yearEstablished: 2015,
      licenseNumber: 'ON-PLB-2015-DEMO',
      primaryCTA: {
        label: 'Get a Free Estimate',
        url: '/contact',
        style: 'primary',
      },
      contactFormRecipient: 'hello@gtaproplumbing.com',
      hoursSummary: 'Mon–Fri 7am–7pm, Sat 8am–4pm',
      emergencyAvailable: true,
      defaultMeta: {
        title: 'GTA Pro Plumbing',
        description: 'Licensed plumbing services across the Greater Toronto Area. Drain cleaning, water heaters, pipe repair, and bathroom plumbing.',
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
        { label: 'About', url: '/about' },
        { label: 'Contact', url: '/contact' },
      ],
      cta: { inheritFromSiteSettings: true },
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navGroups: [
        {
          title: 'Services',
          items: [
            { label: 'Drain Cleaning', url: '/services/drain-cleaning' },
            { label: 'Water Heater Installation', url: '/services/water-heater-installation' },
            { label: 'Pipe Repair & Replacement', url: '/services/pipe-repair-replacement' },
            { label: 'Bathroom Plumbing', url: '/services/bathroom-plumbing' },
          ],
        },
        {
          title: 'Service Areas',
          items: [
            { label: 'Toronto', url: '/service-areas/toronto' },
            { label: 'Mississauga', url: '/service-areas/mississauga' },
            { label: 'Brampton', url: '/service-areas/brampton' },
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
        inheritFromSiteSettings: true,
      },
      trustLinks: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
      ],
      copyright: '© 2026 GTA Pro Plumbing. All rights reserved.',
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
