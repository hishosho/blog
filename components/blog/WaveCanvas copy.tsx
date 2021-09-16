import { useRef, useState, useEffect } from 'react'

interface childProps {
  width: number;
  height: number;
  colors: string[];
}

const WaveCanvas = (props: any) => {
  const { width,
          height,
          colors
        } = props,
        canvasRef = useRef<HTMLCanvasElement>(null),
        [ canvasCtx, setCanvasCtx ] = useState<any>(null)

  let step: number = 0,
      point1H: number = 0,
      point2H: number = height,
      flag: boolean = true,
      raf: any = null

  const draw = () => {
    step++
    const angle: number = step * Math.PI / 180,
          step1H: number = Math.sin(angle),
          step2H: number = Math.cos(angle)

    if (flag) {
      point1H = point1H + step1H
      point2H = point2H - step2H
    } else {
      point1H = point1H - step1H
      point2H = point2H + step2H
    }

    if (point1H === height) {
      flag = false
    }

    flag = point1H === 0
    
    canvasCtx.clearRect(0, 0, width, height)

    for (let i = 0; i < 4; i++) {
      canvasCtx.save()
      canvasCtx.fillStyle = colors[i]
      canvasCtx.beginPath()
      if (i === 0) {
        canvasCtx.moveTo(0, 0)
        canvasCtx.lineTo(0, 0)
      } else if (i === 1) {
        canvasCtx.moveTo(0, height / 2 + point1H / 2)
        canvasCtx.bezierCurveTo(width / 2, point1H / 2, width / 2, point2H , width, height - point1H)
      } else if (i === 2) {
        canvasCtx.moveTo(0, height / 4 + point1H / 2)
        canvasCtx.bezierCurveTo(width / 2, point1H / 4 , width / 2, point2H , width, height/2 - point1H / 2)
      } else {
        canvasCtx.moveTo(0, height / 6 + point1H / 2)
        canvasCtx.bezierCurveTo(width / 2, point1H / 6 , width / 2, point2H , width, height/4- point1H / 4)
      }
      canvasCtx.lineTo(width, 0)
      canvasCtx.lineTo(width, height)
      canvasCtx.lineTo(0, height)
      canvasCtx.closePath()
      canvasCtx.fill()
      canvasCtx.restore()
    }
    raf = window.requestAnimationFrame(draw)
  }
   
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      setCanvasCtx(canvas.getContext('2d'))
      canvasCtx && draw()
    }
    return () => {
      window.cancelAnimationFrame(raf)
    }
  }, [width])
  return <canvas ref={canvasRef} width={width} height={height}></canvas>
}

export default WaveCanvas
