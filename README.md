# althingsattention

A responsive community experience for marketers, designed for an India-first and globally welcoming audience. The brand label is centralized as `BRAND` near the top of `app/page.tsx` so it can be renamed quickly.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Create a production build with `npm run build`.

## Deploy to Vercel

Import this GitHub repository in Vercel and keep the detected framework as **Next.js**. Use the default build command (`npm run build`) and leave the output directory unset so Vercel uses `.next` automatically. No environment variables are required for the current read-only demo.

## What works in this demo

- Responsive homepage and navigation across Community, Resources, Tools, Showcase, Opportunities, Events, and Dashboard.
- Discussion search and Newest, Popular, and Unanswered sorting.
- Resource search, filters, bookmarks, and downloadable starter files.
- Searchable tools and opportunities, working official tool links, project and event views, empty states, sign-in gates, and honest demo labels.
- Accessible keyboard navigation, visible focus states, labelled inputs, reduced-motion support, and mobile navigation.
- Database schema prepared for profiles, posts, comments, reactions, bookmarks, resources, listings, and reports, including ownership fields and unique constraints.

## Services to configure for a live community

The hosted Sites environment must provide the logical Cloudflare D1 binding `DB`. Apply the generated migration before enabling write APIs. Sign-in links use Sites’ dispatch-owned “Sign in with ChatGPT” route; this is available on the hosted site, not a standalone local server.

The present build intentionally keeps public content as labelled demo data and member write actions behind the sign-in prompt. Before a public launch, connect server actions to D1 with authenticated ownership checks, add password-reset only if a separate public identity provider is selected, configure admin allowlists and moderation workflows, and connect email/notification delivery. Client-supplied owner IDs must never be trusted.

For spam protection, rate-limit write endpoints at the edge, reject duplicate submissions, cap body size, and add a challenge provider when abuse warrants it. Tools, jobs, and events should be reviewed by admins before publication. Replace the About, Privacy, Terms, and Guidelines placeholders with approved copy before launch.
