# WCAG 2.1 AA Accessibility Checklist

## 1. Perceivable
- [ ] Text contrast ratio is at least `4.5:1` for normal text and `3:1` for large text (18pt+ or bold 14pt+).
- [ ] UI components and graphical objects have at least `3:1` contrast against adjacent backgrounds.
- [ ] Information is not conveyed through color alone (e.g. error messages include icons and text).
- [ ] Non-text content (images, icons) provides meaningful `alt` text or `aria-label`.

## 2. Operable
- [ ] All interactive elements are reachable and operable via keyboard alone (`Tab`, `Shift+Tab`, `Enter`, `Space`).
- [ ] Visible focus indicators (`:focus-visible`) are clearly distinct.
- [ ] Touch targets are at least `44x44` CSS pixels.

## 3. Understandable
- [ ] Form inputs have associated permanent `<label>` elements (not only placeholders).
- [ ] Clear validation error messages explain how to fix the error.

## 4. Robust
- [ ] Semantic HTML tags (`<nav>`, `<main>`, `<header>`, `<button>`, `<article>`) are used properly.
