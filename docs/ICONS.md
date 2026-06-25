# AI-Optimized Repository Index: Icon Libraries

## Purpose

This document maps open-source icon repositories and helps an AI choose the best library based on style, use case, framework support, licensing, and visual constraints.

---

## Quick Decision Rules

Use this section first when selecting an icon library.

| Need                                               | Recommended Repository | Reason                                                  |
| -------------------------------------------------- | ---------------------- | ------------------------------------------------------- |
| Minimal, consistent line icons                     | `lucide`               | Strict visual consistency and clean geometric style     |
| Large icon catalog for SaaS or dashboards          | `tabler`               | Very large collection with many domain-specific icons   |
| Multiple icon weights and active/inactive states   | `phosphor`             | Supports thin, regular, bold, fill, duotone, and more   |
| Fine linework with Flutter or React Native support | `iconoir`              | Elegant unshaded line style with cross-platform support |
| Brand and technology logos                         | `simple-icons`         | Dedicated to official brand-style SVG icons             |

---

## Repository Metadata

```json
{
  "schema_version": "1.0",
  "document_type": "icon_repository_index",
  "selection_goal": "Choose an open-source icon library based on visual style, technical needs, framework support, and license.",
  "repositories": [
    {
      "id": "lucide",
      "name": "Lucide Icons",
      "category": "general-icons",
      "style": "minimal-linework",
      "grid": "24x24",
      "stroke_type": "constant",
      "weight_variants": false,
      "brand_logos": false,
      "best_for": [
        "minimalist interfaces",
        "dashboards",
        "applications requiring strict visual consistency"
      ],
      "framework_support": [
        "svg",
        "react",
        "vue",
        "svelte",
        "angular",
        "tailwind"
      ],
      "license": "ISC",
      "commercial_use": true
    },
    {
      "id": "tabler",
      "name": "Tabler Icons",
      "category": "general-icons",
      "style": "clean-linework",
      "grid": "24x24",
      "stroke_type": "constant",
      "default_stroke": "2px",
      "weight_variants": false,
      "brand_logos": true,
      "best_for": [
        "large SaaS applications",
        "enterprise dashboards",
        "complex feature sets",
        "domain-specific icons"
      ],
      "framework_support": [
        "svg",
        "react",
        "vue",
        "svelte",
        "webfont"
      ],
      "license": "MIT",
      "commercial_use": true
    },
    {
      "id": "phosphor",
      "name": "Phosphor Icons",
      "category": "general-icons",
      "style": "flexible-multi-weight",
      "grid": "256x256",
      "stroke_type": "variant-based",
      "weight_variants": true,
      "variants": [
        "thin",
        "light",
        "regular",
        "bold",
        "fill",
        "duotone"
      ],
      "brand_logos": true,
      "best_for": [
        "dynamic UI states",
        "active and inactive icon states",
        "interfaces requiring multiple weights",
        "design systems with visual hierarchy"
      ],
      "framework_support": [
        "svg",
        "react",
        "vue",
        "flutter",
        "webfont"
      ],
      "license": "MIT",
      "commercial_use": true
    },
    {
      "id": "iconoir",
      "name": "Iconoir",
      "category": "general-icons",
      "style": "fine-linework",
      "grid": "24x24",
      "stroke_type": "uniform-fine-line",
      "weight_variants": false,
      "brand_logos": true,
      "best_for": [
        "cross-platform applications",
        "flutter applications",
        "react native applications",
        "web applications with elegant line icons"
      ],
      "framework_support": [
        "svg",
        "react",
        "vue",
        "flutter",
        "figma"
      ],
      "license": "MIT",
      "commercial_use": true
    },
    {
      "id": "simple-icons",
      "name": "Simple Icons",
      "category": "brand-icons",
      "style": "brand-only-flat-vector",
      "grid": "24x24",
      "stroke_type": "not-applicable",
      "weight_variants": false,
      "brand_logos": true,
      "best_for": [
        "sign-in buttons",
        "technology stack sections",
        "social media links",
        "developer portfolios",
        "brand logo lists"
      ],
      "framework_support": [
        "svg",
        "pdf"
      ],
      "metadata_features": [
        "official brand color in hex format"
      ],
      "license": "CC0-1.0",
      "commercial_use": true,
      "notes": [
        "The icon assets are public domain, but brand trademark guidelines may still apply."
      ]
    }
  ]
}
```

---

# Detailed Repository Catalog

## 1. Lucide Icons

### Summary

Lucide Icons is a community-run fork of Feather Icons. It focuses on highly consistent, minimal, geometric-organic line icons.

### Best Used For

* Clean minimalist interfaces
* Dashboards
* Applications requiring strict visual consistency across all icons

### Technical Specifications

| Field           | Value                                      |
| --------------- | ------------------------------------------ |
| Style           | Minimal linework                           |
| Grid            | 24x24 px                                   |
| Stroke          | Constant, customizable                     |
| Weight variants | No                                         |
| Brand logos     | No                                         |
| Formats         | SVG, React, Vue, Svelte, Angular, Tailwind |
| License         | ISC                                        |
| Commercial use  | Yes                                        |

### AI Selection Guidance

Choose `lucide` when the project needs a clean, neutral, highly consistent icon set and does not require brand logos or multiple visual weights.

