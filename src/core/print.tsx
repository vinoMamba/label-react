import { renderToString } from 'react-dom/server'
import type { Label, Schema, labelInfo } from '../types/type'
import { PrintLabel } from '../components/print/PrintLabel'
import { TemplateOne } from '../components/print/TemplateOne'
import { TemplateTwo } from '../components/print/TemplateTwo'
import { template } from './template'

export interface CreateLabelParams {
  logoUrl: string | null
  label: Label
  labelInfo: labelInfo[]
}
export const createLabelTemplate = (p: CreateLabelParams): string => {
  const { logoUrl, label, labelInfo } = p
  const labelType = label.labelType
  const schemaStr = label.labelField
  const schema = schemaStr ? JSON.parse(schemaStr) : {}
  switch (labelType) {
    case 1:
      return createTemplateOne(labelInfo, logoUrl as string, label)
    case 2:
      return createTemplateTwo(labelInfo, logoUrl as string, label)
    case 3:
      return createTemplateTwo(labelInfo, logoUrl as string, label)
    case 4:
      return createCustomLabel(labelInfo, logoUrl as string, schema)
    default:
      return template
  }
}
function createTemplateTwo(labelList: labelInfo[], logoUrl: string, label: Label) {
  const List = () => <>{
    labelList.map((item) => {
      return (<TemplateTwo
        type={label.labelType}
        qrCodeUrl={item.qrCodeUrl}
        key={item.assetInfoId}
        width={label.labelWidth}
        fieldValue={item.assetLabelFieldList[0]?.fieldValue}
        />)
    })
  }</>
  const html = renderToString(<List />)
  const result = template.replace('{{labelContent}}', html)
  return result
}
function createTemplateOne(labelList: labelInfo[], logoUrl: string, label: Label) {
  const List = () => <>{
    labelList.map((item) => {
      return (<TemplateOne
        qrCodeUrl={item.qrCodeUrl}
        key={item.assetInfoId}
        logoUrl={logoUrl}
        width={label.labelWidth}
        list ={item.assetLabelFieldList}
        height={label.labelHeight} />)
    })
  }</>
  const html = renderToString(<List />)
  const result = template.replace('{{labelContent}}', html)
  return result
}

// 下面代码理不理解不重要，因为后端返回的数据格式奇奇怪怪的，所以这里要做一些处理。想优雅一点去找后端处理
function createCustomLabel(labelList: labelInfo[], logoUrl: string, schema: Schema) {
  const List = () => <>{
    labelList.map((label) => {
      const neSchema = {
        ...schema,
        blocks: schema.blocks.map((block) => {
          switch (block.type) {
            case 'qrCode':
              return {
                ...block,
                props: {
                  ...block.props,
                  value: label.qrCodeUrl,
                },
              }
            case 'field':
              return {
                ...block,
                props: {
                  ...block.props,
                  fieldValue: label.assetLabelFieldList.find(item => item.fieldName === block.props.fieldName)?.fieldValue,
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
      return (<PrintLabel key={label.assetInfoId} schema={neSchema} />)
    })
  }</>
  const html = renderToString(<List />)
  const result = template.replace('{{labelContent}}', html)
  return result
}
