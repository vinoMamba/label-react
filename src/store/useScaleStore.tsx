import { create } from 'zustand'

interface State {
  scale: number
}
interface Actions {
  addScale: () => void
  reduceScale: () => void
  resetScale: () => void
}
/**
 * 缩放比例
 */

export const useScaleStore = create<State & Actions>(set => ({
  scale: 1,
  addScale: () => set((state) => {
    if (state.scale >= 2) {
      return { scale: 2 }
    }
    return { scale: state.scale + 0.5 }
  }),
  reduceScale: () => set((state) => {
    if (state.scale <= 1)
      return { scale: 1 }
    return { scale: state.scale - 0.5 }
  }),
  resetScale: () => set({ scale: 1 }),
}))
