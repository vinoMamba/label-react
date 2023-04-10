import { QrCodePreview } from '../components/Previews'
import type { Material } from '../types/type'

function createMaterial() {
  const materials: Material[] = []
  const materialsMap = new Map<string, Material>()
  return {
    materials,
    materialsMap,
    registerMaterial: (material: Material) => {
      materials.push(material)
      materialsMap.set(material.name, material)
    },
  }
}

export const registerConfig = createMaterial()

registerConfig.registerMaterial({
  type: 'qrCode',
  name: '资产二维码',
  preview: QrCodePreview,
  renderInstance: () => (<div>1111</div>),
  props: {
    value: '',
  },
})
