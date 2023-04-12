import { create } from 'zustand'

interface State {
  positionOptions: Array<{ label: string; value: number }>
}
interface Actions {
  setMaxLevel: (maxLevel: number) => void
}
/**
 * 位置最大深度状态管理
 */

export const useMaxLevelStore = create<State & Actions>(set => ({
  positionOptions: [],
  setMaxLevel: maxLevel => set((state) => {
    const positionOptions = maxLevel !== 0
      ? Array.from({ length: maxLevel }, (_, index) => {
        if (index === 0) {
          return {
            label: '当前位置',
            value: 0,
          }
        }
        else {
          return {
            label: `往上 ${index} 级位置`,
            value: index,
          }
        }
      })
      : [{ label: '当前位置', value: 0 }]

    state.positionOptions = positionOptions
    return state
  }),
}))
