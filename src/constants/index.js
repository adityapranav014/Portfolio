// index.js
export const servicesData = [
  {
    title: "FullStack Development",
    description:
      "Your business deserves a fast, secure, and future-proof digital foundation. I architect custom web applications with clean separation of concerns, optimised data layers, and battle-tested integrations, so every layer holds under real-world pressure.",
    items: [
      {
        title: "Backend Engineering",
        description: "(REST & GraphQL APIs, Microservices, Auth Systems)",
      },
      {
        title: "Frontend Craft",
        description: "(React, Next.js, TypeScript, Motion-rich UI/UX)",
      },
      {
        title: "Database Design",
        description: "(SQL/NoSQL, Scalable Schemas, Query Optimisation)",
      },
    ],
  },
  {
    title: "DevOps & Cloud",
    description:
      "Shipping software shouldn't keep you up at night. I automate infrastructure, enforce security at every gate, and leverage cloud platforms so your product runs clean, 24/7, at any scale, without surprises.",
    items: [
      {
        title: "CI/CD Pipelines",
        description: "(GitHub Actions, Docker, Kubernetes)",
      },
      {
        title: "Server Management",
        description: "(Linux, Nginx, Load Balancing, Zero-downtime Deploys)",
      },
      {
        title: "Performance Tuning",
        description: "(Edge Caching, Compression, Lighthouse 90+ Scores)",
      },
    ],
  },
  {
    title: "Security & Optimisation",
    description:
      "Slow or compromised apps erode trust quietly and fast. I harden every surface (XSS/SQLi protection, OAuth flows, rate limiting) then optimise bottlenecks until the numbers stop being excuses.",
    items: [
      {
        title: "Code Audits",
        description: "(Refactoring, Tech-Debt Elimination, OWASP Review)",
      },
      {
        title: "Penetration Testing",
        description: "(Vulnerability Assessments, Threat Modelling)",
      },
      {
        title: "SEO Engineering",
        description: "(SSR, Structured Data, Core Web Vitals)",
      },
    ],
  },
  {
    title: "Web & Mobile Apps",
    description:
      "A clunky interface can sink the best ideas. I craft responsive, pixel-precise web and mobile applications that users actually enjoy, bridging interaction design and engineering without the usual trade-offs.",
    items: [
      {
        title: "Cross-Platform Apps",
        description: "(React Native / Flutter: single codebase, iOS & Android)",
      },
      {
        title: "Progressive Web Apps",
        description: "(Offline Mode, Push Notifications, App-shell Model)",
      },
      {
        title: "E-Commerce Systems",
        description: "(Checkout Flows, Payment Gateways, Inventory APIs)",
      },
    ],
  },
];

