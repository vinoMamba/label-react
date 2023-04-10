import { Checkbox, Form, Select, Input } from "antd"
import {fontSizes} from "../../shared";
import {useSchemaStore} from "../../store/useSchemaStore";

export const CustomTextSetter = () => {
  const [currentBlock, updateBlock] = useSchemaStore((state) => [state.currentBlock, state.updateBlock])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        text: e.target.value
      }
    })
  }
  const handleFontSizeChange = (value: { value: string; label: React.ReactNode }) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        fontSize: value.value
      }
    })
  }
  const handleBoldChange = (checkedValue: boolean) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        bold: checkedValue
      }
    })
  }
  return (
    <div>
      <h6 className="setter-h6">自定义文本框</h6>
      <Form>
        <Form.Item label="文本内容" rules={[{ required: true }]}>
          <Input placeholder="请输入文本内容" value={currentBlock!.props.text} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="字段大小" rules={[{ required: true }]}>
          <Select
            labelInValue={true}
            value={currentBlock!.props.fontSize}
            options={fontSizes}
            onChange={handleFontSizeChange} />
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={currentBlock!.props.bold}
            onChange={e => handleBoldChange(e.target.checked)}
          >字体加粗</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}
