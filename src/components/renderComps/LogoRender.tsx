import type { FC } from 'react'

interface Props {
  width: number
  height: number
  url: string
}

export const LogoRender: FC<Props> = (props) => {
  console.log('fuck')
  console.log(props)
  console.log('end')
  const url = props.url || import.meta.env.VITE_LOGO_URL
  return (
        <img src={url} alt="" width={props.width || 96} height={props.height || 32}/>
  )
}
