import type { FC } from 'react'
import qrCode from '../assets/qr-code-icon.svg'

interface Props {
  icon: string
  children: React.ReactNode
}

const Container: FC<Props> = (props) => {
  return (
    <section className="border border-solid border-#DDDDDD rounded-8 p-8 my-8 overflow-hidden cursor-pointer text-#333333">
      <div className="flex items-center">
        <img src={props.icon} width={24} alt="logo" />
        <span className="ml-2 whitespace-nowrap">{props.children}</span>
      </div>
    </section>
  )
}
export const QrCodePreview = () => <Container icon={qrCode}>资产二维码</Container>
