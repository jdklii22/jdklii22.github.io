# Claude-Inspired UI Design System

> **Unofficial interpretation:** This guide is an independent, reusable interpretation of the visual and interaction qualities commonly associated with Claude and Anthropic interfaces. It is not Anthropic's official design system, is not endorsed by Anthropic, and does not reproduce proprietary internal specifications. Use it to create original interfaces with a similarly warm, calm, editorial character—not to impersonate or clone Anthropic products.

## 1. Design North Star

Claude-inspired interfaces feel like thoughtful workspaces rather than conventional dashboards. They combine the restraint of a writing tool, the clarity of an editorial layout, and the utility of modern software.

The experience should be:

- **Warm:** Prefer paper-like neutrals and earthy accents over clinical white and electric blue.
- **Calm:** Reduce visual noise, decoration, competing calls to action, and unnecessary motion.
- **Editorial:** Treat typography, line length, hierarchy, and prose as primary interface materials.
- **Intelligent but approachable:** Present powerful capabilities without making the interface feel technical or intimidating.
- **Content-first:** UI chrome supports the user's work and recedes when it is not needed.
- **Deliberate:** Every border, icon, label, and animation should have a clear purpose.
- **Trustworthy:** Make system status, consequences, limitations, and user control easy to understand.

### A useful shorthand

> Warm editorial minimalism: paper-like neutrals, highly readable type, generous whitespace, subtle structure, muted terracotta accents, and almost no ornamental decoration.

## 2. Visual Principles

### Quiet hierarchy

Create hierarchy through typography, spacing, alignment, and restrained color before adding containers, shadows, or dividers. The primary content should be visually obvious without making every element loud.

### Warm neutrality

Use a warm off-white canvas, charcoal text, quiet taupes, and a small family of earthy accents. Pure white may be used for elevated surfaces, but it should not dominate every screen.

### Few surfaces, clear relationships

Avoid placing every section in a card. Use open layouts and shared alignment for related content. Introduce a panel only when it clarifies containment, interactivity, or a distinct mode.

### Functional softness

Corners may be gently rounded and transitions smooth, but the design should not become bubbly, toy-like, or excessively pill-shaped.

### Restraint over spectacle

Avoid decorative gradients, glass effects, oversized shadows, saturated status colors, and motion without meaning. Sophistication comes from proportion and detail.

## 3. Layout and Whitespace

### Page structure

- Use a quiet application shell with an optional left sidebar and a flexible content region.
- Keep long-form reading and chat content between `640px` and `760px` wide.
- Use up to `960px` for forms, settings, or mixed text-and-controls views.
- Use up to `1200px` for data-heavy tools, while keeping individual prose columns narrow.
- Center focused tasks; left-align workspaces and data tools.
- Preserve breathing room around the primary task. Do not fill space merely because it exists.

### Recommended page measurements

| Context | Suggested value |
|---|---:|
| Reading/chat column | `42rem–48rem` |
| Standard content container | `60rem` |
| Wide workspace | `75rem` |
| Desktop page gutter | `32–48px` |
| Tablet gutter | `24–32px` |
| Mobile gutter | `16–20px` |
| Sidebar width | `248–280px` |
| Compact sidebar | `56–72px` |

### Whitespace rules

- Give major sections `48–80px` of vertical separation.
- Give related groups `20–32px` of separation.
- Keep labels close to their controls, usually `6–8px`.
- Let whitespace establish grouping before using lines or cards.
- Align content to a small number of consistent vertical axes.
- Keep readable prose near `55–75` characters per line.

## 4. Color System

These values are approximate starting points. Adjust them for the product, medium, and accessibility requirements.

### Core palette

