import { defineConfig, presetAttributify, presetIcons, presetUno, transformerAttributifyJsx } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  shortcuts: [
    { logo: 'i-logos-react w-6em h-6em transform transition-800 hover:rotate-180' },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerAttributifyJsx(),
  ],
})
