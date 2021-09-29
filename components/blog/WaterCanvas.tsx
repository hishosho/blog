import { useRef, useEffect, useState, useCallback } from 'react'

interface Size {
  width: number;
  height: number;
};
interface ChildProps {
  size: Size,
  background: string,
  borderColor: string
}
const WaterCanvas = (props: ChildProps) => {
  const { 
    size,
    background,
    borderColor
  } = props
  const [step, setStep] = useState<number>(0)
  const raf = useRef<any>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // step不能放在useState里，会栈溢出，也会导致图形旋转很快。这里需要学习useState和useRef的区别
  const stepRef = useRef<any>(null)

  stepRef.current = 0
  const draw = useCallback((canvasCtx) => {
    stepRef.current = stepRef.current > 360 ? 0 : stepRef.current + 0.01
    const angle = stepRef.current + Math.PI / 360,
          increment = Math.sin(angle)
          
    canvasCtx.clearRect(0, 0, size.width, size.height)
    canvasCtx.save()
    canvasCtx.fillStyle = background
    canvasCtx.strokeStyle = borderColor
    for (let i = 0 ; i < 8; i++) {
      canvasCtx.save()
      canvasCtx.translate(size.width / 2, size.height / 2)
      canvasCtx.rotate(45 * i)
      
      canvasCtx.moveTo(0, 0)
      canvasCtx.beginPath()
      canvasCtx.ellipse(0, 0, size.width / 2, size.width / 3 + increment * i, angle * (i /2 ? 1 : -1), 0, Math.PI * 2)
      
      canvasCtx.fill()
      canvasCtx.stroke()
      canvasCtx.restore()
    }
    canvasCtx.restore()
   
    // requestAnimationFrame参数必须是函数，否则会栈溢出
    // https://stackoverflow.com/questions/24224435/maximum-call-stack-size-exceeded-with-javascript-canvas-animation/24224510
    raf.current = window.requestAnimationFrame(() => draw(canvasCtx))
  }, [background, borderColor, size])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const canvasCtx = canvas.getContext('2d')
      if (canvasCtx) {
        draw(canvasCtx)
      }
    }
    return () => {
      window.cancelAnimationFrame(raf.current)
    }
  }, [draw])
  return <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
}

export default WaterCanvas