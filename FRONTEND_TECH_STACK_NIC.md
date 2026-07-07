# SMVD Frontend — Tech Stack Documentation
### Sri Manakula Vinayagar Devasthanam · Online Services Portal
> **Prepared for:** National Informatics Centre (NIC) — Server Compatibility Review  
> **Document type:** Frontend Technology Stack Brief  
> **Date:** July 2026  
> **Scope:** Frontend application only (`smvd-frontend`)

---

## 1. Overview

The SMVD Online Services Portal frontend is a **server-rendered web application** built on Next.js 14 (App Router). It communicates with a separate FastAPI backend over HTTP. This document describes only the frontend — its runtime requirements, dependencies, build pipeline, and what the NIC server needs to support in order to host it.

---

## 2. Core Framework

| Item | Value |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) `14.2.4` |
| **Runtime** | Node.js >= 18.17.0 (LTS recommended: Node 20 LTS) |
| **Package Manager** | npm >= 9.x |
| **React Version** | React `18.3.1` |
| **Language** | TypeScript `5.5.2` |
| **Module Format** | ESNext (compiled to CommonJS by Next.js build) |

> **Key point for NIC:** The server must have **Node.js 18 or 20 LTS** installed. The application is started with `npm start` (after `npm run build`). No Python, no Nginx configuration is required for the frontend itself — Next.js ships its own HTTP server.

---

## 3. Rendering Model

Next.js 14 with the **App Router** is used. The rendering strategy is **hybrid**:

| Section | Rendering Strategy | Reason |
|---|---|---|
| Homepage (scrollytelling) | Client-Side + RSC shell | Heavy GSAP canvas animations |
| Services catalogue | Client-Side Component | Horizontal scroll requires browser APIs |
| Booking form | Client-Side Component | Interactive multi-step form state |
| Donation (E-Undiyal) | Client-Side Component | Payment gateway JS SDK |
| My Bookings | Client-Side Component | User authentication state |
| History, Footer | Server Component (static) | No interactivity required |
| Metadata / SEO | Server-side (`generateMetadata`) | Correct page titles and OG tags |

**Production Build Output:** Next.js compiles the entire application into an optimized static+server bundle inside `.next/`. This is served by `next start`.

---

## 4. Production Startup Commands

```bash
# Step 1 — Install dependencies (once, or on deploy)
npm install

# Step 2 — Build for production
npm run build

# Step 3 — Start production server
npm start
# Default port: 3000
# Can be changed: PORT=8080 npm start
```

> **NIC Note:** The application listens on **TCP port 3000** by default. A reverse proxy (Nginx or Apache) in front of it on port 80/443 is the recommended architecture. NIC's existing Nginx or HTTPS termination layer should proxy requests to `localhost:3000`.

---

## 5. All Dependencies

### 5.1 Production Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | `14.2.4` | Core framework — SSR, routing, image optimization, font loading |
| `react` | `18.3.1` | UI component library |
| `react-dom` | `18.3.1` | DOM renderer for React |
| `gsap` | `3.12.5` | Animation engine — scrollytelling, canvas sequence, sticky-stack patterns |
| `@gsap/react` | `2.1.1` | React hooks wrapper for GSAP |
| `clsx` | `2.1.1` | Conditional CSS class utility |
| `tailwind-merge` | `2.3.0` | Merge Tailwind classes without conflicts |
| `lucide-react` | `0.395.0` | SVG icon library (MIT licensed) |

### 5.2 Development / Build Dependencies

| Package | Version | Purpose |
|---|---|---|
| `typescript` | `5.5.2` | Type checking — **not required at runtime** |
| `tailwindcss` | `3.4.4` | CSS utility framework — **compiled away at build time** |
| `postcss` | `8.4.38` | CSS processing pipeline — **build time only** |
| `autoprefixer` | `10.4.19` | Adds vendor CSS prefixes — **build time only** |
| `eslint` | `8.57.0` | Code linting — **development only** |
| `eslint-config-next` | `14.2.4` | Next.js ESLint ruleset |
| `@types/node` | `20.14.9` | TypeScript types for Node.js |
| `@types/react` | `18.3.3` | TypeScript types for React |
| `@types/react-dom` | `18.3.0` | TypeScript types for React DOM |

