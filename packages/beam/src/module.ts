import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'

export interface ModuleOptions {}

const module: NuxtModule<ModuleOptions> = defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@andabove/gum-beam',
    configKey: 'gumBeam',
    compatibility: { nuxt: '>=3.0.0' },
  },
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    addComponent({
      name: 'GumBeam',
      filePath: resolve('./runtime/components/GumBeam.vue'),
    })

    nuxt.options.css.push(resolve('./runtime/assets/gum-beam.css'))
  },
})

export default module