---

## 2. Tabler Icons

### Summary

Tabler Icons is a large collection of clean, pixel-perfect vector icons designed for web development.

### Best Used For

* High-volume feature sets
* Complex SaaS platforms
* Enterprise dashboards
* Domain-specific icons such as finance, health, system states, and UI actions

### Technical Specifications

| Field           | Value                            |
| --------------- | -------------------------------- |
| Style           | Clean linework                   |
| Grid            | 24x24 px                         |
| Stroke          | Constant                         |
| Default stroke  | 2px                              |
| Weight variants | No                               |
| Brand logos     | Yes                              |
| Formats         | SVG, React, Vue, Svelte, Webfont |
| License         | MIT                              |
| Commercial use  | Yes                              |

### AI Selection Guidance

Choose `tabler` when the project needs many specific icons and broad coverage across product features, dashboards, or enterprise systems.

---

## 3. Phosphor Icons

### Summary

Phosphor Icons is a flexible icon family with a uniform visual system across multiple weights and styles.

### Best Used For

* Dynamic UI designs
* Active and inactive icon states
* Hover, selected, and disabled visual states
* Interfaces that need thin, regular, bold, filled, or duotone icons

### Technical Specifications

| Field           | Value                                     |
| --------------- | ----------------------------------------- |
| Style           | Flexible multi-weight icon family         |
| Grid            | 256x256 px                                |
| Scales down to  | 16x16 px                                  |
| Stroke          | Variant-based                             |
| Weight variants | Yes                                       |
| Variants        | Thin, Light, Regular, Bold, Fill, Duotone |
| Brand logos     | Yes                                       |
| Formats         | SVG, React, Vue, Flutter, Webfont         |
| License         | MIT                                       |
| Commercial use  | Yes                                       |

### AI Selection Guidance

Choose `phosphor` when the UI needs icons that change weight or fill depending on interaction state, hierarchy, or theme.

---

## 4. Iconoir

### Summary

Iconoir is a large open-source icon library focused on fine linework design without shaded or filled visual styles.

### Best Used For

* Cross-platform applications
* Flutter apps
* React Native apps
* Web apps requiring an elegant, lightweight visual signature

### Technical Specifications

| Field           | Value                                     |
| --------------- | ----------------------------------------- |
| Style           | Fine linework                             |
| Grid            | 24x24 px                                  |
| Stroke          | Uniform fine lines                        |
| Weight variants | No                                        |
| Brand logos     | Yes                                       |
| Formats         | SVG, React, Vue, Flutter, Figma Component |
| License         | MIT                                       |
| Commercial use  | Yes                                       |

### AI Selection Guidance

Choose `iconoir` when the project needs elegant fine-line icons with strong cross-platform support, especially for Flutter or React Native.

---

## 5. Simple Icons

### Summary

Simple Icons is a specialized repository dedicated to high-quality SVG icons for famous brands, technologies, platforms, and products.

### Best Used For

* “Sign in with...” buttons
* Technology stack sections
* Social media link trees
* Developer portfolios
* Brand/logo lists

### Technical Specifications

| Field           | Value                              |
| --------------- | ---------------------------------- |
| Style           | Brand-only flat vector             |
| Grid            | 24x24 px                           |
| Stroke          | Not applicable                     |
| Weight variants | No                                 |
| Brand logos     | Yes                                |
| Formats         | SVG, PDF                           |
| Metadata        | Official brand color in hex format |
| License         | CC0-1.0                            |
| Commercial use  | Yes, but trademark rules may apply |

### AI Selection Guidance

Choose `simple-icons` only when the project needs recognizable brand, platform, or technology logos. Do not use it as a general UI icon library.

---

# Selection Examples

## Example 1: Minimal SaaS Dashboard

Recommended repository: `lucide`

Reason: The interface needs clean, consistent, neutral line icons.

---

## Example 2: Enterprise Admin Panel With Many Features

Recommended repository: `tabler`

Reason: The project needs broad icon coverage for many actions, modules, and business domains.

---

## Example 3: App With Active, Hover, and Selected Icon States

Recommended repository: `phosphor`

Reason: The project benefits from multiple icon weights and filled variants.

---

## Example 4: Flutter App With Elegant Line Icons

Recommended repository: `iconoir`

Reason: The project needs Flutter support and fine linework aesthetics.

---

## Example 5: Developer Portfolio With Technology Logos

Recommended repository: `simple-icons`

Reason: The project needs official-looking technology and brand logos.

---

# Final Recommendation Logic

Use the following priority order:

1. Need brand logos only → use `simple-icons`.
2. Need multiple weights or filled states → use `phosphor`.
3. Need the largest general-purpose catalog → use `tabler`.
4. Need minimalist strict consistency → use `lucide`.
5. Need fine-line cross-platform icons, especially Flutter → use `iconoir`.

---

# Notes For AI Agents

* Treat `simple-icons` as a brand-logo library, not a UI icon library.
* Treat `phosphor` as the best option for stateful UI icons.
* Treat `tabler` as the best option when icon quantity and coverage matter.
* Treat `lucide` as the safest minimalist default.
* Treat `iconoir` as a strong option for elegant cross-platform linework.
* Always consider license compatibility and trademark restrictions before final use.
