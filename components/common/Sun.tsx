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

const Sun = (prop: any) => {
  const {
    color,
    size,
    translate
  } = prop

  const sunRef = useRef<HTMLCanvasElement>(null)

  const drawCircle = (canvasCtx: CanvasRenderingContext2D, info: CircleInfo) => {
    canvasCtx.beginPath()
    canvasCtx.save()
    if (info.rotate) {
      canvasCtx.rotate(info.rotate)
    }
    canvasCtx.arc(info.x, info.y, info.r, info.sAngle, info.eAngle, info.counterclockwise)
    if (info.fillStyle) {
      canvasCtx.fillStyle = info.fillStyle
      canvasCtx.fill()
    }
    if (info.strokeStyle) {
      canvasCtx.strokeStyle = info.strokeStyle
      canvasCtx.stroke()
    }
    canvasCtx.restore()
    canvasCtx.closePath()
  }

  const draw = useCallback((canvasCtx) => {
    canvasCtx.clearRect(0, 0, size.width, size.Height)
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

    for (let i = 0; i < 2; i++) {
      const x = i % 2 === 0 ? -size.height / 3 : size.height / 3
      const y = -size.height / 1.75
      const info = {
        x,
        y: -size.height / 1.75,
        sAngle: 0,
        eAngle: Math.PI * 2,
        counterclockwise: true
      }
      drawCircle(canvasCtx, { ...info, r: 20, fillStyle: '#fff' })
      drawCircle(canvasCtx, { ...info, r: 5, fillStyle: '#999' })
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
    }
    canvasCtx.restore()
  }, [size, translate, color])

  useEffect(() => {
    if (sunRef.current) {
      const canvas = sunRef.current
      const canvasCtx = canvas.getContext('2d')
      canvasCtx && draw(canvasCtx)
    }
  }, [draw])
  return <canvas ref={sunRef} height={size.height} width={size.width} style={{backgroundColor: '#FFB391'}}></canvas>
}

export default Sun