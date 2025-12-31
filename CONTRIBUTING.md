# Contributing to Smatch Website

> **Protocol: MONSTER**
> Strict adherence to these guidelines is required to maintain the "Industrial Luxury" standard.

---

## 🏗 Coding Standards

### 1. Type Safety (Non-Negotiable)
- **Strict Mode**: Enabled. No `any` allowed.
- **Payload Types**: Always import from `@/payload-types`.
- **Generics**: Use generics for reusable components.

```typescript
// ✅ GOOD
import type { Page } from '@/payload-types'
const Hero = ({ content }: { content: Page['hero'] }) => { ... }

// ❌ BAD
const Hero = ({ content }: { content: any }) => { ... }
```

### 2. File Organization
- **Colocation**: Keep related files together.
- **Naming**:
    - Components: `PascalCase.tsx`
    - Utilities: `camelCase.ts`
    - Constants: `SCREAMING_SNAKE_CASE.ts`

### 3. Component Architecture
- **Server Components**: Default choice. Use generic `async function` components.
- **Client Components**: Only when interactivity (hooks, event listeners) is needed. Add `'use client'` at the top.
- **Shadcn/UI**: Do not reinvent the wheel. Wrap Shadcn primitives.

### 4. Styling (Tailwind CSS)
- **No Magic Numbers**: Use `smatch-*` colors and spacing tokens.
- **Responsive Types**: Mobile-first approaches. `text-lg md:text-xl`.
- **Class Sorting**: Use `prettier-plugin-tailwindcss` (auto-enforced).

---

## 🔄 Workflow

### Branching Strategy
- `main`: Production-ready code.
- `dev`: Staging/Integration.
- `feature/name`: New features.
- `fix/name`: Bug fixes.

### Commit Messages
Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat: add new Projects block`
- `fix: resolve overflow in Hero mobile`
- `chore: update dependencies`
- `docs: update README.md`

### Pull Requests
1.  **Title**: Clear and descriptive.
2.  **Description**: What changed and **WHY**.
3.  **Screenshots**: Required for UI changes.
4.  **Checklist**:
    - [ ] Build passes (`pnpm build`)
    - [ ] Lint passes (`pnpm lint`)
    - [ ] Types generation (`pnpm generate:types`) verified

---

## 🎨 Design Philosophy

**"Industrial Luxury"**
- **Density**: High information density is good, but must be structured.
- **Motion**: Animations should be smooth (GSAP), not jarring.
- **Contrast**: High contrast for readability, subtle gradients for depth.

---

## 🛠 Troubleshooting

**Common Issues:**
- *Types are missing?* -> Run `pnpm generate:types`.
- *Schema not updating?* -> Restart dev server (Next.js compilation of Payload config).
- *Lint errors?* -> Run `pnpm lint:fix`.

---

**Authority**: Senior Principal Software Architect
