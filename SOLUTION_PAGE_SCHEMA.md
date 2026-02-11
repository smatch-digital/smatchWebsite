# Solution Page Content Schema & Guidelines

This document outlines the content structure for creating high-impact Solution pages. Follow these guidelines to ensure design consistency and optimal presentation.

---

## 1. Global Settings
These fields define the page identity and meta-information.

| Field Name | Type | Recommended Content | Character Limit |
| :--- | :--- | :--- | :--- |
| **Title** | Text | The official product name (e.g., "Prolog WMS", "Smatch IMS"). | 20-40 chars |
| **Slug** | Text | URL-safe identifier (e.g., `prolog-wms`). Auto-generated usually. | N/A |
| **Order** | Number | Determines the position in the navigation menu. | N/A |

### Tab: Card Settings
Used for the solution card display on the main Solutions listing page.

| Field Name | Type | Recommended Content | Character Limit |
| :--- | :--- | :--- | :--- |
| **Description** | Textarea | A concise "elevator pitch" summary of the solution. Focus on the main value proposition. | 120-160 chars |
| **Icon** | Text | The name of the icon to display (e.g., `Barcode`, `Truck`, `Warehouse`). Must match an icon in the Icon Library. | N/A |

### Tab: Hero Section
The top-most section of the page.

| Field Name | Type | Recommended Content | Character Limit |
| :--- | :--- | :--- | :--- |
| **Hero Subtitle** | Text | A punchy tagline supporting the main title. (e.g., "The Future of Warehouse Logistics"). | 40-60 chars |
| **Hero Image** | Upload | High-quality, cinematic background image. Abstract tech or realistic warehouse environment. | 1920x1080px (WebP) |

---

## 2. Content Blocks (Layout)
The main body of the page is built using these flexible blocks.

### Block A: Quick Presentation
The primary introduction to the product.

| Field Name | Type | Recommended Content | Character Limit |
| :--- | :--- | :--- | :--- |
| **Headline** | Text | Impactful statement. (e.g., "OPTIMIZE YOUR SUPPLY CHAIN"). | 30-50 chars |
| **Subheadline** | Text | Small badge text above headline. (e.g., "INTELLIGENT LOGISTICS"). | 15-25 chars |
| **Description** | Rich Text | Detailed overview of the solution. Use standard sentence case. Avoid massive walls of text; break into 2-3 paragraphs. | 300-500 chars |
| **Media** | Upload | Feature image or UI screenshot showing the dashboard/interface. | 16:9 Aspect Ratio |
| **Layout** | Select | `Media Right` is standard; use `Media Left` for variation. | N/A |
| **CTA Button** | Link | Call to action (e.g., "Book a Demo"). | 10-20 chars |

### Block B: Functionality & Benefits
Grid layout showcasing key features.

**Section Header**
| Field Name | Type | Recommended Content | Character Limit |
| :--- | :--- | :--- | :--- |
| **Title** | Text | Section title (e.g., "WHY CHOOSE PROLOG WMS?"). | 30-50 chars |
| **Description** | Textarea | Brief intro to the features. | 100-150 chars |

**Benefits List (Repeater)**
*Recommended Count: 3, 6, or 9 items for balanced grid.*

| Field Name | Type | Recommended Content | Character Limit |
| :--- | :--- | :--- | :--- |
| **Icon** | Upload | SVG or PNG icon representing the feature. Transparent background. | 64x64px |
| **Title** | Text | Feature name (e.g., "Real-time Tracking"). | 20-30 chars |
| **Description** | Textarea | Short explanation of the benefit. | 80-120 chars |

### Block C: Use Case
Alternating "Zig-Zag" layout for real-world scenarios.

**Section Header**
| Field Name | Type | Recommended Content | Character Limit |
| :--- | :--- | :--- | :--- |
| **Title** | Text | Section title (e.g., "BUILT FOR YOUR INDUSTRY"). | 30-50 chars |
| **Description** | Textarea | Context for the use cases. | 100-150 chars |

**Cases List (Repeater)**
*Recommended Count: 2-4 items.*

| Field Name | Type | Recommended Content | Character Limit |
| :--- | :--- | :--- | :--- |
| **Title** | Text | Industry or Scenario Name (e.g., "Pharmaceutical Logistics"). | 25-40 chars |
| **Description** | Textarea | How the solution applies to this specific scenario. | 200-300 chars |
| **Image** | Upload | High-quality photo representing the scenario (e.g., warehouse worker, pharma lab). | 16:9 Aspect Ratio |

---

## 3. General Design Tips
*   **Text Case:** Headlines are often auto-uppercased by design, but input them in **Title Case** or **Sentence case** for flexibility.
*   **Imagery:** Ensure all images share a similar color grading or style (e.g., dark, high-contrast, blue/orange accents) to match the brand.
*   **Icons:** Use consistent stroke weights and styles for icons in the Benefits block.
