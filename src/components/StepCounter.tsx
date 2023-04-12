import { useScaleStore } from '../store/useScaleStore'

export const StepCounter = () => {
  const [scale, addScale, reduceScale] = useScaleStore(state => [state.scale, state.addScale, state.reduceScale])
  return (
    <div className="flex items-center select-none bg-white rounded-8 border border-solid border-gray overflow-hidden">
      <button className="bg-white p-4 px-8" onClick={() => reduceScale()}>-</button>
      <span className="p-4 border border-l-solid border-r-solid border-gray text-gray">{scale * 100}%</span>
      <button className="bg-white p-4 px-8" onClick={() => addScale()}>+</button>
    </div>
  )
}
