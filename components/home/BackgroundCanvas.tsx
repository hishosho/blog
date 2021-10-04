import { useRef, useEffect, useCallback } from 'react'

interface Size {
  width: number;
  height: number;
}
interface ChildProps {
  canvasSize: Size;
  imgSize: Size;
}
interface ArcQuantity {
  width: number;
  height: number;
}
interface Circle {
  x: number;
  y: number;
  r: number;
  angles: number;
  direction: boolean;
}

const BackgroundCanvas = (props: ChildProps) => {
  const { canvasSize, imgSize } = props
  const colors = useRef<any>(null)
  const bgTimeoutRef = useRef<any>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // 小扇形的颜色，每次渲染变换颜色顺序达到动态效果
  colors.current = ['#FCE6C9', '#FFFFCD', '#FFC0CB']

  /**
   * 每个半圆（扇形）里画三个小半圆（扇形）
   * @param x 圆形横坐标
   * @param y 圆形纵坐标
   * @param r 半径
   * @param angles 角度，绘制扇形的大小
   * @param direction 顺逆时针设置，使每个扇面向内展开
   */
  const drawR = useCallback((canvasCtx: CanvasRenderingContext2D, circle: Circle) => {
    for (let i = 3; i > 0; i--) {
      canvasCtx.save()
      canvasCtx.beginPath()
      canvasCtx.fillStyle = colors.current[i - 1]
      canvasCtx.arc(circle.x, circle.y, circle.r / 3 * i, 0, Math.PI * circle.angles, circle.direction)
      canvasCtx.fill()
      canvasCtx.restore()
    }
  }, [])

  /**
   * 绘制背景
   */
  const draw = useCallback((canvasCtx) => {
    // 重新渲染需要清空之前的绘画动作
    window.clearTimeout(bgTimeoutRef.current)

    canvasCtx.clearRect(0, 0, canvasSize.width, canvasSize.height)

    // 终端适配：根据页面宽高比确定横纵弧形展示数量
    const arcNum: ArcQuantity = {
      width: canvasSize.height / canvasSize.width > 0.75 ? 5 : 7,
      height: canvasSize.height / canvasSize.width > 0.75 ? 7 : 3
    }

    // 变换颜色
    colors.current = [colors.current[2], colors.current[0], colors.current[1]]
  
    // 横向每个弧形的半径
    const horizontalRradius: number = canvasSize.width / arcNum.width / 2
    // 绘制横向弧形
    for (let i = 0; i < arcNum.width + 1; i++) {
      const circle = {
        x: 0,
        y: 0,
        r: imgSize.width,
        angles: 1,
        direction: false
      }
      // 上下横向第一个圆弧都是四分之一圆
      if (i === 0) {
        drawR(canvasCtx, circle)
        drawR(canvasCtx, Object.assign(circle, { y: canvasSize.height, direction: true }))
        // 上下横向最后一个圆弧都是四分之一圆
      } else if (i === arcNum.width) {
        drawR(canvasCtx, Object.assign(circle, { x: canvasSize.width, angles: 0.5, direction: true }))
        drawR(canvasCtx, Object.assign(circle, { x: canvasSize.width, y: canvasSize.height, angles: 0.5, direction: true }))
        // 其余是半圆
      } else {
        drawR(canvasCtx, Object.assign(circle, { x: i * imgSize.width * 2}))
        drawR(canvasCtx, Object.assign(circle, { x: i * imgSize.width * 2, y: canvasSize.height, direction: true }))
      }
    }
    
    // 纵向每个弧形的半径
    const verticalRradius: number = (canvasSize.height - imgSize.width * 2) / arcNum.height / 2
    // 绘制纵向弧形
    for (let i = 0; i < arcNum.height; i++) {
      drawR(canvasCtx, {x: 0, y: (imgSize.width + verticalRradius) + i * 2 * verticalRradius, r: verticalRradius, angles: 2, direction: true })
      drawR(canvasCtx, {x: canvasSize.width, y: (imgSize.width + verticalRradius) + i * 2 * verticalRradius, r: verticalRradius, angles: 2, direction: false })
    }

    // 连续渲染造就动画效果
    bgTimeoutRef.current = setTimeout(() => { draw(canvasCtx) }, 200)
  }, [canvasSize, imgSize, drawR])

  useEffect(() => {
    window.clearTimeout(bgTimeoutRef.current)
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const canvasCtx = canvas.getContext('2d')
      if (canvasCtx) {
        draw(canvasCtx)
      }
    }
    return () => {
      window.clearTimeout(bgTimeoutRef.current)
    }
  }, [draw])

  
  return <canvas ref={canvasRef} height={canvasSize.height} width={canvasSize.width}></canvas>
}

export default BackgroundCanvas