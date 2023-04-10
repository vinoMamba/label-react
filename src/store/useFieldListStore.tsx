import {create} from "zustand"

type State = {
    fieldList: Array<{ label: string, value: string }>
}
type Actions = {
    setFieldList: (record: Record<string, any>[]) => void
}
/**
 * 字段信息管理
 */

export const useFieldListStore = create<State & Actions>((set) => ({
    fieldList: [],
    setFieldList: (record) => set((state) => {
        if (!record) {
            return state
        } else {
            state.fieldList = record.map(item => {
                return {
                    label: item.name,
                    value: item.fieldName
                }
            })
            return state
        }
    }),
}))
