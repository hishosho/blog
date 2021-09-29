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

const SunLogo = (prop: childProp) => {
  const {
    color,
    size,
    translate
  } = prop

  const sunRef = useRef<HTMLCanvasElement>(null)

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
    // canvasCtx.scale(0.7, 0.7)
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
      const x = i % 2 === 0 ? -size.r / 2 : size.r / 2
      const y = -size.r / 2 / 1.75
      canvasCtx.translate(x, y)
      const info = {
        sAngle: 0,
        eAngle: Math.PI * 2,
        counterclockwise: true
      }
      // 眼球
      drawCircle(canvasCtx, { ...info, x: 0, y: 0, r: 5, fillStyle: '#fff' })
      // 眼珠
      drawCircle(canvasCtx, { ...info, x: 0, y: 0, r: 2, fillStyle: '#999' })
      canvasCtx.restore()
    }

    // 嘴巴
    canvasCtx.lineWidth = size.r / 5
    canvasCtx.strokeStyle='#FFB391'
    canvasCtx.save()
    canvasCtx.beginPath()
    canvasCtx.arc(0, 0, size.r / 3, 0, Math.PI, false)
    canvasCtx.stroke()
    canvasCtx.closePath()
    canvasCtx.restore()
    
    // 光线
    canvasCtx.save()
    canvasCtx.lineWidth = size.r / 5
    canvasCtx.lineCap = 'round'
    canvasCtx.strokeStyle = color
    for (let i = 0; i < 12; i++){
      canvasCtx.beginPath()
      canvasCtx.rotate(Math.PI / 6)
      canvasCtx.moveTo(size.width / 3, 0)
      canvasCtx.lineTo(size.width / 3 + 5, 0)
      canvasCtx.stroke()
      canvasCtx.closePath()
    }
    canvasCtx.restore()
    canvasCtx.restore()
  }, [size, translate, color])


  useEffect(() => {
    if (sunRef.current) {
      const canvas = sunRef.current
      const canvasCtx = canvas.getContext('2d')
      canvasCtx && draw(canvasCtx)
    }
  
  }, [draw])
  return (
    <canvas
      ref={sunRef}
      height={size.height}
      width={size.width}
    ></canvas>
  )
}

export default SunLogo