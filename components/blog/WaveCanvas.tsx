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
    canvasCtx.translate(width / 2, height * 1.5)
    canvasCtx.beginPath()
    canvasCtx.save()
    canvasCtx.arc(0, 0, height, 0, Math.PI * 2, true)
    canvasCtx.fillStyle = '#f5d031'
    canvasCtx.fill()
    canvasCtx.restore()
    canvasCtx.closePath()

    canvasCtx.beginPath()
    canvasCtx.save()
    canvasCtx.arc(-height / 3, -height / 1.75, 20, 0, Math.PI * 2, true)
    canvasCtx.fillStyle = '#fff'
    canvasCtx.fill()
    canvasCtx.closePath()

    canvasCtx.beginPath()
    canvasCtx.save()
    canvasCtx.arc(height / 3, -height / 1.75, 20, 0, Math.PI * 2, true)
    canvasCtx.fillStyle = '#fff'
    canvasCtx.fill()
    canvasCtx.closePath()

    canvasCtx.save();
    canvasCtx.lineWidth = 10
    canvasCtx.lineCap = 'round'
    for (var i=0;i<12;i++){
      canvasCtx.beginPath();
      canvasCtx.rotate(Math.PI/6);
      canvasCtx.moveTo(height + 40, 0);
      canvasCtx.strokeStyle = '#f5d031'
      canvasCtx.lineTo(height + 80, 0);
      canvasCtx.stroke();
    }
    canvasCtx.restore();

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
