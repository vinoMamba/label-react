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
  return (
        <span
            style={{
              fontSize: `${props.fontSize || 14}px`,
              fontWeight: props.bold ? 'bold' : 'normal',
            }}
            className="p-0 m-0 overflow-hidden whitespace-nowrap"
        >
          {props.printFieldValue
            ? props.hideTitle ? 'XXXXXX' : `${props.fieldName || '字段名称'}：${props.printFieldValue || 'XXXXXX'}`
            : props.hideTitle ? 'XXXXXX' : `${props.fieldName || '字段名称'}：XXXXXX`
          }
    </span>
  )
}
