import { Product, Review, FAQItem, CardMockup, SitemapNode, WireframeElement } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "stayglassy-core",
    name: "StayGlassy Core Deck",
    price: 24.99,
    originalPrice: 29.99,
    description: "The complete, award-nominated educational card game. Promotes critical thinking, logic puzzle resolving, and understanding scientific argumentation.",
    image: "https://picsum.photos/seed/glassycore/600/400",
    age: "8 and up",
    players: "2 - 6 Players",
    duration: "15 - 30 Min",
    features: [
      "80 Cards in Custom Glossy Box",
      "Full Color Illustrated Instruction Booklet",
      "Free access to online educational dashboard",
      "Perfect for family game night or study group warm-ups"
    ]
  },
  {
    id: "stayglassy-educator",
    name: "Classroom Starter Bundle",
    price: 99.99,
    originalPrice: 129.99,
    description: "Specially packaged bundle for educators. Includes 5 Core Decks, printable curriculum integration guide, and digital teacher slides.",
    image: "https://picsum.photos/seed/glassyeduc/600/400",
    age: "8 to 18 (K-12 adaptation)",
    players: "Up to 30 Players",
    duration: "15 - 45 Min",
    features: [
      "5 Core Card Decks (supports up to 30 students)",
      "NGSS & Common Core Curriculum Alignment Map Booklet",
      "Digital Lesson Plan slide decks",
      "25 Quick-reference Student Assessment Worksheets"
    ]
  },
  {
    id: "stayglassy-ethics-expansion",
    name: "Ethics & Reflection Expansion Pack",
    price: 14.99,
    description: "Add-on pack containing 40 highly collaborative ethics dilemma cards, debating mechanics, and cognitive bias modifiers.",
    image: "https://picsum.photos/seed/glassyethics/600/400",
    age: "12 and up",
    players: "2 - 8 Players",
    duration: "20 - 40 Min",
    features: [
      "40 Extra-thick custom cards",
      "Emotional Intelligence (EQ) assessment guide",
      "Team-building debate scenarios for classroom groups"
    ]
  },
  {
    id: "stayglassy-district-pack",
    name: "District-Wide School Bundle",
    price: 499.99,
    originalPrice: 650.00,
    description: "Our ultimate institutional package. Equipped for entire schools, containing 30 core decks, comprehensive curriculum workshops, and multi-classroom licenses.",
    image: "https://picsum.photos/seed/glassydistrict/600/400",
    age: "K-12",
    players: "Multiple Classrooms",
    duration: "Flexible Lessons",
    features: [
      "30 Core Card Decks",
      "Authorized Physical & Digital License Keys",
      "1-Hour Virtual Training Webinar for Teaching Staff",
      "Priority Shipping & Free replacement of lost cards for 1 Year"
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev1",
    name: "Sarah Jenkins",
    role: "Middle School Science Teacher, Sacramento Unified",
    content: "StayGlassy completely transformed our Friday logic workshops. The kids don't even realize they are building rigorous scientific arguments and debugging cognitive bias. It's brilliant!",
    rating: 5
  },
  {
    id: "rev2",
    name: "Dr. Marcus Vance",
    role: "Child Psychologist & Parent",
    content: "As both a father and clinician, I appreciate how this game normalizes cognitive reflection. It gives kids a safe sandbox to test ethical trade-offs and logical deductions in a highly funny manner.",
    rating: 5
  },
  {
    id: "rev3",
    name: "Elena Rostova",
    role: "Home Education Organizer",
    content: "We've tried dozens of smart games, but StayGlassy has the best balance of replayability and educational depth. The 'Glassmorphism' visual theme on the website is accurate to the actual high-quality card feel!",
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "What age range is StayGlassy designed for?",
    answer: "The card game is optimized for ages 8 and up. The rules are simplified for elementary students, yet have profound logical deduction frameworks that challenge middle, high school, and adult players.",
    category: "gameplay"
  },
  {
    id: "faq2",
    question: "Does the game align with standard academic curriculum?",
    answer: "Yes! StayGlassy aligns directly with California Common Core State Standards (CCSS) in English Language Arts (Argumentative Writing) and Next Generation Science Standards (NGSS) Scientific Practices (Argumentation from Evidence).",
    category: "educators"
  },
  {
    id: "faq3",
    question: "Do you offer purchase order (PO) support for school districts?",
    answer: "Absolutely. We accept formal School Board purchase orders, district checks, and educational procurement options. Email dakota@stayglassy.ca with your requisition forms or quote requests.",
    category: "sales"
  },
  {
    id: "faq4",
    question: "What is your return policy?",
    answer: "We offer a 30-day money-back guarantee. If you are not completely satisfied with our educational outcomes or materials, we will issue a full refund, no hassle. We also replace classroom cards lost or worn during play.",
    category: "shipping"
  },
  {
    id: "faq5",
    question: "Where are you located and how quickly does shipping take?",
    answer: "We are proudly based in Sacramento, California! Orders typically ship within 1-2 business days, and takes 3-5 business days to arrive anywhere inside continental USA.",
    category: "shipping"
  }
];

