import { useLoaderData } from 'react-router-dom'
import { useEffect } from 'react'
import type { CreateLabelParams } from '../core/print'
import { TemplateOne } from '../components/print/TemplateOne'
import { TemplateTwo } from '../components/print/TemplateTwo'
import { PrintLabel } from '../components/print/PrintLabel'
import { labelSchema } from '../core/schema'
import type { Block } from '../types/type'
import { mmToPx } from '../shared'

export const Preview = () => {
  const { logoUrl, label, labelInfo } = useLoaderData() as CreateLabelParams
  useEffect(() => {
    const height = mmToPx(label.labelHeight + 10)
    const width = mmToPx(label.labelWidth + 10)
    window.parent.postMessage({ type: 'labelInfo', data: [width, height] }, '*')
  }, [])
  function createPreview() {
    const type = label.labelType

    switch (type) {
      case 1:

        return <TemplateOne
          fontSize={label.fontSize}
          showField={label.showField === 1}
          logoUrl={logoUrl || ''}
          qrCodeUrl={labelInfo[0].qrCodeUrl}
          width={label.labelWidth}
          list={labelInfo[0].assetLabelFieldList}
          height={label.labelHeight}/>
      case 2:
        return <TemplateTwo type={type} qrCodeUrl={labelInfo[0].qrCodeUrl} width={label.labelWidth} fieldValue={labelInfo[0].assetLabelFieldList.length > 0 ? labelInfo[0].assetLabelFieldList[0].fieldValue : ''}/>
      case 3:
        return <TemplateTwo type={type} qrCodeUrl={labelInfo[0].qrCodeUrl} width={label.labelWidth} fieldValue={labelInfo[0].assetLabelFieldList.length > 0 ? labelInfo[0].assetLabelFieldList[0].fieldValue : ''}/>
      case 4:
        const schema = label.labelField ? JSON.parse(label.labelField) : labelSchema
        const newSchema = {
          ...schema,
          blocks: schema.blocks.map((block: Block) => {
            switch (block.type) {
              case 'qrCode':
                return {
                  ...block,
                  props: {
                    ...block.props,
                    value: labelInfo[0].qrCodeUrl,
                  },
                }
              case 'field':
                return {
                  ...block,
                  props: {
                    ...block.props,
                    printFieldValue: labelInfo[0].assetLabelFieldList.find(item => item.fieldName === block.props.fieldName)?.fieldValue,
                  },
                }
              case 'logo':
                return {
                  ...block,
                  props: {
                    ...block.props,
                    url: logoUrl,
                  },
                }
              default:
                return block
            }
          }),
        }
        return <PrintLabel schema={newSchema}/>
      default:
        return <div>打印标签不见了</div>
    }
  }
  return (
    <div style={{
      overflow: 'hidden',
      width: mmToPx(label.labelWidth + 10),
      height: mmToPx(label.labelHeight + 10),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {createPreview()}
    </div>
  )
}
