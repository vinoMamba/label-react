import { Checkbox, Form, Select } from 'antd'
import { useEffect, useState } from 'react'
import { fontSizes } from '../../shared'
import { useFieldListStore } from '../../store/useFieldListStore'
import { useSchemaStore } from '../../store/useSchemaStore'
import { useMaxLevelStore } from '../../store/useMaxLevelStore'
import { StarIcon } from '../StarIcon'

export const FieldSetter = () => {
  const [positionOptions] = useMaxLevelStore(state => [state.positionOptions])
  const [fieldList] = useFieldListStore(state => [state.fieldList])
  const [currentBlock, updateBlock] = useSchemaStore(state => [state.currentBlock, state.updateBlock])
  const [position, setPosition] = useState(false)
  useEffect(() => {
    setPosition(currentBlock?.props.fieldValue === 'position')
  }, [currentBlock])

  const handleFieldChange = (value: { value: string; label: React.ReactNode }) => {
    // 业务代码逻辑
    setPosition(value.label === '所在位置')
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
                <Form.Item label={<StarIcon>字段名称</StarIcon>} rules={[{ required: true }]}>
                    <Select
                        labelInValue={true}
                        value={currentBlock!.props.fieldValue}
                        onChange={handleFieldChange}
                        options={fieldList}
                    />
                </Form.Item>
                {
                    position
                    && <Form.Item label="打印位置">
                        <Select
                            labelInValue={true}
                            value={currentBlock!.props.position}
                            options={positionOptions}
                            onChange={handlePositionChange}
                        />
                    </Form.Item>
                }
                <Form.Item label="字体大小" rules={[{ required: true }]}>
                    <Select
                        labelInValue={true}
                        value={currentBlock!.props.fontSize}
                        options={fontSizes}
                        onChange={handleFontSizeChange}
                    />
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
