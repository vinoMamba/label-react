import type { Schema } from '../types/type'

export const labelSchema: Schema = {
  container: {
    width: 100,
    height: 50,
    top: 0,
    left: 0,
  },
  blocks: [],
}

export const validateSchema = (schema: Schema) => {
  let valid = true
  const { blocks } = schema
  blocks.forEach(block => {
    if (block.type === 'field') {
      const { props } = block
      for (let key in props) {
        if (props[key] === undefined || props[key] === null || props[key] === '') {
          valid = false
          break
        }
      }
    }
  })
  return valid
}
