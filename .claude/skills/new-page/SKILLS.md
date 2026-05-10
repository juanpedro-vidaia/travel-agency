# .claude/skills/new-page/SKILL.md
---
name: new-page
description: Scaffold a new Next.js page with SEO, LangLink nav, and reused Hero CTA
---
1. Create page under app/[lang]/<slug>/page.tsx
2. Add metadata (title, description, OG, canonical) using lib/seo helpers
3. Use <LangLink> for all internal links
4. Reuse <Hero> with quote-request CTA — do not create custom CTAs
5. Run `npm run build` and report output