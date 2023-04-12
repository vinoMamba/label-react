import { defineConfig, presetAttributify, presetIcons, presetUno, transformerAttributifyJsx } from 'unocss'

export default defineConfig({
  // ...UnoCSS options

  shortcuts: {
    'setter-h6': 'm-0 mb-16 p-0  text-18 text-#333 font-700 relative before:absolute before:top-2 before:left--8 before:content-empty before:bg-#018bff before:w-4 before:h-full',
  },
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
