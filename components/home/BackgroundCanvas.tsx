import { useRef, useEffect, useState } from 'react'
interface childProps {
  canvasSize: object;
}
interface arcQuantity {
  width: number;
  height: number;
}

const BackgroundCanvas = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null),
        [ canvasCtx, setCanvasCtx ] = useState<any>(null),
        [ bgTimer, setBgTimer ] = useState<any>(null),
        { canvasSize } = props
  
  useEffect(() => {
    // 重新渲染需要清空之前的绘画动作
    clearTimeout(bgTimer)
    // 小扇形的颜色，每次渲染变换颜色顺序达到动态效果
    let colors: string[] = ['#7F7FD5', '#86A8E7', '#91EAE4']
    
    /**
     * 每个半圆（扇形）里画三个小半圆（扇形）
     * @param x 圆形横坐标
     * @param y 圆形纵坐标
     * @param r 半径
     * @param angles 角度，绘制扇形的大小
     * @param direction 顺逆时针设置，使每个扇面向内展开
     */
    const drawR = (x: number, y: number, r: number, angles: number, direction: boolean) => {
      for (let i = 3; i > 0; i--) {
        canvasCtx.save()
        canvasCtx.beginPath()
        canvasCtx.fillStyle = colors[i - 1]
        canvasCtx.arc(x, y, r / 3 * i, 0, Math.PI * angles, direction)
        canvasCtx.fill()
        canvasCtx.restore()
      }
    }
    /**
     * 绘制背景
     */
    const draw = () => {
      // 终端适配：根据页面宽高比确定横纵弧形展示数量
      const arcNum: arcQuantity = {
        width: canvasSize.height / canvasSize.width > 0.75 ? 5 : 7,
        height: canvasSize.height / canvasSize.width > 0.75 ? 7 : 3
      }

      // 变换颜色
      colors = [colors[2], colors[0], colors[1]]
    
      // 横向每个弧形的半径
      const horizontalRradius: number = canvasSize.width / arcNum.width / 2
      // 绘制横向弧形
      for (let i = 0; i < arcNum.width + 1; i++) {
        // 上下横向第一个圆弧都是四分之一圆
        if (i === 0) {
          drawR(0, 0, horizontalRradius, 1, false)
          drawR(0, canvasSize.height, horizontalRradius, 1, true)
          // 上下横向最后一个圆弧都是四分之一圆
        } else if (i === arcNum.width) {
          drawR(canvasSize.width, 0, horizontalRradius, 0.5, true)
          drawR(canvasSize.width, canvasSize.height, horizontalRradius, 0.5, true)
          // 其余是半圆
        } else {
          drawR(i * horizontalRradius * 2, 0, horizontalRradius, 1, false)
          drawR(i * horizontalRradius * 2, canvasSize.height, horizontalRradius, 1, true)
        }
      }
      
      // 纵向每个弧形的半径
      const verticalRradius: number = (canvasSize.height - horizontalRradius * 2) / arcNum.height / 2
      // 绘制纵向弧形
      for (let i = 0; i < arcNum.height; i++) {
        drawR(0, (horizontalRradius + verticalRradius) + i * 2 * verticalRradius, verticalRradius, 2, true)
        drawR(canvasSize.width, (horizontalRradius + verticalRradius) + i * 2 * verticalRradius, verticalRradius, 2, false)
      }

      // 连续渲染造就动画效果
      setBgTimer(setTimeout(() => { draw() }, 200))
    }
    if (canvasRef.current) {
      const canvas = canvasRef.current
      setCanvasCtx(canvas.getContext('2d'))
      if (canvasCtx) {
        draw()
      }
    }
  }, [canvasSize])

  

  return <canvas ref={canvasRef} height={canvasSize.height} width={canvasSize.width}></canvas>
}

export default BackgroundCanvas