| Token | Value | Use |
|---|---|---|
| `canvas` | `#F7F6F2` | Main paper-like background |
| `surface` | `#FFFFFF` | Elevated or focused surfaces |
| `surface-subtle` | `#F0EFEA` | Secondary regions and hover fills |
| `surface-strong` | `#E8E6DF` | Selected or emphasized neutral fill |
| `text` | `#2B2A27` | Primary text |
| `text-muted` | `#6F6D66` | Secondary text |
| `text-faint` | `#929087` | Metadata and placeholders |
| `border` | `#DEDCD4` | Standard border |
| `border-subtle` | `#E9E7E1` | Quiet separators |
| `accent` | `#C15F3C` | Primary earthy accent |
| `accent-hover` | `#A94F31` | Accent hover state |
| `accent-soft` | `#F2DED5` | Accent tint and selection |

### Semantic palette

| Token | Value | Use |
|---|---|---|
| `success` | `#39755B` | Success text/icons |
| `success-soft` | `#E3F0E9` | Success background |
| `warning` | `#9A681B` | Warning text/icons |
| `warning-soft` | `#F7ECD5` | Warning background |
| `danger` | `#A94442` | Error/destructive text |
| `danger-soft` | `#F5DEDD` | Error background |
| `info` | `#4D6F85` | Informational text/icons |
| `info-soft` | `#E2EBF0` | Informational background |

### Color usage

- Use the accent sparingly for primary actions, active indicators, links, and focus moments.
- Keep large areas neutral. Accent color should guide attention, not tint the whole product.
- Use semantic color with text, icons, or shape—not color alone.
- Avoid pure black for large text areas and pure white for the overall canvas.
- Maintain at least WCAG AA contrast: `4.5:1` for normal text and `3:1` for large text and meaningful UI boundaries.
- Test light-tinted semantic backgrounds with their foreground colors rather than assuming they pass.

## 5. Typography

### Type personality

Use a highly legible sans serif for interface text. An editorial serif may be introduced selectively for branding, expressive page titles, or quotations. It should never reduce clarity or appear on dense controls.

Suggested stacks:

```css
--font-sans: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif;
--font-serif: Charter, "Iowan Old Style", "Palatino Linotype",
  Georgia, serif;
--font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
```

### Type hierarchy

| Style | Size / line height | Weight | Guidance |
|---|---|---:|---|
| Display | `40/48px` | `500` | Rare marketing or empty-canvas moments |
| Page title | `30/38px` | `500–600` | One per page |
| Section title | `22/30px` | `600` | Major content sections |
| Subheading | `17/24px` | `600` | Groups and panels |
| Body | `15–16/24px` | `400` | Default prose and controls |
| Small | `13/19px` | `400–500` | Supporting content |
| Label | `13/18px` | `500–600` | Form and navigation labels |
| Caption | `12/17px` | `400–500` | Metadata; use sparingly |
| Code | `13–14/21px` | `400` | Code and machine-readable content |

### Typography rules

- Prefer sentence case over title case.
- Use medium weight for emphasis before using bold.
- Avoid excessive font sizes or more than three visible heading levels on one screen.
- Use tabular numerals for aligned numerical data.
- Preserve comfortable line height in prose and chat responses.
- Underline links in long-form content; in compact navigation, color and context may suffice if the state remains clear.

## 6. Spacing System

Use a `4px` base grid with a restrained set of named steps.

| Token | Value | Typical use |
|---|---:|---|
| `space-0` | `0` | Reset |
| `space-1` | `4px` | Icon micro-gap |
| `space-2` | `8px` | Label/control or compact row gap |
| `space-3` | `12px` | Button contents, compact padding |
| `space-4` | `16px` | Standard component padding |
| `space-5` | `20px` | Related groups |
| `space-6` | `24px` | Panel padding |
| `space-8` | `32px` | Section grouping |
| `space-10` | `40px` | Large composition gap |
| `space-12` | `48px` | Major section separation |
| `space-16` | `64px` | Page-level rhythm |
| `space-20` | `80px` | Spacious hero or transition |

Do not use every step in every component. Establish repeatable patterns such as `8px` control gaps, `16px` row padding, `24px` panel padding, and `48px` section spacing.

