import {Button} from "antd";
import imgUrl from "../assets/print.png";

export const Print = () => {
    const printLabel = () => {
        window.print()
    }
    const closeTheWindow = () => {
        window.close()
    }
    return (
        <main className="h-screen w-screen pt-50 flex flex-col items-center">
            <img src={imgUrl} alt=""/>
            <p className="text-#7dc1fd">请使用Chrome浏览器，以获得最佳打印效果</p>
            <div className="mt-16 flex gap-8">
                <Button type="primary" onClick={printLabel}>打印</Button>
                <Button onClick={closeTheWindow}>关闭</Button>
            </div>
        </main>
    )
}
