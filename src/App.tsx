import {Button} from 'antd'
import React, {DragEventHandler, MouseEventHandler, useRef} from 'react'
import {BlockItem} from "./components/Block";
import {PanerHeader} from './components/PanelHeader'
import {Setter} from "./components/Setter";
import {registerConfig} from './core/registerConfig'
import {useMarkLineStore} from "./store/useMarklineStore";
import {useScaleStore} from "./store/useScaleStore";
import {useSchemaStore} from "./store/useSchemaStore";
import type {Block, Material} from './types/type'
import {StepCounter} from './components/StepCounter'
import {PreviewModal} from './components/PreviewModal'

function App() {
    const currentMaterial = useRef<Material>()
    const [markLine] = useMarkLineStore((state) => [state.markLine])
    const [scale, resetScale] = useScaleStore((state) => [state.scale, state.resetScale])
    const [schema, pushBlock, clearAllFocus, updateContainer, updateSchema] = useSchemaStore((state) => [state.schema, state.pushBlock, state.clearAllFocus, state.updateContainer, state.updateSchema])
    const wrapStyle = {
        border: '1px dashed #e8e8e8',
        width: `${schema.container.width}mm`,
        height: `${schema.container.height}mm`,
        transform: `scale(${scale}) translate(${schema.container.left}px,${schema.container.top}px)`,
    }

    function handleDragStart(material: any) {
        currentMaterial.current = material
    }

    const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
        e.dataTransfer.dropEffect = 'none'
    }
    const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
        const {
            offsetX,
            offsetY
        } = e.nativeEvent
        const block: Block = {
            id: Date.now(),
            type: currentMaterial.current!.type,
            focus: false,
            options: {
                top: offsetY,
                left: offsetX,
                width: 0,
                height: 0,
            },
            props: currentMaterial.current!.props,
        }
        pushBlock(block)
    }
    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        if (e.button !== 0) return
        const {
            clientX,
            clientY
        } = e
        clearAllFocus()
        const mousemove = (e: MouseEvent) => {
            const moveX = (e.clientX - clientX) / scale
            const moveY = (e.clientY - clientY) / scale
            const newContainer = {
                ...schema.container,
                top: schema.container.top + moveY,
                left: schema.container.left + moveX,
            }
            updateContainer(newContainer)
        }

        const mouseup = () => {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        }

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
    }

    function resetPanelState() {

    }

    return (
        <main h-screen bg-white>
            <PanerHeader/>
            <div className="flex  h[calc(100vh-128px)]">
                <section p-16 w-250>
                    <p text-18 font-700>控件库</p>
                    <ul>
                        {registerConfig.materials.map(material => (
                            <li key={material.type} draggable onDragStart={() => handleDragStart(material)}>
                                <material.preview/>
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
                    className="relative h[calc(100vh-144px)] flex-1  overflow-auto flex justify-center items-center"
                >
                    <div className="absolute right-20 top-20 flex gap-8 z-10">
                        <PreviewModal/>
                        <Button onClick={resetPanelState}>重置</Button>
                        <StepCounter/>
                    </div>
                    <div
                        onDragEnter={handleDragEnter}
                        onDragOver={e => e.preventDefault()}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onMouseDown={handleMouseDown}
                        style={wrapStyle}
                        className="bg-white relative overflow-hidden"
                    >
                        {schema.blocks.map((block, index) => <BlockItem key={index} block={block}/>)}
                        {markLine.x !== 0 && (
                            <div style={{left: markLine.x}}
                                 className="absolute top-0 bottom-0 border-1 border-l-dashed border-blue"
                            ></div>
                        )}
                        {markLine.y !== 0 && (
                            <div style={{top: markLine.y}}
                                 className="absolute left-0 right-0 border-1 border-t-dashed border-blue"
                            ></div>
                        )}
                    </div>
                </section>
                <section className="w-250 flex flex-col justify-between p-16">
                    <Setter/>
                </section>
            </div>
            <footer className="bg-white h-64 flex items-center justify-end px-72">
                <Button type="primary">保存</Button>
            </footer>
        </main>
    )
}

export default App
