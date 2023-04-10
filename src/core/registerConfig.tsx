import { CustomTextPreview, FieldPreview, LogoPreview, QrCodePreview } from '../components/Previews'
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

registerConfig.registerMaterial({
  type: 'field',
  name: '字段名称',
  preview: FieldPreview,
  renderInstance: () => (<div>1111</div>),
  props: {
    fontSize: 16,
    bold: false,
    hideTitle: false,
    fieldValue: '',
    fieldName: '',
    position: 0,
  },
})

registerConfig.registerMaterial({
  type: 'logo',
  name: '公司Logo',
  preview: LogoPreview,
  renderInstance: () => (<div>1111</div>),
  props: {
    url: '',
  },
})

registerConfig.registerMaterial({
  type: 'customText',
  name: '自定义文本框',
  preview: CustomTextPreview,
  renderInstance: () => (<div>1111</div>),
  props: {
    fontSize: 16,
    bold: false,
    hideTitle: false,
    text: '',
  },
})
