import { Button } from 'antd'
import { useRef } from 'react'
import { PanerHeader } from './components/PanelHeader'
import { registerConfig } from './core/registerConfig'
import type { Material } from './types/type'

function App() {
  const currentMaterial = useRef<Material>()
  function handleDragStart(material: any) {
    currentMaterial.current = material
  }
  return (
    <main h-screen bg-white>
      <PanerHeader />
      <div className='flex  h[calc(100vh-128px)] bg-red'>
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
      </div>
      <footer className='bg-white h-64 flex items-center justify-end px-72'>
        <Button type="primary">保存</Button>
      </footer>
    </main>
  )
}

export default App