> **Key point for NIC:** The `devDependencies` (TypeScript, Tailwind, PostCSS, ESLint) are **only needed during the build step** (`npm run build`). They are **NOT required at runtime**. Once the build is complete, the server only needs to run `npm start`, which requires only Node.js.

---

## 6. CSS & Styling

| Technology | Details |
|---|---|
| **Tailwind CSS** | `v3.4.4` — Utility-first CSS. Compiled to a single optimized CSS file at build time. No Tailwind runs on the server. |
| **PostCSS** | Used during build only — processes Tailwind and adds vendor prefixes via `autoprefixer`. |
| **CSS Custom Properties** | Design tokens (colors, spacing, easing) are defined as CSS variables in `globals.css`. |
| **No CSS-in-JS** | No styled-components, no Emotion. All styles are plain CSS / Tailwind utilities — no runtime CSS injection. |
| **Fonts** | Loaded via `next/font/google` — Cormorant Garamond, Inter, JetBrains Mono. Fonts are **self-hosted** by Next.js at build time (downloaded from Google Fonts once during build, then served locally). No Google Fonts requests at runtime. |

---

## 7. Animation Libraries

| Library | Version | License | Usage |
|---|---|---|---|
| `GSAP` (GreenSock) | `3.12.5` | Standard GSAP License (free for non-commercial/government) | Canvas frame scrubbing, horizontal pan, sticky-stack scroll, stagger reveals |
| `@gsap/react` | `2.1.1` | Same as GSAP | React integration hooks |

> **Note for NIC:** GSAP runs entirely in the **browser (client-side)**. It has zero server-side footprint. No GSAP code runs on the NIC server.

---

## 8. Static Assets

| Asset | Location | Size |
|---|---|---|
| Temple scrollytelling frames | `public/sequence/` | 151 JPEG images (~38 MB total) |
| Icons (from lucide-react) | Inline SVG in bundle | Negligible |
| Fonts | Auto-downloaded to `.next/static/media/` at build | ~500 KB |

> **NIC Note:** All files in `public/` are served as static files by Next.js. The 151 JPEG frames are the largest assets. If NIC's infrastructure has a CDN in front, these should be configured to cache `/_next/static/*` and `/sequence/*` paths.

---

## 9. Environment Variables

The frontend currently has **no required environment variables** for running in demo mode. When backend integration is enabled, one variable will be needed:

```env
# .env.local (to be provided at deployment time)
NEXT_PUBLIC_API_BASE_URL=https://api.smvd.nic.in
```

> `NEXT_PUBLIC_*` variables are **baked into the client bundle at build time** — not read from the environment at runtime. This means the build must be re-run if the API URL changes.

---

## 10. Network Requirements

The frontend application makes outbound HTTP calls **only to the SMVD backend API** (FastAPI). No other external APIs are called at runtime from the server.

| Outbound Call | Destination | Made By |
|---|---|---|
| Temple services list | `{API_BASE_URL}/api/v1/services` | Browser (client-side) |
| Booking availability check | `{API_BASE_URL}/api/v1/calendar/availability` | Browser (client-side) |
| Create booking | `{API_BASE_URL}/api/v1/bookings` | Browser (client-side) |
| E-Undiyal donation initiate | `{API_BASE_URL}/api/v1/e-undiyal/initiate` | Browser (client-side) |
| Active notices | `{API_BASE_URL}/api/v1/notices` | Browser (client-side) |
| Payment gateway JS SDK | `checkout.razorpay.com` | Browser only (on payment page) |

