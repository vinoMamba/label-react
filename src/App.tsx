import { Button } from 'antd'
import { useRef } from 'react'
import { PanerHeader } from './components/PanelHeader'
import { registerConfig } from './core/registerConfig'
import type { Material } from './types/type'
import { StepCounter } from './components/StepCounter'
import { PreviewModal } from './components/PreviewModal'

function App() {
  const currentMaterial = useRef<Material>()
  function handleDragStart(material: any) {
    currentMaterial.current = material
  }
  function resetPanelState() {

  }
  return (
    <main h-screen bg-white>
      <PanerHeader />
      <div className='flex  h[calc(100vh-128px)]'>
        <section p-16 w-250>
          <p text-18 font-700>控件库</p>
          <ul>
            {registerConfig.materials.map(material => (
              <li key={material.type} draggable onDragStart={() => handleDragStart(material)}>
                <material.preview />
              </li>
            ))}
          </ul>
        </section>
        <section
          style={{
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)',
            backgroundImage: 'radial-gradient(rgba(9, 89, 194, 0.3) 6%, transparent 0),radial-gradient(#faf9f8 6%, transparent 0)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
          className='relative h[calc(100vh-144px)] flex-1  overflow-auto flex justify-center items-center'>
          <div className='absolute right-20 top-20 flex gap-8 z-10'>
            <PreviewModal />
            <Button onClick={resetPanelState}>重置</Button>
            <StepCounter />
          </div>
        </section>
        <section className='w-250 flex flex-col justify-between p-16'>

        </section>
      </div>
      <footer className='bg-white h-64 flex items-center justify-end px-72'>
        <Button type="primary">保存</Button>
      </footer>
    </main>
  )
}

export default App
