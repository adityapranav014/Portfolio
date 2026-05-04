# Awwwards Jury Audit — Aditya Pranav Portfolio

**Audit Date:** May 4, 2026  
**Stack:** React 19, Vite, GSAP, Lenis, Tailwind CSS 4, ImageKit  
**Self-Assessed Target:** 8.0+ / 10  
**Jury Estimated Score:** ~6.5 / 10 *(updated after session 1 fixes)*

---

## Score Breakdown

| Category | Weight | Raw Score | Weighted |
|---|---|---|---|
| Design | 40% | 7.0 / 10 | 2.80 |
| Usability | 30% | 7.0 / 10 | 2.10 |
| Creativity | 20% | 6.5 / 10 | 1.30 |
| Content | 10% | 3.0 / 10 | 0.30 |
| **Total** | | | **6.50** |

> Note: Awwwards also has a separate "Mobile" review axis. See Section 5 for those findings.

---

## 1. Design (40%) — Score: 7.0 / 10

### What's Working
- The two-tone palette (`#e5e5e0` cream / `#393632` dark lava / `#cfa355` gold) is tasteful and coherent.
- Amiamie as the display face is a strong, distinctive choice that immediately elevates the aesthetic.
- The dark sections (`bg-black`) against the light hero create a compelling visual rhythm.
- The animated spinning-star glyph appended to section titles is a nice editorial touch.
- ~~Section header repetition resolved~~ — each section now has a distinct compositional voice: index-grid (Services), watermark-split (About), counter-rule (Works), two-line indented statement (Contact). ✓

### Critical Gaps

**1.2 — Typographic system has no midrange**  
The site jumps from enormous display text to tiny `text-[10px] tracking-[0.35em]` labels with very little in between. Body copy (`text-xl` or `text-2xl`) often sits at an uncomfortable scale relative to the sections it's in. There is no clearly defined type scale — sizes like `text-[15px]`, `text-xl`, `text-2xl`, `text-3xl`, and `text-4xl` appear ad hoc throughout Contact and Navbar.

**1.3 — The hero light effects are over-engineered and visually noisy**  
The hero section contains **8 separate layered `div` elements** for the volumetric lighting effect (core sun, inner hotspot, main ray, secondary ray, mobile ray, atmospheric wash, shadow contrast, text scrim). The combined output is a slightly blurry golden corner that reads as "compression artifact" on most monitors rather than cinematic. A single, well-crafted mask-gradient would be cleaner and faster to render. The inline comments (`// REALISTIC VOLUMETRIC SUN LIGHT`, `// RAY OF HOPE`) suggest the complexity outgrew its original concept.

**1.4 — Services section has zero visual differentiation between cards**  
The four sticky service cards share identical styling, spacing, and typographic treatment. The only differentiation is the `0X` index and the title text. There is no color, imagery, iconography, or layout variation to help the eye understand that these are meaningfully different offerings.

**1.5 — The footer is not rendered at all** *(live-verified)*  
`Footer.jsx` exists in the codebase and contains a copyright line, but it is never imported or mounted in `App.jsx`. There is literally no `<footer>` element in the DOM. A browser inspector confirms this. An Awwwards site must have a considered footer — at minimum: navigation links, social icons, a contact prompt, and a copyright. This component needs to be wired into `HomePage` and substantially expanded.


---

## 2. Usability (30%) — Score: 7.0 / 10


### Critical Gaps



**2.3 — `react-scroll` and React Router coexist without coordination**  
The Navbar uses `react-scroll` `<Link>` for same-page anchoring and React Router `<Link>` for the project detail route. When a user is on a project detail page and clicks a Nav link (if Nav were visible), `react-scroll` would not scroll to any section because it doesn't interact with React Router's location. This creates a broken navigation state on the `/work/:slug` route.

**2.4 — `document.body.style.overflow` is set in three separate components**  
`Preloader`, `Navbar`, and `App` all independently toggle `body.style.overflow`. If two of these are active simultaneously, the last one to run wins, potentially unlocking scroll while the preloader is still active.

