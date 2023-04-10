import {FC} from 'react'
import {QRCode} from 'antd'

type Props = {
    width: number
    height: number
    value: string
}

export const QrCodeRender: FC<Props> = (props) => {
    if (props.value !== "") {
        return <img src={props.value} width={props.width || 100} height={props.height || 100}/>
    } else {
        return <QRCode value="https://www.ahdingtalk.com/" size={props.width || 100}/>
    }
}
