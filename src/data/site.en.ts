// Texto em inglês, com as mesmas chaves de site.ts. Imagens, links e layout vêm de lá; aqui só o texto.
// Projetos: um objeto por slug; decisões e legendas na mesma ordem do português (o build reclama se faltar algo).
// Depoimentos: o texto original fica em site.ts e não muda; `quote.text` aqui é a tradução, exibida como tal.

export const site = {
  role: 'Product design studio',
  city: 'Blumenau, Brazil',
  status: 'Next opening: December',
  description:
    'Quieto is a design studio in Blumenau, Brazil. We design digital products, design systems and websites for startups, SaaS and B2B companies, a few projects at a time.',
};

/** mesma ordem de `services` em site.ts */
export const services = [
  {
    title: 'Product and UX/UI',
    text: 'Screens and flows for SaaS and data platforms. Research, information architecture, prototypes and high-fidelity interface in Figma, ready for your team to build.',
    from: 'R$ 8k',
  },
  {
    title: 'Design systems',
    text: 'Components, tokens and documentation that keep several products consistent, so the team stops re-deciding what has already been decided.',
    from: 'R$ 15k',
  },
  {
    title: 'Websites and landing pages',
    text: 'Company websites and sales pages, built in Framer or directly in code, and published on your domain.',
    from: 'R$ 2k',
  },
];

export const process = [
  { title: 'Conversation', text: 'We learn about the business, who will use it and what needs to change. Scope and timeline come out of this.' },
  { title: 'Structure', text: 'Journey mapping and information architecture: what goes in, in what order and why.' },
  { title: 'Interface', text: 'Prototype and high fidelity in Figma, or straight in Framer for websites. You see and comment at every stage.' },
  { title: 'Delivery', text: 'Handoff to the development team, or the site published on your domain.' },
];

export const bio = [
  'Quieto is a product design studio in Blumenau, Brazil. We stay with each project from research to handoff, which is why we take on only a few clients at a time.',
  'At neth!, a digital health and wellbeing startup, we handle product direction, Figma prototyping, the roadmap and the development team.',
  'At Área Central, we built a cross-platform design system that unified visual and interaction patterns across several products and shortened the path from design to development. We also restructured the document viewing flow of a complex platform, reducing friction on the main screens and increasing task completion.',
  'Most of our projects are B2B data platforms and websites.',
];

export const facts: [string, string][] = [
  ['Founder', 'Lucas Schünemann'],
  ['Experience', '5+ years'],
  ['Education', 'Interaction Design Foundation'],
  ['Based in', 'Blumenau, Santa Catarina, Brazil'],
  ['Time zone', 'GMT-3'],
  ['Tools', 'Figma, Framer and code'],
];

export type ProjectText = {
  when: string;
  type: string;
  service: string;
  /** só quando o nome do cliente muda (ex.: projeto pessoal) */
  client?: string;
  industry: string;
  tools: string;
  role?: string;
  duration?: string;
  summary: string;
  challenge: string[];
  decisions: { title: string; text: string; caption?: string }[];
  process?: { text: string; captions?: string[] };
  result?: string[];
  /** tradução do depoimento e o cargo em inglês; o original não sai de site.ts */
  quote?: { text?: string; role: string };
  retro?: string;
  /** legendas de `images`, na mesma ordem */
  images: string[];
};

