import { useRef, useEffect, useState } from 'react'

interface childProps {
  width: number;
  height: number;
}
const WaterCanvas = (props: any) => {
  const { 
          width,
          height
        } = props
  const canvasRef = useRef<HTMLCanvasElement>(null),
        [canvasCtx, setCanvasCtx] = useState<any>(null)
  
  let raf: any = null

  let step: number = 0

  const draw = () => {
    step = step + 0.01
    const angle = step + Math.PI / 360,
          p1 = Math.sin(angle)
          
    canvasCtx.clearRect(0, 0, width, height)
    canvasCtx.fillStyle = 'rgba(169,190,255, 0.7)'
    for (let i = 0 ; i < 8; i++) {
      canvasCtx.save()
      canvasCtx.translate(180, 180)
      canvasCtx.rotate(45 * i)
      
      canvasCtx.moveTo(0, 0)
      canvasCtx.beginPath()
      canvasCtx.ellipse(0, 0, 50, 35 + p1 * i, angle * (i /2 ? 1 : -1), 0, Math.PI * 2)
      
      canvasCtx.fill()
      // canvasCtx.stroke()
      canvasCtx.restore()
    }
   
    raf = window.requestAnimationFrame(draw)
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      setCanvasCtx(canvas.getContext('2d'))
      if (canvasCtx) {
        draw()
      }
    }
    return () => {
      window.cancelAnimationFrame(raf)
    }
  }, [width])
  return <canvas ref={canvasRef} width={width} height={height}></canvas>
}

export default WaterCanvas