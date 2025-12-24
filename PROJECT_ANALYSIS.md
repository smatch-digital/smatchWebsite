# Project Analysis & PayloadCMS Architecture

## Project Overview
This is a modern **Next.js 15 (App Router)** application integrated with **PayloadCMS v3.68.5** as a headless CMS. It uses **PostgreSQL** as the database and **TypeScript** throughout the codebase. The project is designed for a content-rich website with a page builder architecture.

## 📂 Structural Analysis

### 1. Core Configuration
- **`src/payload.config.ts`**: The central nervous system of your CMS.
  - **Database**: Configured with `postgresAdapter` (requires `DATABASE_URI`).
  - **Editor**: Uses the modern `Lexical` editor (`defaultLexical`).
  - **Collections**: `Pages`, `Posts`, `Media`, `Categories`, `Users`.
  - **Globals**: `Header`, `Footer`.
  - **Jobs**: Configured for Vercel Cron (`CRON_SECRET`) to handle scheduled tasks.

### 2. Application Architecture (`src/app`)
- **`(frontend)`**: The public-facing website.
  - `[slug]/page.tsx`: Handles dynamic page rendering.
  - `posts/`: Dedicated blog/post routes.
  - `search/`: Search functionality page.
- **`(payload)`**: The CMS backend.
  - `admin/`: The Payload admin dashboard.
  - `api/`: Automatically generated REST and GraphQL APIs.

### 3. Content Modeling (`src/collections` & `src/blocks`)
- **Collections**: Define the schema for your data (e.g., `Pages` use `revalidatePage` hook for ISR).
- **Blocks**: Modular components (e.g., `CallToAction`, `MediaBlock`, `Form`) that allow content editors to build pages flexibly. Each block typically has a `config.ts` (schema) and `Component.tsx` (frontend render).

### 4. Plugins (`src/plugins/index.ts`)
Your project utilizes a robust suite of official Payload plugins:
- **`redirectsPlugin`**: Manages 301/302 redirects (critical for SEO migrations).
- **`nestedDocsPlugin`**: Handles hierarchical content like `Categories` (e.g., `/parent/child`).
- **`seoPlugin`**: Auto-generates meta titles/descriptions.
- **`formBuilderPlugin`**: Allows creating custom forms (Contact, Newsletter) with a visual builder.
- **`searchPlugin`**: Indexes `posts` for site-wide search.

## 📚 Latest PayloadCMS Knowledge (Context7)
Based on the latest documentation, your project aligns well with best practices:
- **TypeScript Config**: You are correctly using `buildConfig` for full type safety, ensuring your `payload-types.ts` is always in sync with your schema.
- **Globals**: You are using Globals (`Header`, `Footer`) effectively for singleton data that appears on every page, matching the documentation's recommendation for site-wide settings.
- **Query Presets**: While not explicitly heavily customized in your config yet, Payload v3 allows for powerful `queryPresets` to create saved views in the admin panel, which could be a future enhancement for your editorial team.
- **Lexical Editor**: You are using the new default Lexical editor, which is more extensible than the legacy Slate editor. The documentation highlights its ability to support custom "features" like the `FixedToolbarFeature` you have configured in the Form Builder plugin.

## Recommendations
1.  **Environment Variables**: Ensure `DATABASE_URI`, `PAYLOAD_SECRET`, and `CRON_SECRET` are set in your deployment environment.
2.  **Redirects**: The `redirectsPlugin` is configured to warn users that changing the `from` field requires a rebuild; keep this in mind for your deployment workflow.
3.  **Search**: The search plugin is currently only indexing `posts`. You might want to add `pages` to the `collections` array in `src/plugins/index.ts` if you want site pages to be searchable as well.