**2.6 — The Preloader uses a fragile global window flag pattern**  
`window.isPreloaderDone` and `window.addEventListener("hero:animate", ...)` are used to coordinate hero animation after the preloader completes. This is a brittle pub/sub pattern using the global `window` object. If `hero:animate` fires before the Hero component mounts (e.g. on a slow device), the animation never plays and the hero content remains invisible.

---

## 3. Creativity (20%) — Score: 6.5 / 10

### Critical Gaps

**3.1 — The `canvas.jsx` cursor trail is tonally wrong**  
The sinuous rainbow/colored fluid cursor trail is a direct reference to a decade-old CodePen demo. It is aggressively inconsistent with the minimal, muted, editorial aesthetic of everything else on the site. It looks like a feature from a completely different project that was ported in. It actively undermines the brand impression.

**3.2 — The ServiceSummary section is visually inert on desktop**  
The horizontal-scrub discipline rows (Architecture, Development, Deployment...) are a nice concept but scroll by quickly and feel disconnected from the actual service offerings below. The xPercent values (up to 60%) cause text to fly completely off-screen, which reads as broken rather than editorial.

**3.3 — framer-motion is installed but effectively unused**  
The `package.json` lists `framer-motion: ^12.38.0` as a dependency. Framer Motion is approximately 40–60kb gzipped. If it is not being used for meaningful animations, it should be removed. Shipping a dependency that adds to bundle weight and CLS risk with no user-facing benefit is a technical and conceptual problem.

**3.4 — Project Detail page is structurally thin**  
The ProjectDetail layout is: large title → hero image → role/year/description text → tech tags → two navigation buttons. There is no visual storytelling, no process imagery, no case study flow, and no "what was the actual impact" section structured in a way that holds attention. Awwwards project showcases are expected to demonstrate photographic/design depth, not just list a paragraph of text.

**3.5 — No moment of unexpected delight below the fold**  
The preloader is the strongest creative moment on the site, but it precedes the page. After it exits, the scroll journey is largely conventional: hero → service summary → services → about → works → CTA → contact. There is no section that does something the jury has never seen before, no interaction that makes them stop and say "how did they do that?".

---

## 4. Content (10%) — Score: 3.0 / 10

> Note: Awwwards evaluates "Content" as a distinct axis alongside Design, Usability, and Creativity.

### Critical Gaps


**4.2 — Project descriptions are marketing copy, not case studies**  
The `fullDescription` fields read well but are entirely self-reported claims ("sub-2-second first paint", "34% increase in average order value") with no supporting evidence, screenshots, or linked documentation. Jurors cannot verify these claims.
Search for message. Hey, Cortana. The local. Campbell. 

**4.4 — Personal bio is minimal and generic**  
The About section tagline — "Obsessed with building fast, intuitive apps, from pixel-perfect UIs to reliable backends" — is indistinguishable from hundreds of other developer portfolios. The "When I'm not shipping" list (open-source, teaching, rock climbing, guitar) is relatable but not memorable. There is no unique professional story, no stated philosophy, and no specific accomplishment.

**4.5 — The SocialCardGenerator.html file is in the project root**  
`SocialCardGenerator.html` is an unrelated utility file sitting at the root of the deployed project. Visiting `yourdomain.com/SocialCardGenerator.html` would expose this raw HTML document. It should be removed or gitignored before submission.

---

## 5. Mobile Experience

Awwwards scores mobile separately and it significantly affects the final award level (Site of the Day vs. Developer Award vs. Honorable Mention).

| Issue | Severity |
|---|---|
| Canvas cursor trail renders on mobile but has no effect (touch device) — wasted render | Medium |
| Hero video autoplay is muted/playsInline correctly, but there is no poster image — shows black screen on slow connections | High |
| `ServiceSummary` horizontal text rows at 8-10% xPercent on mobile — barely perceptible and the section reads as empty whitespace | Medium |
| Contact section stacks the video above the email/phone — correct, but the video aspect ratio (1360:480) collapses to a very short strip on mobile | Medium |
| Navbar overlay is full-screen — good | Pass |
| Magnetic component is touch-inactive — good (no unwanted elastic on touch) | Pass |

