import { useState, useEffect, useRef, useCallback } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BackgroundCanvas from '../components/home/BackgroundCanvas'
import WordCloudD3 from '../components/home/WordCloudD3'

import { debounce } from '../util/index'

interface Size {
  width: number;
  height: number;
}
interface TerminalInfo {
  width: number;
  height: number;
  isMobile: boolean;
}

const Home: NextPage = () => {
  const [screenSize, setScreenSize] = useState<Size>({width: 0, height: 0})
  const [contentSize, setContentSize] = useState<Size>({width: 0, height: 0})
  const [bgElementSize, setBgElementSize] = useState<Size>({width: 0, height: 0})
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [changeWordFlag, setChangeWordFlag] = useState<boolean>(false)
  const timer = useRef<any>(null)

  const resize = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight

    setScreenSize({ width, height })

    const isMobile: boolean = window.matchMedia('(max-width: 768px)').matches
    setIsMobile(isMobile)

    const arcNum: TerminalInfo = {
      width: isMobile ? 5 : 7,
      height: isMobile ? 7 : 3,
      isMobile
    }
    const paddingW = width / arcNum.width / 2,
          paddingH = (height - paddingW * 2) / arcNum.height / 2
    
    setBgElementSize({ width: paddingW, height: paddingH })
    setContentSize({ width: width - paddingH * (arcNum.isMobile ? 4 : 2),
                      height: height - paddingW * ((arcNum.isMobile ? 4 : 2))
                  })
  }, [])

  const updateWordCloud = useCallback(() => {
    // 出于性能原因，更新React状态的过程是异步的，可以用回调函数的方式达到回调的效果
    setChangeWordFlag((preChangeWordFlag) => !preChangeWordFlag)
    // https://github.com/facebook/react/issues/14010
    timer.current = setTimeout(updateWordCloud, 2000)
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', debounce(resize))
    updateWordCloud()

    return () => {
      window.removeEventListener('resize', resize)
      clearTimeout(timer.current)
    }
  }, [resize, updateWordCloud])

  const clearWordCloudTimer = () => {
    clearTimeout(timer.current)
  }

  const header = () => {
    return (
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    )
  }

  const backgroundContent = () => {
    return (
      <div className={styles.background}>
          <BackgroundCanvas
            className={styles.canvasBackground}
            canvasSize={screenSize}
            imgSize={bgElementSize}
          />
        </div>
    )
  }

  const wordCloudContent = () => {
    return (
      <div className={styles.wordCloud}
           style={{
              paddingLeft: bgElementSize.width,
              paddingRight: bgElementSize.width,
              paddingTop: bgElementSize.height,
              paddingBottom: bgElementSize.height
           }}
           onMouseEnter={clearWordCloudTimer}
           onMouseLeave={updateWordCloud}>
        <WordCloudD3
          screenSize={screenSize}
          contentSize={contentSize}
          isMobile={isMobile}
          changeWord={changeWordFlag}
        />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {header()}
      <main>
        {backgroundContent()}
        {wordCloudContent()}
      </main>
    </div>
  )
}

export default Home
