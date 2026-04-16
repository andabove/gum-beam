<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, useTemplateRef } from 'vue'

interface SizePreset {
  borderRadius: number
  borderWidth: number
  strokeOpacity: number
  innerOpacity: number
  bloomOpacity: number
  innerShadow: string
  defaultDuration: number
}

const SIZE_PRESETS: Record<'sm' | 'md' | 'line', SizePreset> = {
  sm: {
    borderRadius: 18,
    borderWidth: 1,
    strokeOpacity: 0.48,
    innerOpacity: 0.7,
    bloomOpacity: 0.8,
    innerShadow: 'rgba(255, 255, 255, 0.3)',
    defaultDuration: 1.96,
  },
  md: {
    borderRadius: 16,
    borderWidth: 1,
    strokeOpacity: 0.48,
    innerOpacity: 0.7,
    bloomOpacity: 0.8,
    innerShadow: 'rgba(255, 255, 255, 0.27)',
    defaultDuration: 1.96,
  },
  line: {
    borderRadius: 16,
    borderWidth: 1,
    strokeOpacity: 0.72,
    innerOpacity: 0.7,
    bloomOpacity: 0.8,
    innerShadow: 'rgba(255, 255, 255, 0.1)',
    defaultDuration: 2.4,
  },
}

const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'line'
  strength?: number
  duration?: number
  active?: boolean
  borderRadius?: number
}>(), {
  size: 'md',
  strength: 1,
  active: true,
})

const emit = defineEmits<{
  activate: []
  deactivate: []
}>()

const wrapperRef = useTemplateRef<HTMLDivElement>('wrapper')

const isActive = ref(props.active)
const isFading = ref(false)
const detectedRadius = ref<number | null>(null)

let observer: MutationObserver | null = null

watch(() => props.active, (next) => {
  if (next && !isActive.value && !isFading.value) {
    isActive.value = true
  } else if (!next && isActive.value && !isFading.value) {
    isFading.value = true
  }
})

function detectRadius(): void {
  const el = wrapperRef.value
  if (!el) return
  const child = el.firstElementChild as HTMLElement | null
  if (!child || child.hasAttribute('data-beam-bloom')) return
  const raw = parseFloat(getComputedStyle(child).borderTopLeftRadius)
  if (!isNaN(raw) && raw > 0) {
    detectedRadius.value = raw
  }
}

onMounted(() => {
  detectRadius()
  const el = wrapperRef.value
  if (!el) return
  observer = new MutationObserver(detectRadius)
  observer.observe(el, { childList: true })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})

function handleAnimationEnd(e: AnimationEvent): void {
  const name = e.animationName
  if (name === 'beam-fade-out') {
    isActive.value = false
    isFading.value = false
    emit('deactivate')
  } else if (name === 'beam-fade-in') {
    emit('activate')
  }
}

const preset = computed(() => SIZE_PRESETS[props.size])

const finalBorderRadius = computed(
  () => props.borderRadius ?? detectedRadius.value ?? preset.value.borderRadius,
)

const finalDuration = computed(() => props.duration ?? preset.value.defaultDuration)

const wrapperStyle = computed(() => ({
  '--beam-radius': `${finalBorderRadius.value}px`,
  '--beam-inner-radius': `${Math.max(0, finalBorderRadius.value - preset.value.borderWidth)}px`,
  '--beam-border-width': `${preset.value.borderWidth}px`,
  '--beam-duration': `${finalDuration.value}s`,
  '--beam-stroke-opacity': preset.value.strokeOpacity,
  '--beam-inner-opacity': preset.value.innerOpacity,
  '--beam-bloom-opacity': preset.value.bloomOpacity,
  '--beam-inner-shadow': preset.value.innerShadow,
  '--beam-strength': Math.max(0, Math.min(1, props.strength)),
}))
</script>

<template>
  <div
    ref="wrapper"
    data-beam
    :data-size="size"
    :data-active="isActive && !isFading ? '' : undefined"
    :data-fading="isFading ? '' : undefined"
    :style="wrapperStyle"
    @animationend="handleAnimationEnd"
  >
    <slot />
    <div data-beam-bloom />
  </div>
</template>
