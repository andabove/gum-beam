# gum-beam

Gemini-style animated border beam for Vue 3 and Nuxt. A lightweight component that wraps any element and renders a traveling sparkle glow animation along its border — styled after the Google Gemini visual design language.

## Install

```bash
pnpm add @andabove/gum-beam
```

## Nuxt (auto-import)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@andabove/gum-beam'],
})
```

```vue
<template>
  <GumBeam>
    <div class="card">Your content</div>
  </GumBeam>
</template>
```

## Vue 3

```ts
import { GumBeam } from '@andabove/gum-beam/vue'
```

```vue
<script setup>
import { GumBeam } from '@andabove/gum-beam/vue'
</script>

<template>
  <GumBeam>
    <div class="card">Your content</div>
  </GumBeam>
</template>
```

## Sizes

```vue
<GumBeam size="md">  <!-- Full border glow on cards (default) -->
  <Card />
</GumBeam>

<GumBeam size="sm">  <!-- Compact glow for buttons -->
  <Button />
</GumBeam>

<GumBeam size="line">  <!-- Traveling bottom-edge glow for inputs -->
  <SearchBar />
</GumBeam>
```

## Active / fade control

The beam layers fade in and out independently of the wrapped content — perfect for signalling AI processing state:

```vue
<GumBeam :active="isThinking" @activate="onIn" @deactivate="onOut">
  <input type="text" placeholder="Ask Gemini…" />
</GumBeam>
```

## Strength

Scale the overall glow intensity without touching children:

```vue
<GumBeam :strength="0.6">
  <Card />
</GumBeam>
```

`strength` accepts `0` (invisible) to `1` (full, default).

## Border radius

Auto-detected from the first child's computed `borderTopLeftRadius`. Override explicitly:

```vue
<GumBeam :border-radius="999">
  <button class="pill-btn">Pill</button>
</GumBeam>
```

## Duration

Override the animation cycle duration in seconds:

```vue
<GumBeam :duration="4">
  <Card />
</GumBeam>
```

Defaults: `1.96s` for `sm`/`md`, `2.4s` for `line`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'line'` | `'md'` | Size/type preset |
| `active` | `boolean` | `true` | Whether the beam is playing |
| `strength` | `number` | `1` | Effect opacity 0–1 (beam only, not children) |
| `duration` | `number` | size-dependent | Animation cycle duration in seconds |
| `borderRadius` | `number` | auto-detected | Border radius in px |

## Events

| Event | Description |
|---|---|
| `@activate` | Fires when the fade-in animation completes |
| `@deactivate` | Fires when the fade-out animation completes |

## How it works

`<GumBeam>` renders a single wrapper `<div>` with:

- `::after` — the spinning border beam (conic gradient masked to the border edge)
- `::before` — inner glow layer
- `[data-beam-bloom]` — outer bloom child div

All effect layers are `pointer-events: none` and absolutely positioned — they never interfere with your content.

Styles are shipped as a static CSS file injected once by the Nuxt module (or imported once from `@andabove/gum-beam/vue`). Per-instance values (radius, duration, opacity weights, strength) are applied as CSS custom properties on the wrapper element. No runtime CSS generation.

## Browser support

Requires CSS `@property` (Chrome 85+, Safari 15.4+, Firefox 128+).

## License

[MIT](./LICENSE)