export const CARD_MOCKUPS: CardMockup[] = [
  {
    id: "m1",
    title: "Post Hoc Ergo",
    type: "Logic",
    description: "Identify whether the correlation shown in the scenario card actually implies causation. Catch the fallacy to gain bonus points.",
    points: 3,
    flavorText: "Just because the rooster crowed before sunrise doesn't mean it created the dawn.",
    color: "from-cyan-500 to-indigo-505"
  },
  {
    id: "m2",
    title: "Confirmation Veil",
    type: "Reflection",
    description: "Force your opponent to discard evidence cards that only match their pre-existing hypothesis. Keep arguments pristine.",
    points: 4,
    flavorText: "We search merely for the mirror that reflects our beliefs, blinding us to the stars.",
    color: "from-purple-500 to-pink-505"
  },
  {
    id: "m3",
    title: "Socratic Inquirer",
    type: "Ethics",
    description: "Ask three structured questions about the opponent's claim. They must answer without using circular circular statements.",
    points: 5,
    flavorText: "An unexamined argument is not worth playing.",
    color: "from-amber-400 to-orange-505"
  },
  {
    id: "m4",
    title: "Double-Blind Shield",
    type: "Reflection",
    description: "Block any logical fallacy argument initiated against your team this turn. Ensure analytical objectivity.",
    points: 2,
    flavorText: "Removing bias reveals truth, clear as immaculate glass.",
    color: "from-emerald-400 to-teal-505"
  }
];

// SITE BLUEPRINT DELIVERABLES FOR CREATOR'S DASHBOARD

export const SITEMAP_DATA: SitemapNode[] = [
  {
    title: "StayGlassy.ca Root",
    path: "/",
    description: "Primary entrance gateway. Drives trust with schools via educational hero focus + CTAs.",
    children: [
      {
        title: "Home",
        path: "#home",
        description: "Focus: Value proposition, benefits, testimonials, sitemap blueprint access."
      },
      {
        title: "About Us",
        path: "#about",
        description: "Focus: Trust building. Story of Dakota, Sacramento origins, and cognitive development philosophy."
      },
      {
        title: "Game Overview",
        path: "#gameplay",
        description: "Focus: Practicality. Learning Outcomes, rules, PDF downloads, and active mechanics demonstration."
      },
      {
        title: "Educators Workspace",
        path: "#educators",
        description: "Focus: Lead generation. Curriculum alignments, classroom applications, and purchasing guidelines."
      },
      {
        title: "Educator PDF Rules",
        path: "/rules-preview.pdf",
        description: "Static/Printable PDF rules summary with lesson-plan schemas."
      },
      {
        title: "Shop & Checkout",
        path: "#shop",
        description: "Focus: Revenue. Clear packages, tier sizing, custom quantity triggers, and safe payment gateway placeholder."
      },
      {
        title: "FAQs Hub",
        path: "#faq",
        description: "Focus: Friction removal. Categorized questions regarding logistics, curriculum, and refunds."
      },
      {
        title: "Contact Portal",
        path: "#contact",
        description: "Focus: Outreach. Direct connection to Dakota, phone numbers, location map, and email integration."
      }
    ]
  }
];

export const WIREFRAMES: WireframeElement[] = [
  {
    sectionName: "Hero Segment Template",
    description: "High-impact visual entry utilizing a premium floating Glassmorphic card graphic side-by-side with crisp, spacious benefit copy.",
    priorityElements: [
      "Navigation Bar (Logo on left, fluid tab triggers, Blueprint Suite on extreme right)",
      "Main Headline: 'Think Critically. Play Logically.' with neon-accent typography",
      "Two-pronged CTA: 'Buy Starter Pack' (Primary Slate button) and 'Educator Guide' (Secondary Borderless button)",
      "Background: Elegant CSS 3D Particle Nodes mimicking complex argumentation trees"
    ]
  },
  {
    sectionName: "Visual Card Interface Grid",
    description: "An interactive mockup gallery detailing the four card modules (Logic, Reflection, Ethics, Reasoning).",
    priorityElements: [
      "Staggered grid of glass card components displaying actual flavor text and point ratings",
      "Card hover effects with real-time 3D-perspective rotation tracking",
      "Download button for printing the visual placeholder deck"
    ]
  },
  {
    sectionName: "Institutional Lead Generator",
    description: "Designed strictly for teachers and coordinators looking for alignment paperwork.",
    priorityElements: [
      "Curriculum alignment progress tracks (CCSS/NGSS)",
      "Lead collection form for volume custom quote sheets",
      "Video placeholder showcasing active classroom play and engagement"
    ]
  }
];

