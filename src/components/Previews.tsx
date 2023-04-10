import type { FC } from 'react'
import qrCode from '../assets/qr-code-icon.svg'
import logo from '../assets/logo-icon.svg'
import field from '../assets/field-icon.svg'
import customText from '../assets/custom-field-icon.svg'

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
export const FieldPreview = () => <Container icon={field}>字段名称：XXXX</Container>
export const LogoPreview = () => <Container icon={logo}>公司Logo</Container>
export const CustomTextPreview = () => <Container icon={customText}>自定义文本框</Container>
