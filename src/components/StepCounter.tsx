import { useSchemaStore } from '../store/useSchemaStore'

export const StepCounter = () => {
  const [schema, updateContainer] = useSchemaStore(state => [state.schema, state.updateContainer])
  function reduceScale() {
    if (schema.container.scale <= 1)
      return
    updateContainer({
      ...schema.container,
      scale: schema.container.scale - 0.5,
    })
  }
  function addScale() {
    if (schema.container.scale >= 2)
      return
    updateContainer({
      ...schema.container,
      scale: schema.container.scale + 0.5,
    })
  }
  return (
    <div className="flex items-center select-none bg-white rounded-8 border border-solid border-gray overflow-hidden">
      <button className="bg-white p-4 px-8" onClick={reduceScale}>-</button>
      <span className="p-4 border border-l-solid border-r-solid border-gray text-gray">{schema.container.scale * 100}%</span>
      <button className="bg-white p-4 px-8" onClick={() => addScale()}>+</button>
    </div>
  )
}
