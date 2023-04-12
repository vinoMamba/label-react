import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { useSchemaStore } from '../store/useSchemaStore'
import { PrintLabel } from './print/PrintLabel'

export const PreviewModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [schema] = useSchemaStore(state => [state.schema])
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const width = `${schema.container.width + 25}mm`
  return (
        <>
            <Button type="primary" onClick={showModal}>
                预览
            </Button>
            <Modal
                bodyStyle={style}
                destroyOnClose={true}
                width={width}
                centered={true}
                title="打印预览"
                open={isModalOpen}
                onCancel={handleOk}
                footer={
                    <Button type="primary" onClick={handleOk}>确定</Button>
                }
            >
                <PrintLabel schema={schema}/>
            </Modal>
        </>
  )
}
