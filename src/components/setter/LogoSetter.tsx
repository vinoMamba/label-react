import { Form, InputNumber, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { useLocation } from 'react-router-dom'
import { useSchemaStore } from '../../store/useSchemaStore'

export const LogoSetter = () => {
  const { search } = useLocation()
  const action = `${import.meta.env.VITE_API_URL}/upms/upload/multi`
  const headers = {
    Authorization: `Bearer ${search.split('=')[1]}`,
  }
  const [currentBlock, updateBlock] = useSchemaStore(state => [state.currentBlock, state.updateBlock])
  const widthChange = (value: number | null) => {
    if (!value)
      return
    updateBlock({
      ...currentBlock!,
      options: {
        ...currentBlock!.options,
        width: value,
      },
    })
  }

  const heightChange = (value: number | null) => {
    if (!value)
      return
    updateBlock({
      ...currentBlock!,
      options: {
        ...currentBlock!.options,
        height: value,
      },
    })
  }

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  async function beforeUpload(file: RcFile) {
    console.log(file.size)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('仅支持JPG/PNG格式图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过2MB')
    }
    return isJpgOrPng && isLt2M
  }
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
        updateBlock({
          ...currentBlock!,
          props: {
            ...currentBlock!.props,
            url,
          },
        })
      })
      console.log(info)
    }
  }
  return (
    <div>
      <h6 className="setter-h6">资产二维码</h6>
      <Form>
        <Form.Item label="宽度" rules={[{ required: true }]}>
          <InputNumber value={currentBlock!.options.width} onChange={widthChange} />
        </Form.Item>
        <Form.Item label="高度" rules={[{ required: true }]}>
          <InputNumber value={currentBlock!.options.height} onChange={heightChange} />
        </Form.Item>
        <Form.Item>
          <Upload
            name="avatar"
            listType="picture-card"
            className="overflow-hidden"
            showUploadList={false}
            headers={headers}
            action={action}
            beforeUpload={beforeUpload}
             onChange={handleChange}
            >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </div>
  )
}