export const projects: Record<string, ProjectText> = {
  neth: {
    when: 'In progress',
    type: 'Product',
    service: 'Product direction',
    industry: 'Mental health, health education',
    tools: 'Figma',
    role: 'Co-founder and CPO: product direction, prototypes, roadmap and managing the development team',
    summary: 'Short videos about mental health, made by health professionals, for individuals, companies and private practices.',
    challenge: [
      'Anyone trying to understand their own mental health online runs first into opinions and easy promises, in a format built to hold attention. neth! had to be as light as social media and as reliable as science, without becoming one more chore or one more feed.',
    ],
    decisions: [
      {
        title: 'Light like social media, without the algorithm',
        text: 'The format is the short video, because content nobody watches to the end is of no use. But there is no infinite feed, no ads and no screen-time goal: people pick a playlist by topic, watch and leave. Short assessments show progress in numbers.',
        caption: 'On the phone: the opening, the playlists by topic and the ad-free space.',
      },
      {
        title: 'A name and a license on every video',
        text: 'Trust does not come from followers. Every video has a technical lead with a name, credentials and a professional council registration, and the script is reviewed before recording. The site shows that whole path, including the points where a video can be stopped.',
        caption: 'The method on the home page itself: a topic with a source, a name and a registration, review before the camera.',
      },
      {
        title: 'The account belongs to the viewer',
        text: "The same catalog reaches people in three ways: the individual subscription, the company plan, which covers the information and prevention stage of NR-01 (Brazil's workplace health and safety rule), and neth! Clínica, where a professional invites up to 14 patients. In every case, the account belongs to the person using it. HR sees team numbers, not which videos each person watched; the professional grants access but does not monitor the patient. Without that limit, people learn to check in without watching anything.",
        caption: 'For companies: what HR sees and what it does not, side by side.',
      },
    ],
    images: [
      'The opening, with Janeth: the character who welcomes people and appears in the heaviest topics, where text alone would make the screen too harsh.',
    ],
  },
  acronos: {
    when: 'February 2025',
    type: 'Interface, design system',
    service: 'Design system',
    industry: 'Software',
    tools: 'Figma, design tokens, Framer',
    role: 'Led its creation, from foundations to documentation',
    summary: "A design system for consistency across Área Central's digital products.",
    challenge: [
      'Before Acronos, each team at Área Central built its own components. The small differences between them piled up into friction, between products and between design and development.',
    ],
    decisions: [
      {
        title: 'Foundations before components',
        text: 'The first version started with the foundations: color families, typography, spacing and effects, with light and dark themes from the start. Components are built on top of them.',
        caption: 'Color: the brand families in scales, from the darkest shade to the lightest.',
      },
      {
        title: 'Few options, well named',
        text: 'Every option the system offers is one more decision for the team. That is why there are only two shadow styles, and buttons are organized along three axes: hierarchy, color and state.',
        caption: 'Buttons: variations in hierarchy, color and state.',
      },
      {
        title: 'Documentation outside Figma',
        text: 'The system lives on a website, not only in a file: designers and developers can find a component, see a preview and read how to use it without opening Figma. A changelog records what changed in each version.',
        caption: 'The component index, each one with its own preview.',
      },
    ],
    process: {
      text: "The starting point was reference systems such as IBM's Carbon and Nuvemshop's Nimbus, adapted for SaaS products and designed for the phone first. Today there are four style guides and twelve documented components, from navigation to forms and tables.",
    },
    quote: {
      text: 'Before Acronos, each team solved the same component its own way. Lucas organized the foundations and documented everything in one place that design and development actually use. We stopped re-deciding what had already been decided.',
      role: 'Product Manager at Área Central',
    },
    images: [
      'The documentation in the dark theme: side navigation with style guides and components, and shortcuts to the most used ones.',
      'The same start page in the light theme.',
      'On the phone, the documentation becomes a single column, with the menu collapsed.',
    ],
  },
  traveldone: {
    when: 'First version in 2025, current one in 2026',
    type: 'Web',
    service: 'Landing page',
    industry: 'Online course',
    tools: 'HTML, CSS and JavaScript, on Vercel',
    role: 'Design and development',
    summary: 'Sales page for a course on planning family trips.',
    challenge: [
      'TravelDone is an online course on saving money, finding deals, using miles and building itineraries, taught by a couple who have traveled as a family for more than 15 years. The page had to sell without sounding like a course ad: show who teaches, who it is for and how much it costs, with nothing hidden.',
    ],
    decisions: [
      {
        title: 'Price, access and guarantee before you scroll',
        text: 'Right below the buy button are the three answers that decide the purchase: one year of access, a seven-day guarantee and 10 installments of R$ 27.70. On the phone, a bar with the price, the guarantee and the button follows the scroll.',
        caption:
          'On the phone: the opening, who the course is for and the price. The bar with the guarantee and the buy button stays fixed at the bottom of the screen.',
      },
      {
        title: "The family's trips as proof",
        text: "Instead of stock photos, fifteen of the couple's trips, from Barcelona to Fortaleza, move sideways as the page scrolls, with the place written under each photo and a counter from 01 to 15.",
        caption: 'The trip gallery: the page holds still and the photos run sideways.',
      },
      {
        title: 'Testimonials with the original conversation',
        text: 'Both testimonials appear next to a screenshot of the message in which the student wrote them. Readers can see where each sentence came from.',
        caption: 'What the students said, each sentence with a screenshot of the conversation.',
      },
    ],
    process: {
      text: 'The first version was built in Framer in 2025. The current one was rebuilt from scratch in HTML, CSS and JavaScript, with payments through Hotmart.',
    },
    quote: {
      text: 'The new page shows who we really are: our trips, the price and the guarantee, without looking like a course ad. Lucas understood what we wanted before we knew how to explain it.',
      role: 'creators of TravelDone',
    },
    images: [
      'The opening: the promise, who teaches and, right below the button, access, guarantee and installments.',
      'The price as a ticket: what comes with the course on one side, the seven-day guarantee on the other.',
    ],
  },
  acompanha: {
    when: '2025 to 2026',
    type: 'Product',
    service: 'Product design',
    industry: 'Building materials',
    tools: 'Figma',
    role: 'Product screens and flows, from the credit engine to the Education module',
    summary: 'A SaaS that shows building materials stores whether they are buying well.',
    challenge: [
      'A building materials store buys all the time, but does not always know whether it bought well. Acompanha tracks regional market prices and demand and compares them with what the store actually paid. I joined the product to design the screens and flows that are now going into development.',
    ],
    decisions: [
      {
        title: 'One column, with confidence in plain sight',
        text: 'The product screen went through several complete versions before settling on a single-column layout, with confidence indicators on the data. Someone deciding on a purchase needs to know how far they can trust the number in front of them. The visual vocabulary stayed close to Linear.',
      },
      {
        title: 'A simulator instead of a scenario',
        text: "Brazil's tax reform replaces PIS, COFINS, ICMS and ISS with CBS and IBS. Instead of showing a fixed scenario of that transition, the credit engine has an editable simulator on the screen itself: the store changes the assumptions and sees the effect right away.",
      },
    ],
    quote: {
      text: 'Lucas took a dry subject like the tax reform and turned it into a simulator that store owners understand. The product screen went back and forth several times until it was simple, and he never got attached to the first version.',
      role: 'Product Manager',
    },
    images: [],
  },
  von: {
    when: 'August to October 2026',
    type: 'Personal project',
    service: 'Concept, design and development',
    client: 'Personal project',
    industry: 'Interactive portfolio',
    tools: 'TypeScript, three.js, Web Audio, Vite',
    role: 'Solo project: concept, design, code and sound',
    summary: 'A portfolio you walk through: a 3D gallery on floating islands, with each project shown as a sculpture.',
    challenge: [
      'The question was whether a portfolio could be a place you visit rather than a page you scroll, without weighing more than a regular website. In VON, a chrome figure walks across white islands above a sea of clouds, and each project is shown in a room, as a sculpture, with a plaque that opens the full case.',
    ],
    decisions: [
      {
        title: 'Two eras on the same screen',
        text: 'The world is rendered small and scaled up without smoothing, with the jagged edges of early 2000s CGI: graphics card demos, Frutiger Aero, the Aqua of the first Mac OS X versions and DVD menus. The interface on top is the opposite: sharp, in frosted glass, with the grid and hierarchy of Swiss design.',
        caption: 'The Acronos room: the modular sculpture and the plaque with the case summary.',
      },
      {
        title: 'Nothing to download',
        text: 'No image, 3D model or audio file is loaded. The sculptures are generated in code, the music is generative and the sound effects are synthesized on the fly with Web Audio. The whole site weighs about 185 kB gzipped.',
        caption: 'A walk by day, by night and through the glass tube up to the hill. Everything on screen is generated in code, on the spot.',
      },
      {
        title: 'Walking is optional',
        text: 'Those who walk find more: NPCs who talk, an arcade with a real game, a pond, a lookout and a garden with guided breathing. Those in a hurry open the catalog and go straight to any room. Without WebGL, the gallery opens as a list and can still be browsed.',
        caption: 'The catalog: the six works and the other rooms, one click away.',
      },
    ],
    images: [
      'The entrance: the whole gallery appears in the background before you go in.',
      'The full case opens full screen, with the images on a monitor.',
      'On the phone: tap the ground to walk, pinch to zoom.',
    ],
  },
  'wf-odontologia': {
    when: 'First version in 2025, current one in 2026',
    type: 'Web',
    service: 'Website',
    industry: 'Dentistry',
    tools: 'HTML, CSS and JavaScript, on Vercel',
    role: 'Design and development',
    summary: 'Website for a dental clinic with two locations in the Alto Vale do Itajaí region.',
    challenge: [
      'WF has two clinics, in Braço do Trombudo and in Rio do Sul, and covers every specialty. The first version of the site, built in Framer, opened with "Encontre sua Meta." ("Find your Goal."), a line that said none of this. The second had to say what the clinic does and where, and take each person to the WhatsApp of the right location.',
    ],
    decisions: [
      {
        title: 'What and where, in the first line',
        text: 'The opening now states the service and the region: complete dentistry in the Alto Vale do Itajaí, with the two cities just above. It is the same information as the page title, which is what appears in search results.',
        caption: 'Left, the first version, in Framer; right, the current one.',
      },
      {
        title: 'Every specialty, without changing clinics',
        text: 'What sets the clinic apart is that it covers every area, so the whole treatment stays with the same team. The eight specialties become a list that opens one at a time, for anyone who wants to know what each one includes.',
        caption: 'The specialties, from general dentistry to pediatric dentistry.',
      },
      {
        title: 'One WhatsApp per location',
        text: 'Each clinic has its own card, with phone, WhatsApp and map, and the closing section asks you to pick a location before opening the chat. On the phone, the booking button stays fixed at the bottom of the screen.',
        caption: 'The two locations, each with its own WhatsApp and map.',
      },
    ],
    process: {
      text: 'The first version was built in Framer in 2025 and is still online. The second was rebuilt from scratch in HTML, CSS and JavaScript, with the copy rewritten section by section and a step-by-step of the patient care process: contact, assessment, plan and follow-up.',
    },
    quote: {
      text: 'Now the site says in one line what the clinic does and where, and each patient lands on the WhatsApp of the right location. It looks like the clinic: serious, but not cold.',
      role: 'dentists at WF Odontologia',
    },
    images: [
      'The opening: what the clinic does, where it is and its Google rating.',
      'On the phone, the booking button follows the scroll. On the previous version, almost nine in ten visits came from phones, most of them from Instagram (Framer Analytics, September to October 2026).',
    ],
  },
  'pf-advogados': {
    when: 'January 2024',
    type: 'Web',
    service: 'Website',
    industry: 'Law, real estate law',
    tools: 'Framer',
    role: 'Design and build in Framer',
    summary: 'Company website for a law firm in Rio do Sul.',
    challenge: [
      'People looking for a lawyer arrive with a problem and little patience for reading. The site had to look serious from the first screen and lead the person to a conversation with the firm, with no detours.',
    ],
    decisions: [
      {
        title: 'A single path',
        text: 'Every section ends in the same place: a WhatsApp conversation. The button appears in the opening, stays fixed in the corner of the screen while scrolling and comes back at the end. For a small firm, it is the channel the client already has open.',
        caption: 'On the phone, the WhatsApp button follows the scroll from start to finish.',
      },
      {
        title: 'Services that describe situations',
        text: 'Each of the six practice areas gets a short card, with the name of the area and, right below, the situations it covers: a property without a deed, an unregistered building, a dispute with the condominium. Visitors recognize their own case in the description before they know the legal term.',
        caption: 'The practice areas: buying and selling, contracts, regularization, leases, possession and condominiums.',
      },
      {
        title: 'Questions answered before the call',
        text: 'Ten frequently asked questions, written the way a client would ask them, answered one at a time. Right after them come the Google reviews, in the words of people the firm has already helped.',
        caption: 'The frequently asked questions, opened one at a time.',
      },
    ],
    result: [
      'The site was first built for defending drivers with a suspended license. When the firm moved into real estate law, the same section structure (services, about us, questions and reviews) took the new content.',
    ],
    quote: {
      text: 'A law firm lives on trust, and the site conveys that from the first screen. It is easy to navigate and takes the client straight to a conversation with us.',
      role: 'Passig & Firmino Advogados',
    },
    images: ['The opening: what the firm does in one sentence and the button to talk to a lawyer.'],
  },
  real: {
    when: '2026',
    type: 'Web',
    service: 'Landing page',
    industry: 'Psychology, clinical mentoring',
    tools: 'Framer',
    role: 'Design and build in Framer',
    summary: 'Landing page for Real, a clinical mentoring program for psychologists.',
    challenge: [
      'Real is a mentoring program for psychologists who know what to do but need help with how to do it in session. The page had to explain a long program, with live meetings and recorded content, and lead those who see themselves in it to the waitlist.',
    ],
    decisions: [],
    quote: {
      text: 'Lucas turned a long program, full of details, into a page that reads calmly and leads straight to the waitlist. The way we talk to our students.',
      role: 'psychologist and mentor at Real',
    },
    images: [
      'The opening: what Real is in one sentence and the way to the waitlist.',
      'The two mentors and what the mentoring includes, from commented sessions to group exchanges.',
      'On the phone: the opening, what Real is and who it is for. Phones bring almost nine in ten visits (Framer Analytics, September to October 2026).',
    ],
  },
};
