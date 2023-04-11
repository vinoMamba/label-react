import { Button } from 'antd'
import { useLoaderData } from 'react-router-dom'
import imgUrl from '../assets/print.png'
import type { CreateLabelParams } from '../core/print'
import { createLabelTemplate } from '../core/print'

export const Print = () => {
  const data = useLoaderData() as CreateLabelParams
  const template = createLabelTemplate({ ...data })

  function getLoadPromise(iframe: HTMLIFrameElement) {
    const imgList = iframe.contentWindow?.document.querySelectorAll('img')
    if (!imgList)
      return Promise.resolve()
    if (imgList.length === 0) {
      return Promise.resolve()
    }
    let finishedCount = 0
    return new Promise<void>((resolve) => {
      function check() {
        finishedCount++
        if (finishedCount === imgList!.length) {
          resolve()
        }
      }

      imgList.forEach((img) => {
        img.addEventListener('load', check)
        img.addEventListener('error', check)
      })
    })
  }

  const printLabel = async () => {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    iframe.contentWindow?.document.write(template)
    console.log(template)
    await getLoadPromise(iframe)
    iframe.contentWindow?.print()
    document.body.removeChild(iframe)
  }

  function closeTheWindow() {
    if (navigator.userAgent.includes('Firefox') || navigator.userAgent.includes('Chrome')) {
      window.location.href = 'about:blank'
      window.close()
    }
    else {
      window.opener = null
      window.open('', '_self')
      window.close()
    }
  }

  return (
    <main className="h-screen w-screen pt-50 flex flex-col items-center">
      <img src={imgUrl} alt="" />
      <p className="text-#7dc1fd">请使用Chrome浏览器，以获得最佳打印效果</p>
      <div className="mt-16 flex gap-8">
        <Button type="primary" onClick={printLabel}>打印</Button>
        <Button onClick={closeTheWindow}>关闭</Button>
      </div>
    </main>
  )
}