export const SEO_STRATEGY = {
  targetedKeywords: [
    { keyword: "educational card games", volume: "High", competition: "Medium", priority: "Primary" },
    { keyword: "critical thinking classroom games", volume: "Medium", competition: "Low", priority: "Secondary" },
    { keyword: "Sacramento teacher resources", volume: "Low", competition: "Low", priority: "Geotargeted" },
    { keyword: "logic board games for kids", volume: "High", competition: "High", priority: "Primary" },
    { keyword: "cognitive bias classroom activity", volume: "Medium", competition: "Low", priority: "Niche" }
  ],
  metaTags: {
    title: "StayGlassy | Educational Logic Card Game for Classrooms & Families",
    description: "Empower students to recognize critical thinking, logic fallacies, and cognitive biases. Highly aligned with CCSS & NGSS. Based in Sacramento, CA.",
    ogImage: "https://stayglassy.ca/og-banner.png",
    twitterCard: "summary_large_image"
  },
  structuredDataJSON: `{
  "@context": "https://schema.org",
  "@type": "EducationalApp",
  "name": "StayGlassy Card Game",
  "description": "An educational card game cultivating deductive logic and cognitive bias reflection.",
  "offers": {
    "@type": "Offer",
    "price": "24.99",
    "priceCurrency": "USD"
  },
  "brand": {
    "@type": "Brand",
    "name": "StayGlassy.ca"
  },
  "areaServed": "Sacramento, California",
  "author": {
    "@type": "Person",
    "name": "Dakota",
    "email": "dakota@stayglassy.ca"
  }
}`
};

export const BRAND_STYLE_GUIDE = {
  typography: {
    display: "Outfit (Bold, Tracking-Tight for display headings)",
    body: "Inter (Regular/Medium/SemiBold for standard typography)",
    monospace: "JetBrains Mono (For variables, stats, labels, and point markers)"
  },
  colors: [
    { name: "Glassy Cyan", hex: "#06b6d4", role: "Primary brand accent, interactive highlights" },
    { name: "Logical Violet", hex: "#8b5cf6", role: "Secondary accent, cognitive bias cards" },
    { name: "Cosmic Charcoal", hex: "#090d16", role: "Primary canvas body background" },
    { name: "Immaculate Slate", hex: "#f8fafc", role: "Headings and prominent high-contrast text" }
  ],
  spacingSpecs: {
    heroSection: "96px to 128px vertical padding for high breathability",
    cardGaps: "24px gap for modern bento grids",
    touchTargets: "Minimum 48px size for fluid responsive handling"
  }
};

export const TECH_STACK = {
  frontEnd: {
    library: "React 19 with Vite 6.0",
    styling: "Tailwind CSS v4 Utility Classes",
    animations: "motion/react (Fluid spring transitions & layout animations)",
    rendering3D: "Three.js (Custom Interactive WebGL 3D rotating card node)"
  },
  backEnd: {
    server: "Node.js with Express v4 Framework",
    compiler: "esbuild (bundles into self-contained CommonJS server)",
    integration: "@google/genai SDK (securely calls gemini-3.5-flash server-side)"
  },
  hosting: {
    environment: "Cloud Run containers with persistent TLS",
    ingressRules: "Port 3000 mapped, zero exposure of local key variables"
  }
};

export const CONVERSIONS = [
  {
    topic: "Vibrant Immediate Value Check",
    tip: "Include a 'Free Sample Printout' card PDF instantly at the top. Reduces initial sign-up friction by 35%."
  },
  {
    topic: "District Direct Procurement Integration",
    tip: "A dedicated simple checkbox for 'I am registering as an official School district coordinator' reveals dynamic PO billing parameters, speeding procurement."
  },
  {
    topic: "Interactive Realtime 3D Card Builder",
    tip: "Allow students/parents to design a custom cognitive bias card in WebGL. Sharing their designs doubles viral word-of-mouth."
  }
];

export const MOBILE_DESIGN_SPECS = {
  adaptiveLayout: "Single-column fluid stacking on screen sizes under 768px.",
  touchFeedback: "Tap-active state scales custom card cards down slightly (0.97) using motion parameters.",
  viewportRestrictions: "Prevents text overflow by utilizing proportional clamp() heading structures.",
  navigationHandling: "Fixed lower bottom-bar for instant phone thumb triggers, or a light translucent overlay menu."
};

export const LAUNCH_CHECKLIST = [
  { item: "Configure production GEMINI_API_KEY environment variable.", completed: true },
  { item: "Inject Structured Schema.org educational tag scripts.", completed: true },
  { item: "Embed WCAG alternative text on mock custom card images.", completed: true },
  { item: "Verify that port 3000 triggers correctly with Node container.", completed: true },
  { item: "Check that the WebGL context gracefully fallbacks on low-CPU devices.", completed: true },
  { item: "Configure secure HTTPS redirection for stayglassy.ca custom domains.", completed: false }
];
