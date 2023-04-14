import type { FC } from 'react'

interface Props {
  fontSize: number
  bold: boolean
  hideTitle: boolean
  fieldValue: string
  fieldName: string
  printFieldValue: string
}
export const FieldRender: FC<Props> = (props) => {
  const style = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: `${props.fontSize || 14}px`,
    lineHeight: `${props.fontSize || 14}px`,
    fontWeight: props.bold ? 'bold' : 'normal',
  }
  return (
        <span
            style={style as any}
            className="p-0 m-0 overflow-hidden whitespace-nowrap cursor-default"
        >
          {props.printFieldValue !== undefined
            ? props.hideTitle ? props.printFieldValue : `${props.fieldName || '字段名称'}：${props.printFieldValue || ''}`
            : props.hideTitle ? 'XXXXXX' : `${props.fieldName || '字段名称'}：XXXXXX`
          }
    </span>
  )
}
