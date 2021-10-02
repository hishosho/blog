import { useEffect, useCallback, useRef, useState } from 'react'
import SunLogo from '../../components/common/SunLogo'

interface AnimationEle {
  id: string;
  type: string;
  text?: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}
interface Size {
  width: number;
  height: number;
}

interface childProps {
  contentSize: Size;
  go: Function;
}

const AnimationContent = (props: childProps) => {
  const {
    contentSize,
    go
  } = props

  const raf = useRef<any>(null)
  const [animationEles] = useState<AnimationEle[]>([
    {id: 'sun_1', type: 'sun', x: 0, y: 0, vx: 1, vy: 1.5},
    {id: 'text_2', type: 'text', text: 'shosho’s site', x: 100, y: 100, vx: 2, vy: 2},
    {id: 'sun_2', type: 'sun', x: 200, y: 100, vx: 2.5, vy: 2.5}, 
    {id: 'sun_3', type: 'sun', x: 300, y: 100, vx: 3, vy: 3}, 
    {id: 'sun_4', type: 'sun', x: 400, y: 100, vx: 2.5, vy: 3.5}, 
    {id: 'sun_5', type: 'sun', x: 500, y: 100, vx: 1.8, vy: 2},
    {id: 'text_1', type: 'text', text: 'welcome!', x: 0, y: 0, vx: 2.2, vy: 3},
    {id: 'about', type: 'text', text: 'About', x: 0, y: 0, vx: 1.3, vy: 2},
    {id: 'blog', type: 'text', text: 'Blog', x: 0, y: 0, vx: 1, vy: 1.8}
  ])
  
  const run = useCallback(() => {
    if (raf.current !== void 0) {
      animationEles.map((ele) => {
        if (ele.x + ele.vx > contentSize.width || ele.x + ele.vx <=0) {
          ele.vx = -ele.vx
        }

        if (ele.y + ele.vy > contentSize.height || ele.y + ele.vy <=0) {
          ele.vy = -ele.vy
        }
        ele.x = ele.x + ele.vx
        ele.y = ele.y + ele.vy

        const element: any  = document.getElementById(ele.id)

        element.style.transform = `translate(${ele.x}px, ${ele.y}px)`

        // element.style.left = `${ele.x}px`
        // element.style.top = `${ele.y}px`
      })
      raf.current = window.requestAnimationFrame(run)
    }
  }, [contentSize, animationEles])

  useEffect(() => {
    run()
    return () => {
      window.cancelAnimationFrame(raf.current)
    }
  }, [run])

  const subContent = (item: AnimationEle) => {
    if (item.type === 'text') {
      return <div style={{width: '400px', fontSize: '40px', fontWeight: 500, color: 'blue'}}>{item.text}</div>
    } else {
      return (
        <SunLogo
          size={{ width: 200, height: 200, r: 200 / 4 }}
          translate={{ x: 200 / 2, y: 200 / 2 }}
          color="#FFE194"
        />
      )
    }
  }

  return (
    <div style={{ width: contentSize.width, height: contentSize.height }}>
      {
        animationEles.map((item, i) => {
          return (
            <div
              id={item.id}
              key={item.id}
              style={{position: 'absolute'}}
            >
              {subContent(item)}
            </div>
          )
        })
      }
    </div>
  )
}

  export default AnimationContent