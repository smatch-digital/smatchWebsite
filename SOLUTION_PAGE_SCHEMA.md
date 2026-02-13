# Solution Page — Content Schema & Guidelines

> **Audience:** Content writers managing Solution pages via the CMS admin panel.
> **Important:** This site is bilingual (**English** + **French**). Every field marked 🌐 must be filled in **both languages** using the locale switcher at the top of the admin panel.

---

## How a Solution Page is Structured

A solution page is composed of **three sections**, filled through tabs in the admin panel:

```
┌─────────────────────────────────────────┐
│  GLOBAL SETTINGS  (Title, Slug, Order)  │  ← Sidebar + top fields
├─────────────────────────────────────────┤
│  TAB 1: Card Settings                   │  ← Controls the card in the Solutions listing grid
│  TAB 2: Hero Section                    │  ← The banner at the top of the page
│  TAB 3: Content (Layout Blocks)         │  ← The main body, built from reusable blocks
└─────────────────────────────────────────┘
```

---

## 1. Global Settings

These fields define the page identity. They appear at the top and sidebar of the editor.

| Field | Where | Required | 🌐 | What to Write | Example |
|:---|:---|:---:|:---:|:---|:---|
| **Title** | Top | ✅ | ✅ | The official product/solution name. | `Prolog WMS` |
| **Slug** | Sidebar | ✅ | — | URL-safe identifier. Lowercase, hyphens only. Must be **unique**. | `prolog-wms` |
| **Order** | Sidebar | — | — | Number controlling position in navigation. Auto-assigned if left empty. | `1` |

---

## 2. Tab: Card Settings

Controls how the solution appears as a **card** on the Solutions listing/grid page.

| Field | Required | 🌐 | What to Write | Guidelines |
|:---|:---:|:---:|:---|:---|
| **Description** | — | ✅ | A concise "elevator pitch" of the solution. Focus on the main value proposition. | 120–160 characters. One short paragraph. |
| **Icon** | — | — | The **name** of an icon from the Icon Library. Go to `/admin/icons` in the admin panel to browse available icons and copy the exact name. | e.g., `Barcode`, `Truck`, `Warehouse` |

> [!TIP]
> To find the right icon: navigate to **`/admin/icons`** in the admin panel → browse or search → copy the icon name exactly as shown.

---

## 3. Tab: Hero Section

The **banner** at the very top of the solution page.

| Field | Required | 🌐 | What to Write | Guidelines |
|:---|:---:|:---:|:---|:---|
| **Hero Subtitle** | — | ✅ | A punchy tagline that supports the title. | 40–60 characters. e.g., `"The Future of Warehouse Logistics"` |
| **Hero Image** | — | — | Upload a high-quality background image. | Recommended: **1920×1080px**, WebP format. Dark/cinematic style preferred. |

---

## 4. Tab: Content (Layout Blocks)

The main body of the page. You build it by **adding blocks** from the list below. You can add as many blocks as needed, in any order.

> [!IMPORTANT]
> The Content tab is **localized**. You must add and fill blocks for **each language separately** using the locale switcher.

---

### Block A — Quick Presentation

**Purpose:** Primary introduction section. Displays a headline, description, image, and an optional call-to-action button in a side-by-side layout.

| Field | Required | 🌐 | What to Write | Guidelines |
|:---|:---:|:---:|:---|:---|
| **Headline** | ✅ | ✅ | The main impactful statement. | 30–50 chars. e.g., `"Optimize Your Supply Chain"` |
| **Subheadline** | — | ✅ | Small badge text displayed above the headline. | 15–25 chars. e.g., `"Intelligent Logistics"` |
| **Description** | — | ✅ | Detailed overview of the solution. This is a **Rich Text editor** — you can use bold, italic, lists, etc. | 2–3 short paragraphs. Avoid walls of text. |
| **Media** | ✅ | — | Feature image or UI screenshot of the product. | 16:9 aspect ratio recommended. |
| **Layout** | — | — | Choose the image position: `Media Right` (default) or `Media Left`. | Use `Media Left` for visual variation when stacking multiple blocks. |