## 7. Borders, Radii, and Shadows

### Borders

- Default to `1px solid var(--color-border-subtle)`.
- Use stronger borders for form controls and important containment.
- Avoid double structure: a shadow, border, contrasting fill, and divider usually should not all appear together.
- Use inset or bottom borders for navigation selection only when they improve location awareness.

### Radii

| Token | Value | Use |
|---|---:|---|
| `radius-sm` | `6px` | Tags, compact controls |
| `radius-md` | `10px` | Inputs, buttons, small cards |
| `radius-lg` | `14px` | Panels, composer, modals |
| `radius-xl` | `20px` | Rare feature surfaces |
| `radius-pill` | `999px` | Tags, avatars, true pills only |

### Shadows

Keep shadows diffuse and quiet. Prefer borders for normal structure.

```css
--shadow-sm: 0 1px 2px rgb(43 42 39 / 0.05);
--shadow-md: 0 8px 24px rgb(43 42 39 / 0.10);
--shadow-lg: 0 20px 50px rgb(43 42 39 / 0.14);
```

- Use `shadow-sm` only when a border is insufficient.
- Reserve `shadow-md` for floating menus and sticky composers.
- Reserve `shadow-lg` for modals and major overlays.

## 8. Buttons

### Variants

**Primary**

- Earthy accent or dark charcoal fill with high-contrast text.
- One primary action per local decision area.
- Use for committed actions such as Create, Save, Continue, or Send.

**Secondary**

- Neutral surface, subtle border, dark text.
- Use for viable alternatives that should not compete with the primary action.

**Ghost**

- Transparent with a subtle neutral hover fill.
- Use for toolbar, navigation, or low-emphasis actions.

**Destructive**

- Prefer neutral styling with danger text until confirmation is necessary.
- Use a danger fill only for the final, explicit destructive commitment.

### Button anatomy

- Height: `36px` compact, `40px` default, `44–48px` prominent or mobile.
- Horizontal padding: `12–18px` depending on size.
- Radius: `8–10px`; avoid pills unless the component is semantically pill-like.
- Label: sentence case, concise verb or verb phrase.
- Icon gap: `6–8px`; use icons only when they clarify meaning.
- Disabled buttons must remain legible and should not be the only explanation of what is missing.
- Loading buttons should retain width, show progress, and prevent duplicate submission.
- Every interactive state needs visible hover, active, focus, and disabled treatment.

## 9. Inputs and Forms

### Input styling

- Use a warm white or transparent surface with a defined neutral border.
- Default height: `40–44px`; mobile target height: at least `44px`.
- Use `10px` radius and `12–14px` horizontal padding.
- Place persistent labels above fields. Do not rely on placeholder text as a label.
- Use placeholder color only for examples or format hints.
- On focus, use a `2px` visible ring with sufficient contrast and minimal layout shift.
- Show validation near the relevant field and summarize multiple errors at the top when helpful.

### Form composition

- Keep one conceptual question per field.
- Group related fields with spacing and concise headings.
- Put help text below the label or control, depending on when it is needed.
- State optionality; do not mark every required field with an asterisk.
- Preserve user input after validation errors.
- Use inline validation after interaction, not while the user is still composing an incomplete value.
- Align action buttons with the form's reading flow.

### Specialized controls

- Checkboxes are for independent choices; radios are for one choice in a visible set.
- Switches should change a setting immediately. Use a checkbox when submission is required.
- Select menus work for compact known lists; use searchable comboboxes for large lists.
- Textareas should grow within sensible limits and expose a resize affordance when useful.

## 10. Cards and Panels

- Use cards for distinct objects, actions, or movable units—not as the default wrapper for every section.
- Standard card: subtle border, neutral/white surface, `12–14px` radius, `16–24px` padding.
- Prefer no shadow in the normal page flow.
- Use a clear internal order: title, supporting information, primary content, actions.
- Keep card actions few and predictable. Put secondary actions in a quiet overflow menu when necessary.
- Use hover elevation only if the entire card is interactive.
- Never make a card look clickable when only a small action inside it is clickable.

