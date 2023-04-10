import type { FC } from 'react'

interface Props {
  children: React.ReactNode
  title: string
}
export const Wrapper: FC<Props> = (props) => {
  return (
    <div>
      <h6>{props.title}</h6>
    </div>
  )
}
