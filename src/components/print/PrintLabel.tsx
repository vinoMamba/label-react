import type { FC } from 'react'
import type { Block, Schema } from '../../types/type'
import { QrCodeRender } from '../renderComps/QrCodeRender'
import { FieldRender } from '../renderComps/FieldRender'
import { LogoRender } from '../renderComps/LogoRender'
import { TextRender } from '../renderComps/TextRender'

interface Props {
  schema: Schema
}

export const PrintLabel: FC<Props> = (props) => {
  const { schema } = props
  const style = {
    border: '1px solid #d4d4d4',
    position: 'relative',
    width: `${schema.container.width}mm`,
    height: `${schema.container.height}mm`,
    backgroundColor: '#fff',
  }

  function createBlockStyle(block: Block) {
    return {
      position: 'absolute',
      left: block.options.left,
      top: block.options.top,
      width: block.options.width,
      height: block.options.height,
    }
  }

  function createBlock(block: Block) {
    switch (block.type) {
      case 'qrCode':
        return <QrCodeRender value={block.props.value} width={block.options.width}
                                     height={block.options.height}
                />
      case 'field':
        return <FieldRender
                    printFieldValue={block.props.printFieldValue}
                    fontSize={block.props.fontSize}
                    bold={block.props.bold}
                    hideTitle={block.props.hideTitle}
                    fieldName={block.props.fieldName}
                    fieldValue={block.props.fieldValue}
                />
      case 'logo':
        return <LogoRender url={block.props.url} {...block.options} {...block.props} />
      case 'customText':
        return <TextRender
                    fontSize={block.props.fontSize}
                    bold={block.props.bold}
                    hideTitle={block.props.hideTitle}
                    text={block.props.text}
                />
      default:
        return null
    }
  }

  return (
        <section style={style as any}>
            {schema.blocks.map(block => (
                <div key={block.id} style={createBlockStyle(block) as any}>
                    {createBlock(block)}
                </div>
            ))}
        </section>
  )
}
