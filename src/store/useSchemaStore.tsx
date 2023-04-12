import { create } from 'zustand'
import { labelSchema } from '../core/schema'
import type { Block, Schema } from '../types/type'

interface State {
  schema: Schema
  currentBlock: Block | null
  labelHasChanged: boolean
}
interface Actions {
  updateContainer: (container: Schema['container']) => void
  updateSchema: (schema: Schema) => void
  setCurrentBlock: (block: Block) => void
  updateBlock: (block: Block) => void
  deleteBlock: (blockId: number) => void
  pushBlock: (block: Block) => void
  clearAllFocus: () => void
  updateLabelHasChanged: (labelHasChanged: boolean) => void
}
export const useSchemaStore = create<State & Actions>(set => ({
  schema: labelSchema,
  currentBlock: null,
  labelHasChanged: false,
  updateLabelHasChanged: (labelHasChanged: boolean) => set({ labelHasChanged }),
  updateContainer: (container: Schema['container']) => (set((state) => {
    let labelHasChanged = state.labelHasChanged
    if (
      container.width !== state.schema.container.width
      || container.height !== state.schema.container.height) {
      labelHasChanged = true
    }
    return {
      schema: {
        ...state.schema,
        container,
      },
      labelHasChanged,
    }
  })),
  updateSchema: (schema: Schema) => set({ schema }),
  setCurrentBlock: (block: Block | null) => set({ currentBlock: block }),
  pushBlock: block => (set(state => ({
    schema: {
      ...state.schema,
      blocks: [...state.schema.blocks, block],
    },
    // labelHasChanged: true,
  }))),

  updateBlock: block => (set((state) => {
    const blocks = [...state.schema.blocks]
    const index = blocks.findIndex(b => b.id === block.id)
    if (index !== -1) {
      blocks[index] = block
      if (block.focus)
        state.currentBlock = block
    }
    return {
      schema: {
        ...state.schema,
        blocks,
      },
      // labelHasChanged: true,
    }
  })),

  deleteBlock: (id: number) => (set((state) => {
    const blocks = [...state.schema.blocks]
    const index = blocks.findIndex(b => b.id === id)
    if (index !== -1) {
      blocks.splice(index, 1)
      state.currentBlock = null
    }
    return {
      schema: {
        ...state.schema,
        blocks,
      },
      labelHasChanged: true,
    }
  })),

  clearAllFocus: () => (set((state) => {
    const blocks = [...state.schema.blocks]
    blocks.forEach((b) => {
      b.focus = false
    })
    state.currentBlock = null
    return {
      schema: {
        ...state.schema,
        blocks,
      },
    }
  })),
}))