Panels may use `surface-subtle` to distinguish tools, previews, settings, or supporting context. Avoid deep nesting; two visible surface levels are usually enough.

## 11. Navigation and Sidebar

### Sidebar

- Keep it visually secondary with a surface close to the page canvas.
- Use `248–280px` on desktop and a drawer or alternate view on mobile.
- Group navigation by user goal, not internal product architecture.
- Use compact rows around `36–40px` tall.
- Indicate the active item with a subtle fill, stronger text, and optionally a small accent—not a loud block.
- Keep icons thin, consistent, and secondary to labels.
- Allow recent or user-created items to truncate gracefully and reveal full names on hover/focus.
- Put account, settings, and help utilities in predictable secondary positions.

### Top navigation

- Use only when it clarifies product scope, page identity, or global actions.
- Avoid combining a dense top bar with a dense sidebar.
- Sticky headers should be compact and gain only a subtle border or background when content scrolls beneath them.

### Breadcrumbs and tabs

- Breadcrumbs are for genuine hierarchy, not decoration.
- Tabs switch peer views without leaving the task context.
- Use text tabs with a restrained underline or soft active fill.
- On mobile, allow tab scrolling or replace tabs with a select when labels cannot fit.

## 12. Icons

- Use a single outline icon family with consistent stroke width, optical size, and corner character.
- Default sizes: `16px` in compact controls, `18–20px` in standard controls, `24px` for standalone emphasis.
- Pair unfamiliar icons with labels.
- Provide accessible names for icon-only buttons.
- Do not use icons as decorative bullets throughout the interface.
- Use filled icons mainly for selected states or strong semantic status.
- Prefer familiar metaphors and avoid anthropomorphizing the system unnecessarily.

## 13. Tables and Data Displays

- Use tables for comparable structured data, not for general layout.
- Keep headers concise, left-align text, and right-align comparable numeric values.
- Use tabular numerals and consistent precision.
- Prefer subtle row separators over boxed cells.
- Row height should generally be `44–52px`.
- Use zebra striping only for wide, dense tables where tracking across rows is difficult.
- Keep primary identifiers visible when horizontal scrolling is necessary.
- Make sorting state explicit in text or accessible labels, not merely icon orientation.
- Put row actions at the end and reveal secondary actions on hover only if they remain keyboard accessible.
- On mobile, choose deliberately among horizontal scrolling, prioritized columns, or stacked records. Do not collapse complex data blindly.

## 14. Modals, Dialogs, and Overlays

- Use a modal only when the user must resolve a focused decision before returning to the underlying task.
- Prefer inline expansion, a side panel, or a dedicated page for complex work.
- Suggested widths: `400–520px` for confirmation, `600–720px` for focused forms.
- Use `24–32px` padding and a restrained `14–18px` radius.
- Include a clear title, brief context, content, and logically ordered actions.
- Put focus inside on open, trap focus while active, support Escape when safe, and return focus to the trigger on close.
- Do not close consequential forms on backdrop click without warning.
- Dim the background without making it pitch black: `rgb(43 42 39 / 0.35)` is a useful starting point.
- Place destructive confirmation language next to the destructive action, with consequences stated plainly.

## 15. Empty, Loading, Error, and Success States

### Empty states

- Explain what the area is for and offer the most likely next step.
- Keep illustrations optional, small, and stylistically restrained.
- Distinguish first-use emptiness from no search results, filtering, and permission limitations.
- Do not celebrate an empty workspace more loudly than populated content.

### Loading states

- Preserve layout to prevent shifting.
- Use skeletons for content with a predictable structure and a spinner for short indeterminate actions.
- For AI generation, show that work is ongoing, allow cancellation when feasible, and avoid fake precision.
- Prefer calm neutral animation over bright shimmer effects.
- After a meaningful delay, explain what is happening and provide recovery options.

