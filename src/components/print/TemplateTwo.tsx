import type { FC } from 'react'
interface Props {
  type: number
  qrCodeUrl: string
  width: number
  fieldValue: string
}
export const TemplateTwo: FC<Props> = (props) => {
  const { qrCodeUrl, width, fieldValue, type } = props
  const style = {
    padding: '4px',
    position: 'relative',
    width: `${width}mm`,
    height: `${width}mm`,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: type === 2 ? 'column' : 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  const qrCodeWrapperStyle = {
    width: `${width - 10}mm`,
    height: `${width - 10}mm`,
    flexShrink: 0,
  }
  return (
    <section
      style={style as any} >
      <span>{fieldValue}</span>
      <div style={qrCodeWrapperStyle}>
          <img src={qrCodeUrl} alt="" width='100%' height='100%' />
      </div>
    </section>
  )
}
