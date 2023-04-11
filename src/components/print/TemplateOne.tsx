import type { FC } from 'react'
interface Props {
  logoUrl: string
  qrCodeUrl: string
  width: number
  height: number
  list: Array<{
    fieldName: string
    fieldValue: string
  }>
}
export const TemplateOne: FC<Props> = (props) => {
  const { qrCodeUrl, height, list, logoUrl } = props
  const style = {
    padding: '4px',
    position: 'relative',
    width: `${props.width}mm`,
    height: `${props.height}mm`,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
  }
  const qrCodeWrapperStyle = {
    width: `${height - 5}mm`,
    height: `${height - 5}mm`,
    flexShrink: 0,
  }
  const rightStyle = {
    height: `${height - 5}mm`,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  const logoStyle = {
    width: `${height}mm`,
    height: `${height / 4 - 5}mm`,
  }
  return (
    <section
      style={style as any} >
      <div style={qrCodeWrapperStyle}>
          <img src={qrCodeUrl} alt="" width='100%' height='100%' />
      </div>
      <div style={rightStyle as any}>
        {list.map((item) => {
          return (
          <div key={item.fieldName}>
            {logoUrl
            && <div style={logoStyle}>
              <img src={logoUrl} alt="" width='100%' height='100%' />
            </div>
            }
            <span>{item.fieldName}</span>
            <span>{item.fieldValue}</span>
          </div>
          )
        })}
      </div>
    </section>
  )
}
