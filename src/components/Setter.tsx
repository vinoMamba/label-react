import { Button } from 'antd'
import { useSchemaStore } from '../store/useSchemaStore'
import type { Block } from '../types/type'
import { FieldSetter } from './setter/FieldSetter'
import { QrCodeSetter } from './setter/QrCodeSetter'
import { LogoSetter } from './setter/LogoSetter'
import { CustomTextSetter } from './setter/CustomTextSetter'

export const Setter = () => {
  const [currentBlock, deleteBlock] = useSchemaStore(state => [state.currentBlock, state.deleteBlock])
  const handleDelete = () => {
    if (currentBlock) {
      deleteBlock(currentBlock.id)
    }
  }
  function generateSetter(type: Block['type']) {
    switch (type) {
      case 'qrCode':
        return <QrCodeSetter />
      case 'field':
        return <FieldSetter />
      case 'logo':
        return <LogoSetter />
      case 'customText':
        return <CustomTextSetter />
      default:
        return <div>请选择控件</div>
    }
  }
  return (
        <div className="flex flex-col h-full">
            <div className="flex-grow">
                {currentBlock?.type
                  ? generateSetter(currentBlock.type)
                  : <div>请选择控件</div>
                }
            </div>
            {currentBlock && (
                <Button type="primary" danger={true} onClick={handleDelete} className="mb-300" >
                    删除控件
                </Button>
            )}
        </div>
  )
}
