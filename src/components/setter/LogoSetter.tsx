import { Form, InputNumber } from 'antd'
import { useSchemaStore } from '../../store/useSchemaStore'

export const LogoSetter = () => {
  const [currentBlock, updateBlock] = useSchemaStore(state => [state.currentBlock, state.updateBlock])
  const widthChange = (value: number | null) => {
    if (!value)
      return
    updateBlock({
      ...currentBlock!,
      options: {
        ...currentBlock!.options,
        width: value,
      },
    })
  }

  const heightChange = (value: number | null) => {
    if (!value)
      return
    updateBlock({
      ...currentBlock!,
      options: {
        ...currentBlock!.options,
        height: value,
      },
    })
  }
  return (
    <div>
      <h6 className="setter-h6">资产二维码</h6>
      <Form>
        <Form.Item label="宽度" rules={[{ required: true }]}>
          <InputNumber value={currentBlock!.options.width} onChange={widthChange} />
        </Form.Item>
        <Form.Item label="高度" rules={[{ required: true }]}>
          <InputNumber value={currentBlock!.options.height} onChange={heightChange} />
        </Form.Item>
      </Form>
    </div>
  )
}
