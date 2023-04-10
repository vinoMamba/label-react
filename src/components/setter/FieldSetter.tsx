import { Checkbox, Form, Select } from 'antd'
import { useState } from 'react'
import { fontSizes, positions } from '../../shared'
import { useFieldListStore } from '../../store/useFieldListStore'
import { useSchemaStore } from '../../store/useSchemaStore'

export const FieldSetter = () => {
  const [position, setPosition] = useState(false)
  const [fieldList] = useFieldListStore(state => [state.fieldList])
  const [currentBlock, updateBlock] = useSchemaStore(state => [state.currentBlock, state.updateBlock])
  const handleFieldChange = (value: { value: string; label: React.ReactNode }) => {
    // 业务代码逻辑
    if (value.label === '所在位置') {
      setPosition(true)
    }
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        fieldValue: value.value,
        fieldName: value.label,
      },
    })
  }
  const handlePositionChange = (value: { value: string; label: React.ReactNode }) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        position: value.value,
      },
    })
  }
  const handleFontSizeChange = (value: { value: string; label: React.ReactNode }) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        fontSize: value.value,
      },
    })
  }
  const handleBoldChange = (checkedValue: boolean) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        bold: checkedValue,
      },
    })
  }
  const handleHideTitleChange = (checkedValue: boolean) => {
    updateBlock({
      ...currentBlock!,
      props: {
        ...currentBlock!.props,
        hideTitle: checkedValue,
      },
    })
  }
  return (
    <div>
      <h6 className="setter-h6">字段信息</h6>
      <Form>
        <Form.Item label="字段名称" rules={[{ required: true }]}>
          <Select
            labelInValue={true}
            value={currentBlock!.props.fieldValue}
            onChange={handleFieldChange}
            options={fieldList} />
        </Form.Item>
        {
          position
          && <Form.Item label="打印位置">
            <Select
              labelInValue={true}
              value={currentBlock!.props.position}
              options={positions}
              onChange={handlePositionChange} />
          </Form.Item>
        }
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
        <Form.Item>
          <Checkbox
            checked={currentBlock!.props.hideTitle}
            onChange={e => handleHideTitleChange(e.target.checked)}
          >隐藏字段标题</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}
