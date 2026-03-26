# Design System Specification: The Vitreous Forge

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Alchemist"**

This design system rejects the "flatness" of the modern web in favor of tactile, high-precision engineering. It treats the browser viewport as a physical forge where liquid glass and tempered metal collide. We move beyond standard UI by leaning into **Architectural Precision**—utilizing a strict 2:1 ratio for layout composition—and **Vitreous Depth**, where elements are not just "on" a screen, but "within" a pressurized, multi-layered environment.

The aesthetic is technical and high-end. It communicates that we don't just write code; we forge digital infrastructure. By combining the "Vibrant Yellow" (#F5C518) of molten metal with the deep, obsidian-like surfaces of dark mode, we create a high-contrast experience that feels both elite and industrious.

---

## 2. Colors & Surface Philosophy

### The Molten Core (Accents)
The primary energy of this system comes from **Primary Container (#F5C518)**. This is our "Molten" state. It should be used sparingly for high-impact CTAs and critical status indicators. To prevent it from feeling "flat," use a subtle linear gradient from `primary` (#FFE5A0) to `primary_container` (#F5C518) at a 135-degree angle.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited for sectioning.** Structural boundaries are defined through:
1.  **Background Shifts:** Transitioning from `surface` (#131313) to `surface_container_low` (#1C1B1B).
2.  **Luminous Edge Highlights:** Instead of a border, use a 1px inner shadow with 10% opacity `primary` to simulate a light-catching glass edge.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested glass plates. Use the `surface-container` tiers to define "Z-axis" depth:
*   **Base Layer:** `surface` (#131313)
*   **Recessed Content:** `surface_container_lowest` (#0E0E0E) — Use this for code blocks or inset data feeds.
*   **Elevated Components:** `surface_container_high` (#2A2A2A) — Use this for cards and navigation bars.

### The "Glass & Gradient" Rule
Floating elements (Modals, Dropdowns) must use Glassmorphism. Set the background to `surface_bright` (#3A3939) at 80% opacity with a `24px` backdrop-blur. This ensures the "Forge" environment feels cohesive and fluid.

---

## 3. Typography: Technical Precision
We use **Inter** exclusively. Its neutral, high-legibility DNA supports our "Technical" tone.

*   **Display (Lg/Md):** Used for "Statement" headers. Set with `-0.02em` letter spacing to feel "locked in." 
*   **Headline (Lg/Md):** The workforce of the agency site. These should always be high-contrast (`on_surface`).
*   **Title (Sm/Md):** Used for component headers. These carry the "Architectural" feel; consider using `all-caps` for `title-sm` to mimic technical blueprints.
*   **Body (Lg/Md):** Optimized for long-form technical case studies. Line height must be generous (1.6x) to balance the density of the dark UI.
*   **Label (Sm):** Used for metadata. Utilize `on_surface_variant` (#D1C5AC) to create a secondary hierarchy.

---

## 4. Elevation & Depth: Tonal Layering

### The Layering Principle
Depth is achieved by stacking color tokens, not by adding shadows. 
*   **Level 0:** `surface`
*   **Level 1 (The Platform):** `surface_container`
*   **Level 2 (The Tool):** `surface_container_highest`

### Ambient Shadows
When an element must "float" (e.g., a primary modal), do not use black shadows. Use a tinted shadow:
*   **Color:** `surface_container_lowest` at 40% opacity.
*   **Blur:** 48px to 64px.
*   **Spread:** -12px.
This creates a "heavy" skeuomorphic feel, as if the glass is displacing air.

### The "Ghost Border" Fallback
If contrast is required for accessibility on interactive elements, use the `outline_variant` (#4E4633) at 20% opacity. It should feel like a faint etching on a lens, not a drawn line.

---

## 5. Components

### The "Forge" Button
*   **Primary:** A gradient-filled container (`primary` to `primary_container`). Use a `sm` (0.125rem) roundedness to maintain a sharp, technical edge.
*   **States:** On hover, increase the `surface_tint` to create a "glow" effect. On click, use an inner shadow to simulate the button being pressed "into" the glass.

### Interactive Chips
*   **Style:** No background. Use a `Ghost Border` (outline-variant 20%) and `label-md` typography. 
*   **Active State:** Flip to `primary_container` background with `on_primary_container` text.

### Architectural Lists
*   **Rule:** No dividers. Use `1.4rem` (Spacing 4) vertical padding. 
*   **Hover:** Transition the background to `surface_container_low`. The change should be nearly imperceptible but felt.

### Data Inputs
*   **Style:** `surface_container_lowest` background. A bottom-only "underline" using the `outline` token (#9A9078) at 30% opacity. 
*   **Focus:** The underline animates to `primary_container` (#F5C518) with a subtle glow.

---

## 6. Layout: The 2:1 Ratio
To achieve "Architectural Precision," all major layout blocks must follow a 2:1 aspect ratio or division.
*   **Hero Sections:** 2 parts visual/liquid glass texture, 1 part typography.
*   **Grid Systems:** In a 3-column layout, the primary case study should span 2 columns, while the meta-data spans 1.

---

## 7. Do's and Don'ts

### Do
*   **Do** use `backdrop-blur` on all overlays to maintain the "Vitreous" theme.
*   **Do** use `surface_container_highest` for "active" or "pressed" states.
*   **Do** maintain high contrast between `background` and `primary_container` for accessibility.
*   **Do** use the Spacing Scale (especially `8`, `12`, and `16`) to create generous, editorial white space.

### Don't
*   **Don't** use standard 1px solid borders to separate sections.
*   **Don't** use pure black (#000000) for shadows; use `surface_container_lowest`.
*   **Don't** use `xl` or `full` roundedness. This system is "Technical"; keep corners sharp (`sm` or `md`).
*   **Don't** use more than one vibrant yellow element per scroll-depth. It is an accent, not a primary surface color.