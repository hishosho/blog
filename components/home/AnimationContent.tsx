import { useEffect, useCallback, useRef, useState } from 'react'
import SunLogo from '../../components/common/SunLogo'
import Router from 'next/router'
import styles from './Animation.module.css'

interface AnimationEle {
  id: string;
  type: string;
  text?: string;
  path?: string;
  padding?: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}
interface Size {
  width: number;
  height: number;
}

interface ChildProps {
  contentSize: Size;
  isMobile: boolean;
}

const AnimationContent = (props: ChildProps) => {
  const {
    isMobile,
    contentSize,
  } = props

  const raf = useRef<any>(null)
  const [animationEles] = useState<AnimationEle[]>([
    {id: 'sun_1', type: 'sun', x: 0, y: 0, vx: -3, vy: -1.5},
    {id: 'sun_2', type: 'sun', x: 90, y: 100, vx: 2.5, vy: 2.5}, 
    {id: 'sun_3', type: 'sun', x: 120, y: 100, vx: -1, vy: -3}, 
    {id: 'sun_4', type: 'sun', x: 100, y: 100, vx: 3, vy: 4}, 
    {id: 'sun_5', type: 'sun', x: 100, y: 100, vx: -1.8, vy: -2},
    {id: 'text_1', type: 'text', text: 'welcome!', x: 0, y: 0, vx: 2.2, vy: 3},
    {id: 'text_2', type: 'text', text: `shosho's site!`, x: 0, y: 200, vx: 2.2, vy: 3},
    {id: 'about', type: 'text', text: 'About', path: '/about', x: 0, y: 100, vx: -0.5, vy: -0.5},
    {id: 'blog', type: 'text', text: 'Blog', path: '/blog', x: 0, y: 200, vx: 0.5, vy: 0.5}
  ])

  const run = useCallback(() => {
    if (raf.current !== void 0) {
      animationEles.map((ele) => {
        const element: any  = document.getElementById(ele.id)
        if (ele.x + ele.vx > contentSize.width - element.offsetWidth || ele.x + ele.vx <=0) {
          ele.vx = -ele.vx
        }

        if (ele.y + ele.vy > contentSize.height || ele.y + ele.vy <=0) {
          ele.vy = -ele.vy
        }
        ele.x = ele.x + ele.vx
        ele.y = ele.y + ele.vy
        
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
    const baseFontSize = Math.round(contentSize.width / (isMobile ? 10 : 20))
    const style = {
      fontSize: `${baseFontSize}px`,
      fontWeight: 500,
      color: '#999',
      fontFamily: 'fantasy',
      cursor: '',
      textShadow: '#fff 3px 0 0, #fff 0 3px 0, #fff -3px 0 0, #fff 0 -3px 0'
    }
    if (item.path) {
      style.cursor = 'pointer'
      style.textShadow = '#fff 5px 0 0, #fff 0 5px 0, #fff -5px 0 0, #fff 0 -5px 0'
    }
    return (
    <div
      style={{ ...style }}
      onClick={() => goto(item)}
      className={item.path ? styles.nav : ''}
    >
      {item.text}
    </div>
    )
  }

  const subContent = (item: AnimationEle) => {
    const baseSize = Math.round(contentSize.width / (isMobile ? 5 : 10))
    if (item.type === 'text') {
      return textContent(item)
    } else {
      return (
        <SunLogo
          size={{ width: baseSize, height: baseSize, r: baseSize / 4 }}
          translate={{ x: baseSize / 2, y: baseSize / 2 }}
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
        margin: `0 auto`,
        position: 'relative'
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