> **Important:** The NIC server itself makes **zero outbound API calls**. All API requests originate from the end user's browser. The Node.js process on NIC's server only serves HTML/JS/CSS pages.

---

## 11. Node.js Version Compatibility

| Node.js Version | Compatible? | Notes |
|---|---|---|
| Node 16.x | Partial | Not recommended — Next.js 14 requires 18+ |
| Node 18.x LTS | Yes | Minimum recommended version |
| Node 20.x LTS | Yes | Recommended for production |
| Node 22.x | Yes | Compatible with Next.js 14 |

---

## 12. Operating System Compatibility

Next.js is cross-platform. The frontend runs on:

| OS | Compatible? |
|---|---|
| Ubuntu 20.04 LTS / 22.04 LTS | Yes — recommended |
| RHEL / CentOS 7, 8, 9 | Yes |
| Debian 11 / 12 | Yes |
| Windows Server 2019/2022 | Yes (with Node.js for Windows) |
| Any Linux with Node >= 18 | Yes |

---

## 13. Recommended NIC Deployment Architecture

```
Internet
    |
    v
[ NIC Nginx / Apache Reverse Proxy ]
  - HTTPS termination (SSL/TLS on port 443)
  - proxy_pass to http://localhost:3000
  - Static asset caching headers for /_next/static/*
    |
    v
[ Next.js Production Server ]
  - Command: npm start
  - Port: 3000 (configurable via PORT env var)
  - Runtime: Node.js 20 LTS
    |
    v
[ SMVD FastAPI Backend ] (separate process / server)
  - Port: 8000
```

**Nginx proxy config snippet:**
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

location /_next/static/ {
    proxy_pass http://localhost:3000/_next/static/;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

---

## 14. Build Time Requirements

| Requirement | Details |
|---|---|
| Node.js | >= 18.17.0 |
| npm | >= 9.0 |
| Disk space (node_modules + build) | ~500 MB |
| Disk space (runtime only, .next/) | ~150 MB |
| RAM during build | 1 GB minimum, 2 GB recommended |
| RAM at runtime | ~200–400 MB (Next.js Node.js process) |
| Internet access at build time | Required once — for downloading Google Fonts to local cache |
| Internet access at runtime | Not required from server (all API calls go from browser) |

---

## 15. Security Notes

- The frontend contains **no secrets or credentials** — all sensitive keys (payment gateway API secret, database credentials) are on the backend FastAPI server only.
- `NEXT_PUBLIC_API_BASE_URL` is intentionally public — it contains no credentials.
- All payment processing is handled via **Razorpay's hosted checkout modal**. No card data touches the frontend or the NIC server at any point.
- Recommended Content Security Policy (CSP) header additions in Nginx:
  ```
  Content-Security-Policy: script-src 'self' checkout.razorpay.com; frame-src checkout.razorpay.com;
  ```

---

## 16. Summary Table for NIC Review

| Question | Answer |
|---|---|
| What runtime is required? | **Node.js 18 LTS or Node.js 20 LTS** |
| How is it built? | `npm install && npm run build` |
| How is it started? | `npm start` |
| What port does it listen on? | **3000** (configurable via `PORT` env var) |
| Does it need a database connection? | **No** — database is entirely on the backend (FastAPI + Supabase) |
| Does it need Python? | **No** |
| Does it need Redis / RabbitMQ / any queue? | **No** |
| Does it need any special Linux packages? | **No** — only Node.js |
| Is a reverse proxy needed? | Recommended (Nginx/Apache) for HTTPS termination |
| Does the server make outbound calls? | **No** — all API calls are made by the end user's browser |
| Total disk space needed | ~500 MB including node_modules, ~150 MB runtime only |
| Is the app statically exportable? | Partially — informational pages yes; booking/donation pages need the Node.js server |

---

*Document prepared by: SMVD Frontend Development Team*  
*For technical queries, please contact the project lead prior to deployment on NIC infrastructure.*
