# Smatch Website 

> **Industrial Luxury** meets **Engineering Authority**.
> Built with Next.js 15, PayloadCMS 3.6, and React 19.

![Tech Stack](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js) ![Tech Stack](https://img.shields.io/badge/PayloadCMS-3.68-white?style=for-the-badge&logo=payload) ![Tech Stack](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react) ![Tech Stack](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)

---

## 📖 Overview

This repository houses the official website for **Smatch**, designed to convey high-end industrial proficiency and data density. The architecture is a "Monster" hybrid of a static-first frontend and a dynamic headless CMS, unified in a single Next.js repo.

**Key Features:**
- **Dynamic Block System**: Over 17 custom CMS blocks for flexible page building.
- **Premium Aesthetics**: Custom "Industrial Luxury" design system with GSAP/Framer Motion animations.
- **Type-Safe**: End-to-end type safety from database to frontend components.
- **Global Editing**: Full control over headers, footers, and SEO metadata via Payload Globals.

---

## 🛠 Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Core** | Next.js | 15.4.10 | App Router, Server Components |
| **CMS** | PayloadCMS | 3.68.5 | Headless content management |
| **DB** | PostgreSQL | Latest | Structured data persistence |
| **UI** | TailwindCSS | 3.4.3 | Utility-first styling |
| **Animation** | GSAP + Framer Motion | Latest | High-performance interactions |
| **Icons** | Phosphor Icons | 2.1.10 | Consistent iconography |
| **Language** | TypeScript | 5.7.3 | Strict type checking |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20.9.0 or higher
- **pnpm**: v9 or v10 (`npm i -g pnpm`)
- **PostgreSQL**: A running Postgres instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repo-url>
    cd smatch-website
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    Duplicate `.env.example` to `.env` and fill in your secrets.
    ```env
    # Database
    DATABASE_URI="postgresql://user:password@localhost:5432/smatch"

    # Payload
    PAYLOAD_SECRET="<generate-a-long-random-string>"
    NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

    # Optional S3 (for media)
    S3_ENABLED=true
    S3_BUCKET=...
    S3_ACCESS_KEY_ID=...
    S3_SECRET_ACCESS_KEY=...
    S3_REGION=...
    ```

4.  **Run Development Server:**
    ```bash
    pnpm dev
    ```
    - Website: [http://localhost:3000](http://localhost:3000)
    - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📂 Project Architecture

The project follows a standard Next.js App Router structure with PayloadCMS integrated.

```
src/
├── app/
│   ├── (frontend)/       # Public facing pages website
│   └── (payload)/        # Payload Admin panel routes
├── blocks/               # Modular CMS blocks (Config + Component)
│   ├── ArchiveBlock/
│   ├── MissionVision/
│   └── ...
├── collections/          # Payload Collection definitions
│   ├── Pages/
│   ├── Projects/
│   └── Media/
├── components/           # Shared React components
│   ├── ui/               # Shadcn/Radix primitives
│   └── landing/          # Landing page specific components
├── globals/              # Global CMS configs (Header, Footer)
├── heros/                # Hero component variants
├── utilities/            # Helper functions (formatters, seeders)
└── payload.config.ts     # Main CMS configuration
```

---

## 🎨 Design System

We adhere to a strict "Smatch" design language defined in `tailwind.config.mjs`.

### Colors
- **Backgrounds**: `smatch-black` (#050505), `smatch-charcoal` (#0F0F0F)
- **Accents**: `smatch-gold` (#FFC800) for primary actions and highlights.
- **Text**: `smatch-text-primary` (White), `smatch-text-secondary` (Zinc-400).

### Typography
- **Headings**: `Antonio` (Variable, uppercase, industrial).
- **Body**: `Inter` (Clean, legible).
- **Code/Data**: `JetBrains Mono` (Technical data visualization).

### Rules
1.  **Use Tokens**: Never hardcode hex values. Use `bg-smatch-black`, `text-smatch-gold`.
2.  **Visual Hierarchy**: Use whitespace as an active element.
3.  **Gold Usage**: Reserved for high-importance interactions and "success" states.

---

## ⚡️ Development Workflow

### Creating a New Block
1.  **Folder**: Create `src/blocks/MyNewBlock/`.
2.  **Config**: Add `config.ts` (Payload Field definition).
3.  **Component**: Add `Component.tsx` (React server component).
4.  **Register**:
    - Add to `src/collections/Pages/index.ts` (schema).
    - Add to `src/components/RenderBlocks.tsx` (rendering).
5.  **Types**: Run `pnpm generate:types`.

### Database Changes
When you modify a Collection or Global config:
1.  Run `pnpm generate:types` to update TypeScript interfaces.
2.  Run `pnpm migrate` (if using strict migrations, otherwise Payload handles schema sync in dev).

### Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with TurboPack |
| `pnpm build` | Build for production |
| `pnpm generate:types` | Regenerate TypeScript types from CMS config |
| `pnpm lint:fix` | Fix ESLint and Prettier issues |
| `pnpm payload` | Run Payload CLI commands |

---

## 🚢 Deployment

Deployed via **Vercel**.

1.  **Build Command**: `next build`
2.  **Output Directory**: `.next`
3.  **Environment**: Ensure all `PAYLOAD_SECRET` and Database variables are set in Vercel.

> **Note**: For Vercel deployment, ensure the Postgres database allows connections from Vercel's IP range or use a connection pooling string (e.g., Supabase Transaction Mode).

---

## 🤝 Contributing

1.  Follow the **"Monster" Rules**: Robust error handling, strict typing, and high-end aesthetics.
2.  **Avoid "Any"**: Utilize generated types (`@/payload-types`).
3.  **Library First**: Use existing Shadcn/Radix components before building custom ones.

---
*© 2025 Smatch Digital. All rights reserved.*
