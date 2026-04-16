<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const strength = ref(1)

function toggleActive(): void {
  active.value = !active.value
}

function onActivate(): void {
  console.log('beam activated')
}

function onDeactivate(): void {
  console.log('beam deactivated')
}
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>gum-beam</h1>
      <p>Gemini sparkle border beam — Vue 3 + Nuxt</p>
    </header>

    <section class="controls">
      <button class="toggle-btn" @click="toggleActive">
        {{ active ? 'Pause beam' : 'Play beam' }}
      </button>
      <label class="strength-label">
        Strength
        <input
          v-model.number="strength"
          type="range"
          min="0"
          max="1"
          step="0.05"
          class="strength-slider"
        />
        <span class="strength-value">{{ strength.toFixed(2) }}</span>
      </label>
    </section>

    <section class="demos">
      <!-- md: card -->
      <div class="demo-row">
        <span class="demo-label">size="md"</span>
        <GumBeam
          size="md"
          :active="active"
          :strength="strength"
          @activate="onActivate"
          @deactivate="onDeactivate"
        >
          <div class="card card--md">
            <h2>Gemini</h2>
            <p>Medium card — border radius auto-detected</p>
          </div>
        </GumBeam>
      </div>

      <!-- sm: button -->
      <div class="demo-row">
        <span class="demo-label">size="sm"</span>
        <GumBeam size="sm" :active="active" :strength="strength">
          <button class="btn-sm">Ask Gemini</button>
        </GumBeam>
      </div>

      <!-- line: input bar -->
      <div class="demo-row">
        <span class="demo-label">size="line"</span>
        <GumBeam size="line" :active="active" :strength="strength">
          <div class="search-bar">
            <input type="text" placeholder="Ask me anything…" class="search-input" />
          </div>
        </GumBeam>
      </div>

      <!-- sm: explicit borderRadius -->
      <div class="demo-row">
        <span class="demo-label">size="sm" :borderRadius="999"</span>
        <GumBeam size="sm" :active="active" :strength="strength" :border-radius="999">
          <button class="btn-pill">Pill button</button>
        </GumBeam>
      </div>

      <!-- md: custom duration -->
      <div class="demo-row">
        <span class="demo-label">size="md" :duration="4"</span>
        <GumBeam size="md" :active="active" :strength="strength" :duration="4">
          <div class="card card--sm">
            <p>Slow spin (4 s)</p>
          </div>
        </GumBeam>
      </div>
    </section>
  </div>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #ffffff;
  color: #111118;
  font-family: system-ui, sans-serif;
  min-height: 100dvh;
}
</style>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.header h1 {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4796e3, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header p {
  margin-top: 0.5rem;
  color: #777;
  font-size: 0.95rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.toggle-btn {
  padding: 0.5rem 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.04);
  color: #111118;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: rgba(0, 0, 0, 0.08);
}

.strength-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #666;
}

.strength-slider {
  width: 140px;
  accent-color: #8b5cf6;
}

.strength-value {
  font-variant-numeric: tabular-nums;
  color: #111118;
  min-width: 2.5rem;
}

.demos {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.demo-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.demo-label {
  font-size: 0.8rem;
  font-family: monospace;
  color: #999;
  letter-spacing: 0.03em;
}

.card--md {
  padding: 2rem;
  border-radius: 16px;
  background: #f8f8fc;
  border: 1px solid rgba(0, 0, 0, 0.07);
}

.card--md h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #111118;
}

.card--md p {
  color: #777;
  font-size: 0.9rem;
}

.card--sm {
  padding: 1.25rem 1.75rem;
  border-radius: 12px;
  background: #f8f8fc;
  border: 1px solid rgba(0, 0, 0, 0.07);
}

.card--sm p {
  color: #777;
  font-size: 0.9rem;
}

.btn-sm {
  padding: 0.6rem 1.25rem;
  border-radius: 18px;
  background: #f4f4f8;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #111118;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
}

.btn-pill {
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  background: #f4f4f8;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #111118;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
}

.search-bar {
  border-radius: 16px;
  background: #f8f8fc;
  border: 1px solid rgba(0, 0, 0, 0.07);
  overflow: hidden;
}

.search-input {
  width: 100%;
  padding: 0.9rem 1.25rem;
  background: transparent;
  border: none;
  outline: none;
  color: #111118;
  font-size: 0.95rem;
}

.search-input::placeholder {
  color: #bbb;
}
</style>
