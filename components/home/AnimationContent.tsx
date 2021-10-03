import { useEffect, useCallback, useRef, useState } from 'react'
import SunLogo from '../../components/common/SunLogo'
import Router from 'next/router'

interface AnimationEle {
  id: string;
  type: string;
  text?: string;
  path?: string;
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
}

const AnimationContent = (props: childProps) => {
  const {
    contentSize,
  } = props

  const raf = useRef<any>(null)
  const [animationEles] = useState<AnimationEle[]>([
    {id: 'sun_1', type: 'sun', x: 0, y: 0, vx: 3, vy: 1.5},
    {id: 'sun_2', type: 'sun', x: 90, y: 100, vx: 2.5, vy: 2.5}, 
    {id: 'sun_3', type: 'sun', x: 120, y: 100, vx: 3, vy: 3}, 
    {id: 'sun_4', type: 'sun', x: 300, y: 100, vx: 2.5, vy: 3.5}, 
    {id: 'sun_5', type: 'sun', x: 400, y: 100, vx: 1.8, vy: 2},
    {id: 'text_1', type: 'text', text: 'hello!', x: 200, y: 0, vx: 2.2, vy: 3},
    {id: 'about', type: 'text', text: 'About', path: '/about', x: 0, y: 100, vx: 1.3, vy: 2},
    {id: 'blog', type: 'text', text: 'Blog', path: '/blog', x: 300, y: 200, vx: 1, vy: 1.8}
  ])
  
  const run = useCallback(() => {
    if (raf.current !== void 0) {
      animationEles.map((ele) => {
        if (ele.x + ele.vx > contentSize.width - 200 || ele.x + ele.vx <=0) {
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

  const goto = (item: AnimationEle) => {
    if (item.path) {
      window.cancelAnimationFrame(raf.current)
      Router.push(`${item.path}`)
    }
  }

  const textContent = (item: AnimationEle) => {
    const style = {
      fontSize: '80px',
      fontWeight: 500,
      color: '#666',
      fontFamily: 'fantasy',
      cursor: ''
    }
    if (item.path) style.cursor = 'pointer' 
    return (
    <div
      style={{ ...style }}
      onClick={() => goto(item)}
    >
      {item.text}
    </div>
    )
  }

  const subContent = (item: AnimationEle) => {
    if (item.type === 'text') {
      return textContent(item)
    } else {
      return (
        <SunLogo
          size={{ width: 300, height: 300, r: 300 / 4 }}
          translate={{ x: 300 / 2, y: 300 / 2 }}
          color="#FFE194"
        />
      )
    }
  }

  return (
    <div
      style={{ 
        width: contentSize.width,
        height: contentSize.height, 
        margin: `0 auto;`
      }}>
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