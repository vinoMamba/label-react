import { useLoaderData } from 'react-router-dom'
import type { CreateLabelParams } from '../core/print'
import { TemplateOne } from '../components/print/TemplateOne'
import { TemplateTwo } from '../components/print/TemplateTwo'
import { PrintLabel } from '../components/print/PrintLabel'

export const Preview = () => {
  const { logoUrl, label, labelInfo } = useLoaderData() as CreateLabelParams
  function createPreview() {
    const type = label.labelType
    const schema = label.labelField ? JSON.parse(label.labelField) : {}
    switch (type) {
      case 1:
        return <TemplateOne
          logoUrl={logoUrl || ''}
          qrCodeUrl={labelInfo[0].qrCodeUrl}
          width={label.labelWidth}
          list={labelInfo[0].assetLabelFieldList}
          height={label.labelHeight}/>
      case 2:
        return <TemplateTwo type={type} qrCodeUrl={labelInfo[0].qrCodeUrl} width={label.labelWidth} fieldValue={labelInfo[0].assetLabelFieldList[0].fieldValue}/>
      case 3:
        return <TemplateTwo type={type} qrCodeUrl={labelInfo[0].qrCodeUrl} width={label.labelWidth} fieldValue={labelInfo[0].assetLabelFieldList[0].fieldValue}/>
      case 4:
        return <PrintLabel schema={schema}/>
      default:
        return <div>打印标签不见了</div>
    }
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {createPreview()}
    </div>
  )
}
