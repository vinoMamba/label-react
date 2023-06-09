import { Form, InputNumber, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { useLocation } from 'react-router-dom'
import { useSchemaStore } from '../../store/useSchemaStore'
import { StarIcon } from '../StarIcon'

export const LogoSetter = () => {
  const { search } = useLocation()
  const action = `${import.meta.env.VITE_API_URL}/upms/upload/multi`

  // 获取 search 中的 auth 参数,search 为 ?auth=xxxxx&hasChanged=1
  const searchParams = new URLSearchParams(search)
  const auth = searchParams.get('auth')
  const headers = {
    Authorization: `Bearer ${auth}`,
    Accept: 'application/json, text/plain, */*',
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
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )
  async function beforeUpload(file: RcFile) {
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
      })
      updateBlock({
        ...currentBlock!,
        props: {
          ...currentBlock!.props,
          url: info.file.response.data[0].url || '',
        },
      })
    }
  }
  return (
    <div>
      <h6 className="setter-h6">公司Logo</h6>
      <Form>
        <Form.Item label={<StarIcon>宽度</StarIcon>} rules={[{ required: true }]}>
          <div className="flex items-center">
            <InputNumber value={currentBlock!.options.width} onChange={widthChange} />
            <span className="ml-4">px</span>
          </div>
        </Form.Item>
        <Form.Item label={<StarIcon>高度</StarIcon>} rules={[{ required: true }]}>
          <div className="flex items-center">
            <InputNumber value={currentBlock!.options.height} onChange={heightChange} />
            <span className="ml-4">px</span>
          </div>
        </Form.Item>
        <Form.Item>
          <Upload
            name="file"
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
          <p className='text-14 text-gray'>支持上传JPG、PNG等格式图片，文件不大于5M</p>
        </Form.Item>
      </Form>
    </div>
  )
}