---

## 6. Technical Execution (10%) — Score: 7.5 / 10


### Critical Gaps

**6.1 — Hero video has no poster attribute**  
`<video autoPlay loop muted playsInline>` with no `poster` means the video area is black while the video loads. On slow connections this is a full-height black void during first paint. A static poster frame should be extracted and applied.

**6.2 — framer-motion adds dead bundle weight**  
As noted above, framer-motion is listed as a dependency but does not appear to be used anywhere in the codebase. At ~60kb gzipped, this inflates the JS bundle unnecessarily.

**6.3 — `react-useanimations` is a heavy dependency for a single arrow icon**  
`react-useanimations` is used only for the `arrowUp` animation in the Works and ProjectDetail sections. This entire library is loaded for one animation. A native GSAP or CSS animation would have zero dependency cost.

**6.4 — DOM injection pattern for curtain transitions is an antipattern**  
`navigateWithCurtain` and `openProject` use `document.createElement("div")` + `document.body.appendChild` + manual removal inside a GSAP `onComplete` callback. If the component unmounts before the callback fires (back button, rapid navigation), the curtain div leaks into the DOM permanently. This should be a React-managed portal.

**6.5 — No error boundary**  
There is no `ErrorBoundary` component anywhere in the app. A runtime error in any section will unmount the entire page and show a blank screen.

**6.6 — No 404 route defined**  
The router in `App.jsx` handles `/` and `/work/:slug` but has no catch-all `*` route. Navigating to any undefined URL renders nothing.

**6.7 — Noise animation is 0.2s/steps(2) — this is 10fps, not real film grain**  
The noise overlay animates at `steps(2)` over `0.2s` which is a 10fps step animation. Real film grain animates at 24fps minimum. This can appear choppy on high-refresh monitors. Consider `steps(4)` over `0.1s` for a smoother grain.

---

## 7. Priority Action Matrix

| Priority | Section | Issue |
|---|---|---|
| p1 — High | Content | Build actual case study layouts inside ProjectDetail (process, screens, results) |
| p1 — High | Technical | Remove framer-motion if unused; remove react-useanimations |
| p1 — High | Technical | Add a catch-all 404 route |
| p2 — Medium | Design | Footer component exists but is **never rendered** — wire it into App.jsx and expand it |
| p2 — Medium | Design | Differentiate the four Services cards visually |
| p2 — Medium | Technical | Refactor curtain transitions into a React portal/state pattern |
| p2 — Medium | Technical | Add a top-level ErrorBoundary |
| p3 — Polish | Design | Refine the hero volumetric light from 8 divs to 1–2 well-crafted layers |
| p3 — Polish | Creativity | Add a signature "unexpected delight" interaction mid-scroll |
| p3 — Polish | Technical | Increase noise animation to `steps(4)` over `0.1s` |
| p3 — Polish | Content | Remove or gitignore `SocialCardGenerator.html` |

---

## 8. What Would Push This to 8.0+

To reach the score required for a Site of the Day nomination, the following changes are non-negotiable:

1. **A custom cursor system** that adapts to context — plain dot at rest, label on hover over CTAs, scale-up on link hover, disappear on mobile.
2. **At least three live project links** to real, polished deployed work that can be visited by jurors.
3. **A ProjectDetail page that reads as a case study**, not a product card.
4. **One truly unexpected creative moment** somewhere in the scroll journey that no other portfolio does.

The technical foundation (GSAP, Lenis, ImageKit, schema markup, Vite) is strong. The motion vocabulary (preloader, VideoHover, curtain transitions) is promising. The section compositional differentiation has been resolved. The remaining weaknesses are content depth, the cursor, and live project links.