### Error states

- State what happened in plain language, what the user can do next, and whether their work was preserved.
- Put recoverable local errors near the affected content.
- Use persistent banners or full-page states only when the scope warrants them.
- Avoid blame, error codes without explanation, and vague messages such as “Something went wrong” on their own.

### Success states

- Confirm quietly near the completed action.
- Use a toast for brief nonessential confirmation and inline status for information the user may need later.
- Avoid confetti or celebratory motion for routine operations.

## 16. Chat and Conversational UI

### Conversation layout

- Keep the transcript in a centered readable column, generally `680–760px` wide.
- Distinguish participants through spacing, alignment, labels, or subtle surface changes—not loud bubble colors.
- Let assistant responses read like documents: clear paragraphs, lists, headings, tables, and code blocks.
- Use generous vertical spacing between turns and tighter spacing within a response.
- Keep timestamps and metadata quiet and reveal them when relevant.

### Composer

- Treat the composer as the primary control: spacious, persistent when useful, and visually grounded.
- Use a minimum height around `52–60px`, growing with content to a practical limit.
- Group attachments and tools without crowding the typing area.
- Keep the send control clear and reachable. Show Stop while generation is active.
- Preserve drafts when navigation, errors, or temporary disconnection occur.
- Show attachment status and allow removal before sending.
- Support keyboard submission conventions without preventing multiline entry.

### AI behavior in the interface

- Clearly distinguish generated content, user content, tool output, sources, and system status.
- Reveal citations or source details near the claim they support.
- Let users edit, copy, retry, stop, and provide feedback where appropriate.
- Make uncertainty and limitations legible without overwhelming the response.
- Do not simulate human presence, typing, or certainty deceptively.
- For long operations, communicate progress honestly and retain user control.

### Code, artifacts, and rich outputs

- Present code in a distinct but harmonious neutral surface with a language label and copy action.
- Use split panes only when simultaneous reading and editing provide clear value.
- Allow artifacts to expand without forcing the conversation column to become excessively wide.
- Keep tool output visually subordinate to the user's objective.

## 17. Responsive and Mobile Behavior

- Start with content priority, not a scaled-down desktop arrangement.
- Collapse the sidebar into a drawer or navigation screen below roughly `768px`.
- Use `16–20px` page gutters and at least `44×44px` touch targets.
- Keep primary actions within easy reach without covering essential content.
- Allow the chat composer to respect the safe area and on-screen keyboard.
- Avoid hover-dependent behavior; every hover action needs a touch and keyboard path.
- Stack form fields and action groups unless side-by-side placement remains clearly readable.
- Convert wide toolbars into prioritized actions plus an overflow menu.
- Preserve reading width on tablets rather than stretching text edge to edge.
- Test at content-driven breakpoints, zoomed text, landscape mobile, and narrow split-screen widths.
- Reflow rather than hide important information. If content is omitted on mobile, provide another way to access it.

## 18. Accessibility

Accessibility is part of the visual system, not a final audit.

- Meet WCAG 2.2 AA as a baseline.
- Maintain `4.5:1` contrast for normal text and `3:1` for large text and meaningful non-text UI.
- Provide visible keyboard focus using a high-contrast ring that is not clipped.
- Use semantic HTML before adding ARIA.
- Give every field a programmatic label and every error an associated description.
- Ensure the interface works by keyboard alone with logical focus order.
- Use landmarks, headings, lists, and tables according to their meaning.
- Announce dynamic status, errors, and AI completion appropriately without creating excessive screen-reader chatter.
- Never rely on color, placement, or iconography alone to convey meaning.
- Respect zoom up to at least `200%` and text spacing overrides without loss of content or function.
- Respect `prefers-reduced-motion`, forced colors, and increased contrast preferences.
- Include text alternatives for meaningful images and mark decorative images accordingly.
- Make target sizes at least `24×24px` under WCAG minimum guidance; prefer `44×44px` for touch comfort.
- Provide captions/transcripts for time-based media when relevant.

