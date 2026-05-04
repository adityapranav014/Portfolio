// index.js
export const servicesData = [
  {
    title: "Full-Stack Development",
    icon: "ph:brackets-curly-light",
    description:
      "With a solid track record building web applications end to end, I deliver clean, well-structured code that scales. From REST APIs and auth systems to polished React interfaces, I handle the full picture so you don't have to stitch pieces together.",
    items: [
      {
        title: "Backend Engineering",
        description: "(REST & GraphQL APIs, Microservices, Auth Systems)",
      },
      {
        title: "Frontend Development",
        description: "(React, Next.js, TypeScript, Motion-rich UI/UX)",
      },
      {
        title: "Database Design",
        description: "(SQL/NoSQL, Scalable Schemas, Query Optimisation)",
      },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "ph:cloud-light",
    description:
      "I set up reliable, automated deployment pipelines that let your team ship with confidence. Clean infrastructure, zero-downtime deployments, and performance tuning so your platform stays fast and available as you grow.",
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
    icon: "ph:shield-check-light",
    description:
      "A slow or vulnerable site costs you trust. I audit your codebase, address security gaps, and optimise every bottleneck so your application is both safe for your users and fast enough to keep them.",
    items: [
      {
        title: "Code Audits",
        description: "(Refactoring, Tech-Debt Elimination, OWASP Review)",
      },
      {
        title: "Security Testing",
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
    icon: "ph:device-mobile-light",
    description:
      "A great user experience is what turns visitors into customers. I build high-quality web and mobile applications focused on smooth interactions, fast load times, and interfaces that feel intuitive from the very first tap.",
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
      "A fast, clean storefront built for a premium mobile accessories brand. Focused on smooth browsing, real-time inventory, and smart product recommendations that help customers find exactly what they need.",
    fullDescription:
      "The client needed a storefront that could handle product variants, bundle deals, and MagSafe compatibility filtering without slowing the browse experience. I architected a Next.js front-end backed by a Node.js/MongoDB API, with server-side rendering on category pages for SEO and client-side transitions for speed. The recommendation engine queries purchase history to surface related accessories per device model.",
    challenge: "The existing Shopify store was slow — 6-second TTI on mobile — and the bundle logic required three separate page refreshes. The client was losing customers at the product page.",
    process: [
      { step: "01", title: "Audit & Architecture", body: "Ran Lighthouse and WebPageTest on the existing store. Mapped every API call and identified redundant fetches on product pages. Proposed a Next.js migration with ISR for category pages and client-side transitions for cart interactions." },
      { step: "02", title: "Data Modelling", body: "Redesigned the product schema in MongoDB to flatten variant trees and precompute bundle compatibility at write time, eliminating N+1 queries on the product detail page." },
      { step: "03", title: "Recommendation Engine", body: "Built a lightweight collaborative filter in Node.js that queries purchase co-occurrence. Integrated as a non-blocking sidebar component — it fails silently and never blocks the critical path." },
      { step: "04", title: "Performance Tuning", body: "Applied image CDN transforms, HTTP/2 push for above-fold assets, and a service worker for repeat visitors. Achieved sub-2s FCP on throttled 3G in final Lighthouse audit." },
    ],
    outcomes: [
      { metric: "2.0 s", label: "First Contentful Paint on 3G" },
      { metric: "+34%", label: "Average order value from bundles" },
      { metric: "91", label: "Lighthouse Performance score" },
    ],
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
      "A boutique e-commerce experience for a plant retailer who wanted their digital presence to feel as considered as their curation. Editorial-first layout, frictionless checkout, and content that genuinely drives organic traffic.",
    fullDescription:
      "A boutique plant retailer wanted a digital presence as considered as their curation. I built a Next.js storefront with a headless CMS for care guides, Stripe for checkout, and an editorial-first layout that foregrounds photography. Lazy-loaded image grids and optimistic UI on the cart made the experience feel native despite the lean infrastructure.",
    challenge: "The client had great photography and zero online presence. Their only channel was Instagram — no checkout, no organic search footprint, and no way to capture repeat customers.",
    process: [
      { step: "01", title: "Content Strategy", body: "Identified that plant care guides were high-intent search queries with zero competition in their niche. Proposed a headless CMS (Sanity) so the owner could publish guides without developer involvement." },
      { step: "02", title: "Photography-first Layout", body: "Designed a full-bleed grid that puts product photography at 100% viewport width. No sidebar, no clutter — the product is the hero on every page." },
      { step: "03", title: "Checkout Flow", body: "Integrated Stripe Checkout with optimistic UI on the cart — items appear instantly and sync in the background. Reduced perceived cart-add latency to zero." },
      { step: "04", title: "SEO & Indexability", body: "All care guide pages are statically generated with structured data markup. Within 3 months the guide section was ranking on page one for 14 long-tail plant care queries." },
    ],
    outcomes: [
      { metric: "60%", label: "Organic acquisition from care guides" },
      { metric: "14", label: "Page-one rankings within 3 months" },
      { metric: "+28%", label: "Repeat purchase rate vs Instagram DMs" },
    ],
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
      "A high-performance marketplace for Apple products and accessories. Real-time price updates, fast filtering, and a clean admin dashboard that lets non-technical staff manage inventory without any developer help.",
    fullDescription:
      "Working within a .NET stack, I built a Blazor WebAssembly front-end that communicates with an ASP.NET Core API and SQL Server database. The focus was performance: virtual scrolling on long product lists, debounced filter chains, and a SignalR-powered deal ticker that updates prices without page refreshes.",
    challenge: "The client's existing .NET back-end was solid but the front-end was a jQuery monolith with full-page reloads on every filter change. The business needed a modern UI without a backend rewrite.",
    process: [
      { step: "01", title: "Blazor WASM Migration", body: "Chose Blazor WebAssembly to stay within the .NET ecosystem and reuse existing C# models. Component boundaries were drawn to match the existing API surface, minimising backend changes." },
      { step: "02", title: "Virtual Scrolling", body: "Implemented windowed rendering for product lists with 500+ items. DOM node count dropped from ~4,000 to ~80, making scroll buttery smooth even on lower-end devices." },
      { step: "03", title: "SignalR Deal Ticker", body: "Replaced polling with a SignalR hub that pushes price changes from the backend. Price updates now appear within 200ms across all connected clients." },
      { step: "04", title: "Admin Dashboard", body: "Built a role-scoped admin interface with drag-and-drop featured slot management. Non-technical staff can run promotions end-to-end without filing a support ticket." },
    ],
    outcomes: [
      { metric: "~80", label: "Active DOM nodes vs 4,000 previously" },
      { metric: "200 ms", label: "Price update latency via SignalR" },
      { metric: "0", label: "Developer tickets from ops staff post-launch" },
    ],
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
      "A retail platform built around time-limited flash sales across multiple product categories. Operators can schedule promotions weeks in advance, and the platform handles the complexity behind the scenes.",
    fullDescription:
      "A regional electronics retailer needed a platform that could run time-limited flash sales across multiple product categories simultaneously. I built the Vue.js front-end with Vuex state management and a Laravel API that powered the sale-countdown logic, faceted search, and inventory reservation.",
    challenge: "Flash sales drove 80% of the client's revenue but were run manually via spreadsheet and WhatsApp messages to staff. Race conditions on inventory meant overselling was a weekly occurrence.",
    process: [
      { step: "01", title: "Inventory Reservation Model", body: "Designed a pessimistic locking pattern in MySQL that reserves stock at cart-add time with a 15-minute TTL. Overselling dropped to zero on day one." },
      { step: "02", title: "Scheduled Promotions", body: "Built a promotion scheduler in Laravel that activates pricing rules, countdown timers, and category visibility windows on a cron — no developer involvement required." },
      { step: "03", title: "Faceted Search", body: "Implemented server-side facet aggregation with cached filter counts. Filter interactions respond in under 100ms even with 50,000 SKUs in the catalogue." },
      { step: "04", title: "Load Testing", body: "Stress-tested the checkout flow with k6 at 5,000 concurrent users. Tuned Nginx worker counts, MySQL connection pooling, and enabled HTTP keep-alive before the launch." },
    ],
    outcomes: [
      { metric: "3×", label: "Daily revenue spike on launch day" },
      { metric: "0", label: "Oversell incidents since launch" },
      { metric: "<100 ms", label: "Filter response at 50k SKUs" },
    ],
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
      "An editorial-first marketplace for a luxury home decor brand. Photography leads the experience, while real-time wishlist syncing and shareable filter states keep the browsing smooth and the session time high.",
    fullDescription:
      "The brief was editorial-first: product photography needed to lead, not compete with UI chrome. I built an Angular application with a GraphQL layer over Firebase, enabling real-time wishlist syncing across devices. The filtering system uses a faceted GraphQL query that composes from URL params, so every filter state is shareable and indexable.",
    challenge: "The previous site was product-list heavy with small thumbnails and dense UI. Analytics showed users bounced within 10 seconds — they weren't engaging with the photography at all.",
    process: [
      { step: "01", title: "UX Audit", body: "Heatmaps showed users clicking on product images but landing on a detail page with even smaller photos. Redesigned the information architecture to surface full-bleed imagery at every level." },
      { step: "02", title: "GraphQL Filter Layer", body: "Built a composable filter system where every selection is written to the URL as a GraphQL query fragment. Every filtered view is bookmarkable and shareable — customers now send links instead of screenshots." },
      { step: "03", title: "Real-time Wishlist", body: "Implemented Firebase Realtime Database for wishlist state. Changes propagate across tabs and devices in under 50ms — the wishlist feels alive rather than stale." },
      { step: "04", title: "Typography & Spacing", body: "Moved to a strict 8px baseline grid and reduced the number of font sizes from 11 to 5. White space doubled. The product became the focal point rather than the interface." },
    ],
    outcomes: [
      { metric: "+22%", label: "Session duration vs previous site" },
      { metric: "<50 ms", label: "Wishlist sync latency across devices" },
      { metric: "5", label: "Font sizes (down from 11)" },
    ],
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
      "A game store built to feel as fast as the titles it sells. Svelte's compile-time reactivity keeps filters instant, a WebSocket feed keeps the charts live, and the platform launched with 10k concurrent users on opening day.",
    fullDescription:
      "A gaming startup wanted a store that felt as fast as the games it sold. Svelte's compile-time reactivity eliminated virtual DOM overhead, giving near-instant filter and search responses. The Node.js backend serves a top-sellers feed over WebSocket, updating the homepage chart in real time without polling.",
    challenge: "Gaming audiences expect sub-100ms interactions. The React prototype the startup had built felt sluggish on filter changes and the WebSocket chart prototype crashed under modest load in staging.",
    process: [
      { step: "01", title: "Framework Decision", body: "Benchmarked Svelte vs React for the filter interaction. Svelte's compiled output cut the JS bundle by 58% and eliminated virtual DOM diffing — filter changes now render in a single frame." },
      { step: "02", title: "Tag Graph Discovery", body: "Modelled genres and themes as a graph in MongoDB. The discovery algorithm traverses two hops from the current title, surfacing related games that don't share an obvious category — leading to a 19% increase in pages per session." },
      { step: "03", title: "WebSocket Architecture", body: "Built a Node.js pub/sub layer that aggregates sales events and pushes ranked updates to the homepage chart at 5-second intervals. Load-tested at 12,000 concurrent connections with no degradation." },
      { step: "04", title: "Launch Readiness", body: "Ran a 72-hour pre-launch load test targeting 15,000 concurrent users. Tuned PM2 cluster mode, added Redis for session caching, and configured Cloudflare in front of the origin. Zero downtime on opening weekend." },
    ],
    outcomes: [
      { metric: "10 k", label: "Concurrent users on opening weekend" },
      { metric: "+19%", label: "Pages per session from tag-graph discovery" },
      { metric: "−58%", label: "JS bundle vs React prototype" },
    ],
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