export const projects = [
  {
    id: 1,
    slug: "mobile-accessories-store",
    name: "Mobile Accessories Store",
    role: "Full-Stack Development",
    year: "2024",
    description:
      "A high-conversion storefront for phone accessories (cases, chargers, and MagSafe-compatible gear) with real-time inventory, smart recommendations, and a sub-2s load time on 3G.",
    fullDescription:
      "The client needed a storefront that could handle product variants, bundle deals, and MagSafe compatibility filtering without slowing the browse experience. I architected a Next.js front-end backed by a Node.js/MongoDB API, with server-side rendering on category pages for SEO and client-side transitions for speed. The recommendation engine queries purchase history to surface related accessories per device model. Result: a sub-2-second first paint on 3G and a 34% increase in average order value from bundle suggestions.",
    href: "",
    image: "/assets/projects/mobile-accessories-store.jpg",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    slug: "plant-shop",
    name: "Plant Shop E-Commerce",
    role: "Full-Stack Development",
    year: "2024",
    description:
      "A botanically-inspired storefront for rare and decorative plants. Stripe-powered checkout, care-guide CMS, and a clean browsing experience that converts browsers into buyers.",
    fullDescription:
      "A boutique plant retailer wanted a digital presence as considered as their curation. I built a Next.js storefront with a headless CMS for care guides, Stripe for checkout, and an editorial-first layout that foregrounds photography. Lazy-loaded image grids and optimistic UI on the cart made the experience feel native despite the lean infrastructure. The care-guide section became the highest-traffic page, doubling as SEO content that drove 60% of organic acquisition.",
    href: "",
    image: "/assets/projects/plant-shop.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Stripe API" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    slug: "apple-tech-marketplace",
    name: "Apple Tech Marketplace",
    role: "Frontend & Integration",
    year: "2023",
    description:
      "A curated marketplace for Apple products and accessories with live deal feeds, smart category filtering, and a Blazor-powered admin dashboard built for speed.",
    fullDescription:
      "Working within a .NET stack, I built a Blazor WebAssembly front-end that communicates with an ASP.NET Core API and SQL Server database. The focus was performance: virtual scrolling on long product lists, debounced filter chains, and a SignalR-powered deal ticker that updates prices without page refreshes. The admin dashboard gives non-technical staff full control over promotions, inventory, and featured slots.",
    href: "",
    image: "/assets/projects/apple-tech-store.jpg",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Blazor" },
      { id: 2, name: "ASP.NET Core" },
      { id: 3, name: "SQL Server" },
      { id: 4, name: "Bootstrap" },
    ],
  },
  {
    id: 4,
    slug: "electronics-gadgets-store",
    name: "Electronics & Gadgets Store",
    role: "Full-Stack Development",
    year: "2023",
    description:
      "A multi-category retail platform covering electronics, home appliances, and gaming gear, featuring dynamic flash-sale engine, faceted search, and a Laravel admin built for non-technical ops teams.",
    fullDescription:
      "A regional electronics retailer needed a platform that could run time-limited flash sales across multiple product categories simultaneously. I built the Vue.js front-end with Vuex state management and a Laravel API that powered the sale-countdown logic, faceted search, and inventory reservation. The admin panel lets ops staff schedule sales weeks in advance with zero developer involvement. The flash-sale feature drove a 3× spike in daily revenue on launch day.",
    href: "",
    image: "/assets/projects/electronics-store.jpg",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Vue.js" },
      { id: 2, name: "Laravel" },
      { id: 3, name: "MySQL" },
      { id: 4, name: "SCSS" },
    ],
  },
  {
    id: 5,
    slug: "home-decor-marketplace",
    name: "Home Decor Marketplace",
    role: "Frontend Development",
    year: "2023",
    description:
      "A curated platform for designer furniture and artisan homeware with GraphQL-powered filtering, editorial product photography layout, and real-time wishlist syncing via Firebase.",
    fullDescription:
      "The brief was editorial-first: product photography needed to lead, not compete with UI chrome. I built an Angular application with a GraphQL layer over Firebase, enabling real-time wishlist syncing across devices. The filtering system uses a faceted GraphQL query that composes from URL params, so every filter state is shareable and indexable. The whitespace-heavy layout and full-bleed imagery drove a 22% improvement in session duration versus the previous site.",
    href: "",
    image: "/assets/projects/home-decor-store.jpg",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "Angular" },
      { id: 2, name: "Firebase" },
      { id: 3, name: "GraphQL" },
      { id: 4, name: "Material UI" },
    ],
  },
  {
    id: 6,
    slug: "digital-game-store",
    name: "Digital Game Store",
    role: "Full-Stack Development",
    year: "2022",
    description:
      "A gaming platform with discounted titles, genre-based discovery, and a live top-sellers feed, with Svelte's reactivity keeping every interaction instant, no page reloads needed.",
    fullDescription:
      "A gaming startup wanted a store that felt as fast as the games it sold. Svelte's compile-time reactivity eliminated virtual DOM overhead, giving near-instant filter and search responses. The Node.js backend serves a top-sellers feed over WebSocket, updating the homepage chart in real time without polling. Genre-based discovery uses a tag graph to surface related titles beyond simple category matches. The platform launched with 10k concurrent users on opening weekend with zero downtime.",
    href: "",
    image: "/assets/projects/game-store.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Svelte" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Chakra UI" },
    ],
  },
];

export const socialImgs = [
  {
    name: "call",
    url: "tel:+916200284805",
  },
  {
    name: "whatsapp",
    url: "https://wa.me/916200284805?text=Hi%20Aditya%2C%20loved%20your%20portfolio%21%20I%20have%20a%20project%20idea%20and%20would%20love%20to%20collaborate.%20Let%27s%20create%20something%20extraordinary%20together.",
  },
  {
    name: "email",
    url: "mailto:adityapranav014@gmail.com",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/adityapranav014/",
  },
];
