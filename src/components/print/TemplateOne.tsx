import type { FC } from 'react'
interface Props {
  fontSize: number
  logoUrl: string
  qrCodeUrl: string
  width: number
  height: number
  showField: boolean
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
    height: `${height / 2 - 5}mm`,
  }
  const fieldStyle = {
    fontSize: `${props.fontSize}px`,
    marginTop: '8px',
  }
  return (
    <section
      style={style as any} >
      <div style={qrCodeWrapperStyle}>
          <img src={qrCodeUrl} alt="" width='100%' height='100%' />
      </div>
      <div style={rightStyle as any}>
        {logoUrl
            && <div style={logoStyle}>
              <img src={logoUrl} alt="" width='100%' height='100%' />
            </div>
        }
        {list.map((item) => {
          return (
          <div style={fieldStyle} key={item.fieldName}>
            {props.showField && <span>{item.fieldName}：</span>}
            <span>{item.fieldValue}</span>
          </div>
          )
        })}
      </div>
    </section>
  )
}