## 19. Motion and Animation

Motion should clarify cause, effect, location, or system status.

### Timing

| Motion | Duration | Easing |
|---|---:|---|
| Hover/color response | `100–160ms` | ease-out |
| Small reveal/menu | `160–220ms` | ease-out |
| Panel transition | `220–300ms` | gentle standard easing |
| Modal entrance | `180–240ms` | decelerate |

Suggested curves:

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
```

### Motion rules

- Animate opacity and transforms when possible; avoid expensive layout animation.
- Keep travel distances small, generally `4–12px`.
- Do not delay user input for animation.
- Avoid springy, bouncy, or theatrical movement in core productivity flows.
- Pause nonessential animation when offscreen or in the background.
- Under reduced motion, remove spatial transitions and preserve only immediate state changes or gentle fades.

## 20. Content and Voice

The interface voice should be lucid, calm, direct, and respectful.

- Use plain language and short sentences.
- Lead with what the user needs to know or do.
- Use sentence case for headings, buttons, and labels.
- Prefer specific verbs: “Upload file,” “Save changes,” “Try again.”
- Explain consequences before consequential actions.
- Avoid hype, cuteness, jargon, and excessive exclamation marks.
- Do not claim certainty, success, security, or intelligence beyond what the system can support.
- Frame errors around recovery, not fault.
- Use contractions when they make the language natural, but keep serious warnings precise.
- Keep labels stable across screens. Do not rename the same action for variety.

Examples:

| Avoid | Prefer |
|---|---|
| “Oops! Something went wrong!” | “We couldn't save your changes. Your draft is still here.” |
| “Submit” | “Create project” |
| “Are you sure?” | “Delete this project? This can't be undone.” |
| “AI magic” | “Generate a draft” |
| “Invalid input” | “Enter a valid email address.” |

## 21. Do and Don't

### Do

- Use warm neutrals and one restrained accent family.
- Let typography and spacing carry the hierarchy.
- Keep prose narrow and readable.
- Make the primary task obvious and secondary chrome quiet.
- Use cards only when containment has meaning.
- Make all interaction states visible and accessible.
- Design empty, loading, error, and partial states as first-class experiences.
- Preserve user work and explain system behavior honestly.
- Test with real long content, localization, keyboard use, zoom, and mobile screens.

### Don't

- Don't clone Anthropic branding, logos, copy, proprietary assets, or exact product screens.
- Don't fill the interface with white cards on a gray background.
- Don't use bright blue as the automatic default for every interactive element.
- Don't add gradients, glassmorphism, heavy shadows, or decorative blur without a product reason.
- Don't make every corner a pill.
- Don't hide essential actions behind hover-only controls.
- Don't use tiny gray text as a substitute for hierarchy.
- Don't use color alone for status or selection.
- Don't over-animate AI generation or imply progress that cannot be measured.
- Don't let sidebars, toolbars, badges, and helper text compete with the user's content.

## 22. CSS Variables and Tokens

```css
:root {
  color-scheme: light;

  /* Color */
  --color-canvas: #f7f6f2;
  --color-surface: #ffffff;
  --color-surface-subtle: #f0efea;
  --color-surface-strong: #e8e6df;
  --color-text: #2b2a27;
  --color-text-muted: #6f6d66;
  --color-text-faint: #929087;
  --color-border: #dedcd4;
  --color-border-subtle: #e9e7e1;
  --color-accent: #c15f3c;
  --color-accent-hover: #a94f31;
  --color-accent-soft: #f2ded5;
  --color-success: #39755b;
  --color-success-soft: #e3f0e9;
  --color-warning: #9a681b;
  --color-warning-soft: #f7ecd5;
  --color-danger: #a94442;
  --color-danger-soft: #f5dedd;
  --color-info: #4d6f85;
  --color-info-soft: #e2ebf0;

  /* Typography */
  --font-sans: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  --font-serif: Charter, "Iowan Old Style", "Palatino Linotype",
    Georgia, serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  --text-xs: 0.75rem;
  --text-sm: 0.8125rem;
  --text-md: 0.9375rem;
  --text-lg: 1.0625rem;
  --text-xl: 1.375rem;
  --text-2xl: 1.875rem;
  --text-display: 2.5rem;
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;

  /* Spacing */
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;

  /* Shape */
  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 0.875rem;
  --radius-xl: 1.25rem;
  --radius-pill: 999px;
  --border-width: 1px;

  /* Elevation */
  --shadow-sm: 0 1px 2px rgb(43 42 39 / 0.05);
  --shadow-md: 0 8px 24px rgb(43 42 39 / 0.1);
  --shadow-lg: 0 20px 50px rgb(43 42 39 / 0.14);

  /* Motion */
  --duration-fast: 120ms;
  --duration-normal: 200ms;
  --duration-slow: 280ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* Layout */
  --content-reading: 46rem;
  --content-standard: 60rem;
  --content-wide: 75rem;
  --sidebar-width: 16.5rem;

  /* Focus */
  --focus-ring: 0 0 0 3px rgb(193 95 60 / 0.3);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Optional dark-mode direction

A dark theme should preserve warmth rather than simply invert the interface. Start with deep brown-charcoal surfaces, soft off-white text, restrained borders, and a slightly lighter terracotta accent. Recheck every contrast relationship independently.

```css
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --color-canvas: #1f1e1b;
    --color-surface: #292824;
    --color-surface-subtle: #24231f;
    --color-surface-strong: #34322d;
    --color-text: #eeeae2;
    --color-text-muted: #b8b3aa;
    --color-text-faint: #8f8a82;
    --color-border: #4a4741;
    --color-border-subtle: #393731;
    --color-accent: #dc7b58;
    --color-accent-hover: #e58c6c;
    --color-accent-soft: #4a2d24;
  }
}
```

## 23. Implementation Guidance

### Build in this order

1. Define semantic tokens for color, type, spacing, shape, motion, and elevation.
2. Establish the page shell, content widths, responsive gutters, and typography rhythm.
3. Build accessible primitives: buttons, links, inputs, labels, menus, dialogs, toasts, and tooltips.
4. Compose product patterns: navigation, forms, cards, tables, empty states, and chat turns.
5. Test all states with real content, including overflow, errors, slow operations, and permissions.
6. Validate keyboard navigation, screen readers, zoom, reduced motion, high contrast, and mobile behavior.

### Architecture

- Name tokens semantically (`color-text-muted`) rather than by raw appearance (`gray-500`) at the component boundary.
- Keep primitives low-level and behaviorally complete.
- Prefer component variants and tokens over one-off CSS overrides.
- Avoid coupling visual treatment to DOM order or incidental page context.
- Centralize interactive states so hover, focus, disabled, loading, invalid, and selected behavior remains consistent.
- Use native HTML controls where possible and test custom controls with assistive technology.

### Quality checklist

- Is there one clear primary action in each decision area?
- Can borders or cards be removed without losing comprehension?
- Is every line of prose comfortably readable?
- Does the interface still work with labels twice as long?
- Are hover-only actions also available by keyboard and touch?
- Are focus states visible against every background?
- Are loading and error states honest, recoverable, and layout-stable?
- Does mobile preserve the task rather than merely shrink the desktop layout?
- Does the result feel original rather than like an Anthropic replica?

## 24. Copy-Paste Instructions for Coding and Design AIs

Use the following prompt as a project-level instruction, design brief, or starting point for an AI coding assistant.

```text
Create an original interface using an unofficial Claude/Anthropic-inspired design direction. Do not copy Anthropic branding, logos, proprietary assets, exact layouts, or product copy. Interpret the style as warm editorial minimalism.

DESIGN CHARACTER
- Make the interface calm, thoughtful, content-first, and quietly sophisticated.
- Use a warm paper-like canvas, near-black charcoal text, subtle taupe borders, and one muted terracotta accent.
- Favor typography, spacing, and alignment over cards, shadows, gradients, or decoration.
- Keep product chrome visually secondary to the user's content and current task.
- Use gently rounded corners, thin borders, and almost no shadow.

LAYOUT
- Use generous whitespace and a clear small set of alignment axes.
- Keep prose and chat content approximately 680–760px wide.
- Use 32–48px desktop page gutters, 24–32px tablet gutters, and 16–20px mobile gutters.
- Use cards only for meaningful containment. Prefer open sections separated by spacing.
- On mobile, collapse the sidebar, stack fields, preserve 44px touch targets, and prioritize the main task.

TOKENS
- Canvas: #F7F6F2
- Surface: #FFFFFF
- Subtle surface: #F0EFEA
- Primary text: #2B2A27
- Muted text: #6F6D66
- Border: #DEDCD4
- Subtle border: #E9E7E1
- Accent: #C15F3C
- Accent hover: #A94F31
- Accent tint: #F2DED5
- Use a 4px spacing grid with common steps of 8, 12, 16, 24, 32, 48, and 64px.
- Use radii around 6px, 10px, and 14px; reserve pills for true pill controls.

TYPOGRAPHY
- Use a highly readable modern sans serif for the UI.
- An editorial serif may be used sparingly for expressive titles, never for dense controls.
- Use sentence case, medium weights, comfortable line height, and 55–75 characters per prose line.
- Keep hierarchy restrained: one page title, clear section headings, readable body text, quiet metadata.

COMPONENTS
- Buttons: one clear primary action per local area; neutral secondary and ghost actions; visible hover, focus, active, loading, and disabled states.
- Forms: persistent labels, clear help and error text, 40–44px controls, obvious focus rings, and preserved user input after errors.
- Navigation: quiet sidebar, compact rows, subtle selected state, consistent outline icons, and mobile drawer behavior.
- Cards/panels: subtle border, neutral surface, 12–14px radius, 16–24px padding, and no shadow in normal flow.
- Tables: subtle row separators, concise headers, right-aligned numeric columns, keyboard-accessible actions, and deliberate mobile handling.
- Modals: use only for focused blocking decisions; manage focus correctly and state consequences plainly.
- Chat: readable document-like responses, generous separation between turns, a spacious persistent composer, honest generation status, and controls to stop, retry, copy, or edit where appropriate.

STATES AND ACCESSIBILITY
- Design empty, loading, partial, success, warning, and error states—not only the ideal state.
- Meet WCAG 2.2 AA. Use semantic HTML, labeled fields, logical keyboard order, visible focus, screen-reader announcements, and sufficient contrast.
- Never communicate meaning through color alone.
- Respect reduced motion and avoid unnecessary animation. Use 100–300ms functional transitions with small travel distances.
- Make every hover interaction available by keyboard and touch.

VOICE
- Write in plain, calm, direct language.
- Use concise action labels with specific verbs.
- Explain consequences before destructive actions.
- Avoid hype, jargon, cuteness, fake certainty, and excessive exclamation marks.
- When an error occurs, say what happened, whether work was preserved, and what the user can do next.

IMPLEMENTATION EXPECTATIONS
- Create reusable semantic design tokens and accessible component primitives.
- Use responsive behavior based on content needs, not device labels alone.
- Include realistic content and all interaction states in the implementation.
- Avoid default SaaS styling: no sea of cards, electric-blue buttons, heavy drop shadows, decorative gradients, or excessive badges.
- Before finishing, review the interface for hierarchy, readability, responsiveness, accessibility, state coverage, and originality.
```

## 25. Final Principle

The defining quality is not a particular hex value, font, or corner radius. It is the discipline to remove anything that competes with reading, thinking, and acting. A successful Claude-inspired interface feels warm and capable while leaving the user—not the visual system—at the center.
