import { InputNumber } from 'antd'
import { useSchemaStore } from '../store/useSchemaStore'

export const PanerHeader = () => {
  const [schema, updateContainer] = useSchemaStore(state => [state.schema, state.updateContainer])
  const widthChange = (value: number | null) => {
    if (!value)
      return
    updateContainer({
      ...schema.container,
      width: value,
    })
  }
  const heightChange = (value: number | null) => {
    if (!value)
      return
    updateContainer({
      ...schema.container,
      height: value,
    })
  }
  return (
    <header className='h-48 border border-b-1 border-b-solid border-b-#ddd flex justify-start items-center px-16'>
      <span className="flex items-center">
        <i className="text-red-500 mr-4">*</i>打印标签尺寸大小：
      </span>
      <div className="flex">
        <label className="flex whitespace-nowrap items-center">
          <span>标签宽度（mm）</span>
          <div>
            <InputNumber
              value={schema.container.width}
              onChange={widthChange}
            />
          </div>
        </label>
        <label className="flex whitespace-nowrap items-center">
          <span className="ml-8">标签高度（mm）</span>
          <div>
            <InputNumber
              value={schema.container.height}
              onChange={heightChange}
            />
          </div>
        </label>
      </div>
    </header>
  )
}
