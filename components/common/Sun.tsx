import { useEffect, useRef, useState, useCallback } from 'react'

interface CircleInfo {
  x: number;
  y: number;
  r: number;
  sAngle: number;
  eAngle: number;
  counterclockwise: boolean;
  fillStyle: string;
  rotate?: number;
  strokeStyle?: string;
}

interface Size {
  width: number;
  height: number;
  r: number;
}

interface Position {
  x: number;
  y: number;
}

interface childProp {
  color: string;
  size: Size;
  translate: Position;
}

const Sun = (prop: childProp) => {
  const {
    color,
    size,
    translate
  } = prop

  const sunRef = useRef<HTMLCanvasElement>(null)
  const moveTimer = useRef<any>(null)
  const [mousePosition, setMousePosition] = useState<Position>({x: 0, y: 0})

  const drawCircle = (canvasCtx: CanvasRenderingContext2D, info: CircleInfo) => {
    canvasCtx.save()
    if (info.rotate) {
      canvasCtx.rotate(info.rotate)
    }
    canvasCtx.beginPath()
    canvasCtx.arc(info.x, info.y, info.r, info.sAngle, info.eAngle, info.counterclockwise)
    if (info.fillStyle) {
      canvasCtx.fillStyle = info.fillStyle
      canvasCtx.fill()
    }
    if (info.strokeStyle) {
      canvasCtx.strokeStyle = info.strokeStyle
      canvasCtx.stroke()
    }
    canvasCtx.closePath()
    canvasCtx.restore()
  }

  const draw = useCallback((canvasCtx: CanvasRenderingContext2D) => {
    canvasCtx.clearRect(0, 0, size.width, size.height)
    
    canvasCtx.save()
    // 太阳
    canvasCtx.translate(translate.x, translate.y)
    drawCircle(canvasCtx, {
      x: 0,
      y: 0,
      r: size.r,
      sAngle: 0,
      eAngle: Math.PI * 2,
      counterclockwise: true,
      fillStyle: color
    })

    // 眼球和眼珠
    for (let i = 0; i < 2; i++) {
      canvasCtx.save()
      const x = i % 2 === 0 ? -size.height / 3 : size.height / 3
      const y = -size.height / 1.75
      canvasCtx.translate(x, y)
      const info = {
        sAngle: 0,
        eAngle: Math.PI * 2,
        counterclockwise: true
      }
      // 眼球
      drawCircle(canvasCtx, { ...info, x: 0, y: 0, r: 20, fillStyle: '#fff' })
      const mouseRelativePositionX  = mousePosition.x - translate.x - x
      const mouseRelativePositionY = mousePosition.y - translate.y - y
      const angle = Math.atan2(mouseRelativePositionY, mouseRelativePositionX)
      // 眼珠
      drawCircle(canvasCtx, { ...info, x: 15 * Math.cos(angle), y: 15 * Math.sin(angle), r: 5, fillStyle: '#999' })
      canvasCtx.restore()
    }
    
    canvasCtx.save()
    canvasCtx.lineWidth = 10
    canvasCtx.lineCap = 'round'
    canvasCtx.strokeStyle = color
    for (let i = 0; i < 12; i++){
      canvasCtx.beginPath()
      canvasCtx.rotate(Math.PI / 6)
      canvasCtx.moveTo(size.height + 40, 0)
      canvasCtx.lineTo(size.height + 80, 0)
      canvasCtx.stroke()
      canvasCtx.closePath()
    }
    canvasCtx.restore()

    canvasCtx.restore()
  }, [size, translate, color, mousePosition])

  const move = (e: any) => {
    clearTimeout(moveTimer.current)
    moveTimer.current = setTimeout(() => {
      setMousePosition({x: e.clientX, y: e.clientY})
    }, 5)
  }

  useEffect(() => {
    if (sunRef.current) {
      const canvas = sunRef.current
      const canvasCtx = canvas.getContext('2d')
      canvasCtx && draw(canvasCtx)
    }
    return () => {
      clearTimeout(moveTimer.current)
    }
  }, [draw])
  return (
    <canvas
      ref={sunRef}
      height={size.height}
      width={size.width}
      style={{backgroundColor: '#FFB391'}}
      onMouseMove={move}
    ></canvas>
  )
}

export default Sun