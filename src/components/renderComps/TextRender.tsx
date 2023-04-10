import type { FC } from 'react'

interface Props {
  fontSize: number
  bold: boolean
  hideTitle: boolean
  text: string
}
export const TextRender: FC<Props> = (props) => {
  const style = {
    fontSize: `${props.fontSize || 14}px`,
    fontWeight: props.bold ? 'bold' : 'normal',
  }
  return (
        <span
            style={style}
            className="p-0 m-0 overflow-hidden whitespace-nowrap"
        >
            {props.text || '自定义文本内容'}
        </span>
  )
}
