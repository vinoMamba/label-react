import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export const StarIcon: FC<Props> = (props) => {
  return (
    <span><i className='text-red mr-2'>*</i>{props.children}</span>
  )
}
