# SMATCH Website - Agent Guide

> PayloadCMS 3.68.5 + Next.js 15.4.10 + React 19.2.1 | Industrial Luxury Design

---

## 📁 Architecture

```
src/
├── app/(frontend)/    # Public website (IntroLoader, Header/Footer)
├── app/(payload)/     # PayloadCMS Admin (auto-generated)
├── blocks/            # 17 CMS content blocks
├── collections/       # 8 Payload collections
├── components/        # 21 React component directories
├── heros/             # 5 hero variants
├── fields/            # Reusable fields (link, lexical)
├── plugins/           # 6 Payload plugins
├── globals/           # Header & Footer configs
├── hooks/             # Lifecycle hooks
└── utilities/         # 17 helper functions
```

## 🔧 Key Config Files

| File | Purpose |
|------|---------|
| `payload.config.ts` | CMS core: collections, globals, plugins, DB |
| `next.config.js` | Next.js + Payload via `withPayload()` |
| `tailwind.config.mjs` | Smatch theme (colors, fonts, animations) |
| `tsconfig.json` | Aliases: `@/*` → `./src/*` |

---

## 🎨 Design System

### Colors (use `smatch-*` classes)
- **Backgrounds:** `smatch-black` (#050505), `smatch-charcoal` (#0F0F0F), `smatch-surface` (#1A1A1A)
- **Gold:** `smatch-gold` (#FFC800), `smatch-gold-dim`, `smatch-gold-light`
- **Text:** `smatch-text-primary` (#FFF), `smatch-text-secondary` (#A1A1AA)

### Typography
- `font-heading` → Antonio (headlines)
- `font-sans` → Inter (body)
- `font-mono` → JetBrains Mono (code)

### CSS Rules
- `<strong>` renders as gold
- All headings default to white
- Global: `.button-gold`, `.button-outline`

---

## 📦 Collections

| Collection | Slug | Features |
|------------|------|----------|
| Pages | `pages` | Layout builder (14 blocks), Hero, SEO, versioning |
| Posts | `posts` | Lexical rich text, categories, authors |
| Projects | `projects` | Portfolio with tabs (content/metadata/CTA/detail) |
| Solutions | `solutions` | Modules, problem statement, UI reveal |
| Team | `team` | Member profiles |
| Media | `media` | S3 support |
| Categories | `categories` | Nested taxonomy |
| Users | `users` | Role-based access |

### Access Pattern
```typescript
access: {
  create: authenticated,
  read: authenticatedOrPublished,
  update: authenticated,
  delete: authenticated,
}
```

---

## 🧱 Blocks (14 in Pages)

| Slug | Purpose |
|------|---------|
| `about` | Origin story |
| `ecosystem` | Service ecosystem |
| `domains` | Domain expertise |
| `archive` | Post/project listings |
| `content` | Rich text |
| `cta` | Call-to-action |
| `formBlock` | Dynamic forms |
| `mediaBlock` | Image/video |
| `missionVision` | Mission/vision |
| `historyTimeline` | Timeline |
| `team` | Team grid |
| `smart-grid` | Flexible grid |
| `trustedBy` | Partner logos |
| `activityTimeline` | Activity feed |

### Block Pattern
```
src/blocks/{Name}/
├── config.ts    # Payload Block config
└── Component.tsx # React component
```
Add to `RenderBlocks.tsx` + `Pages/index.ts` blocks array.

---

## 🦸 Hero Types

| Value | Description |
|-------|-------------|
| `none` | No hero |
| `highImpact` | Full-width with media |
| `mediumImpact` | Balanced layout |
| `lowImpact` | Minimal |
| `smatch` | Custom: headline, subheadline, CTAs |

---

## 🔌 Plugins

- `redirectsPlugin` → pages, posts (revalidates)
- `nestedDocsPlugin` → categories (auto URLs)
- `seoPlugin` → auto title/URL
- `formBuilderPlugin` → no payments
- `searchPlugin` → posts
- `s3Storage` → conditional (`S3_ENABLED=true`)

---

## 🛠 Commands

```bash
pnpm dev              # Dev server (Turbo)
pnpm build            # Production + sitemap
pnpm lint:fix         # Fix linting
pnpm generate:types   # Regen TS types
pnpm generate:importmap
pnpm payload migrate
```

---

## 📂 Components

### `src/components/landing/`
Hero, Domains (9KB), Ecosystem (16KB), Journal, TrustedBy, Intro, CTA, WhyChoose

### `src/components/about/`
TeamSection (17KB), MissionVision (13KB), HistoryTimeline, QuiSommesNous, AboutHero

### `src/components/ui/`
shadcn/ui primitives

---

## 🔐 Environment

```env
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=<64-char>
NEXT_PUBLIC_SERVER_URL=https://...
CRON_SECRET=<secret>
PREVIEW_SECRET=<secret>

# Optional S3
S3_ENABLED=true
S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_REGION, S3_ENDPOINT
```

---

## 🚀 Best Practices

1. **Type Safety:** Always `import type { Page, Post } from '@/payload-types'`
2. **Server Components First:** Client only for interactivity
3. **Styling:** Use `smatch-*` classes exclusively
4. **Mobile-first:** `text-4xl md:text-6xl lg:text-8xl`

### Naming
- Collections: `PascalCase` → `Projects`
- Block slugs: `camelCase` → `missionVision`
- Components: `PascalCase` → `MissionVisionBlockComponent`

### Hooks
| Hook | Use |
|------|-----|
| `beforeChange` | Modify before save |
| `afterChange` | Side effects (revalidate) |
| `afterRead` | Transform on read |
| `afterDelete` | Cleanup |

### Icons
- Primary: Phosphor Icons (`@phosphor-icons/react`)
- Secondary: Lucide React
- Admin Gallery: `/admin/icons`

---

## ⚠️ Gotchas

- `RenderBlocks.tsx` uses `@ts-expect-error` for type union complexity
- IntroLoader uses GSAP, handles browser autoplay gracefully
- Versioning: 50 max per doc, autosave 100ms
- Conditional fields: `admin: { condition: (_, { type }) => type === 'smatch' }`

---

## 🔄 Workflows

### New Block
1. Create `src/blocks/NewBlock/config.ts` + `Component.tsx`
2. Add to `Pages/index.ts` blocks array
3. Add to `RenderBlocks.tsx` blockComponents
4. `pnpm generate:types`

### New Collection
1. Create `src/collections/NewCollection.ts`
2. Import in `payload.config.ts`
3. `pnpm generate:types`
4. `pnpm payload migrate`

---

## 📚 Resources

- [PayloadCMS Docs](https://payloadcms.com/docs)
- [Next.js 15](https://nextjs.org/docs/app)
- [Phosphor Icons](https://phosphoricons.com)

*Updated: 2025-12-29*
