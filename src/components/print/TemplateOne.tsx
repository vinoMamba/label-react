import type { FC } from 'react'
interface Props {
  logoUrl: string
  width: number
  height: number
}
export const TemplateOne: FC<Props> = (props) => {
  const { logoUrl, height } = props
  const style = {
    border: '1px solid #d4d4d4',
    position: 'relative',
    width: `${props.width}mm`,
    height: `${props.height}mm`,
    backgroundColor: '#fff',
  }
  return (
    <section
      className='flex'
      style={style as any} >
      <img src={logoUrl} alt="" width={height} height={height} />
      <div>

      </div>
    </section>
  )
}