**CTA Button (optional link group):**

| Field | Required | 🌐 | What to Write | Guidelines |
|:---|:---:|:---:|:---|:---|
| **Type** | — | — | `Internal link` → select an existing Page/Post. `Custom URL` → type a full URL. | Default: Internal link. |
| **Label** | ✅ | ✅ | The button text. | 10–20 chars. e.g., `"Book a Demo"`, `"En savoir plus"` |
| **URL** | ✅* | ✅ | Only if Type = `Custom URL`. Paste the full URL. | e.g., `https://calendly.com/smatch/demo` |
| **Reference** | ✅* | — | Only if Type = `Internal link`. Select a Page or Post from the dropdown. | — |
| **Open in new tab** | — | — | Check this box if the link should open in a new browser tab. | Recommended for external URLs. |

> *\* Required only when the corresponding Type is selected.*

---

### Block B — Functionality & Benefits

**Purpose:** A grid of feature cards, each with an icon, title, and description.

**Section Header:**

| Field | Required | 🌐 | What to Write | Guidelines |
|:---|:---:|:---:|:---|:---|
| **Title** | ✅ | ✅ | Section heading. | 30–50 chars. e.g., `"Why Choose Prolog WMS?"` |
| **Description** | — | ✅ | Brief intro sentence before the feature grid. | 100–150 chars. |

**Benefits List (repeater — add one row per feature):**

> [!TIP]
> Add **3, 6, or 9 items** for a balanced grid layout.

| Field | Required | 🌐 | What to Write | Guidelines |
|:---|:---:|:---:|:---|:---|
| **Icon** | — | — | The **name** of an icon from the Icon Library (`/admin/icons`). | e.g., `ScanBarcode`, `Route`, `ShieldCheck` |
| **Title** | ✅ | ✅ | Short feature name. | 20–30 chars. e.g., `"Real-time Tracking"` |
| **Description** | ✅ | ✅ | Short explanation of the benefit. | 80–120 chars. Clear and value-focused. |

---

### Block C — Use Case

**Purpose:** Showcase real-world scenarios where the solution applies. Displays as alternating image/text cards.

**Section Header:**

| Field | Required | 🌐 | What to Write | Guidelines |
|:---|:---:|:---:|:---|:---|
| **Title** | ✅ | ✅ | Section heading. | 30–50 chars. e.g., `"Built for Your Industry"` |
| **Description** | — | ✅ | Contextual intro sentence. | 100–150 chars. |

**Cases List (repeater — add one row per use case):**

> [!TIP]
> Add **2–4 items** for the best visual balance.

| Field | Required | 🌐 | What to Write | Guidelines |
|:---|:---:|:---:|:---|:---|
| **Title** | ✅ | ✅ | Industry or scenario name. | 25–40 chars. e.g., `"Pharmaceutical Logistics"` |
| **Description** | ✅ | ✅ | How the solution applies to this specific scenario. | 200–300 chars. |
| **Image** | ✅ | — | High-quality photo representing the scenario. | 16:9 aspect ratio. e.g., warehouse worker, pharma lab. |

---

## 5. Content Writing Best Practices

| Topic | Guideline |
|:---|:---|
| **Text Case** | Write in **Sentence case** or **Title Case**. Some headlines are auto-uppercased by design. |
| **Tone** | Professional, confident, benefit-driven. "You" language — speak to the customer. |
| **Imagery** | All images should share similar color grading (dark, high-contrast, blue/gold accents). |
| **Icons** | Always copy the exact name from `/admin/icons`. If unsure, search in the Icon Library first. |
| **Bilingual** | Fill both EN and FR for every 🌐 field. Switch locale at the top of the editor. |
| **Slug** | Never change a slug after the page is published — it will break existing links. |

---

## Quick Reference: Block Order Recommendation

For a standard solution page, use this block sequence:

```
1. Quick Presentation    → Introduce the product
2. Functionality & Benefits → Show key features (grid)
3. Use Case              → Prove real-world value (alternating cards)
```

You can repeat or reorder blocks as needed, but this is the proven default structure.
