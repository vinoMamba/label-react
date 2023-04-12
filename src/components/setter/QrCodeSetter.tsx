import { Form, InputNumber } from 'antd'
import { useSchemaStore } from '../../store/useSchemaStore'
import { StarIcon } from '../StarIcon'

export const QrCodeSetter = () => {
  const [currentBlock, updateBlock] = useSchemaStore(state => [state.currentBlock, state.updateBlock])
  const valueChange = (value: number | null) => {
    if (!value)
      return
    updateBlock({
      ...currentBlock!,
      options: {
        ...currentBlock!.options,
        width: value,
        height: value,
      },
    })
  }
  return (
    <div>
      <h6 className="setter-h6">资产二维码</h6>
      <Form>
        <Form.Item label={<StarIcon>宽度</StarIcon>} rules={[{ required: true }]}>
          <div className="flex items-center">
            <InputNumber value={currentBlock!.options.width} onChange={valueChange} />
            <span className="ml-4">px</span>
          </div>
        </Form.Item>
        <Form.Item label={<StarIcon>高度</StarIcon>} rules={[{ required: true }]}>
          <div className="flex items-center">
            <InputNumber value={currentBlock!.options.height} onChange={valueChange} />
            <span className="ml-4">px</span>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
