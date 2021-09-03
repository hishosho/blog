import { useState, useEffect } from 'react'
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
  useEffect(() => {
    const resize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
      const isMobile: boolean = window.innerHeight / window.innerWidth > 0.75
      const arcNum: TerminalInfo = {
        width: isMobile ? 5 : 7,
        height: isMobile ? 7 : 3,
        isMobile
      }
  
      const paddingW = window.innerWidth / arcNum.width / 2,
            paddingH = (window.innerHeight - paddingW * 2) / arcNum.height / 2

      setIsMobile(isMobile)
      
      setBgElementSize({ width: paddingW, height: paddingH })
  
      setContentSize({ width: window.innerWidth - paddingH * (arcNum.isMobile ? 4 : 2),
                       height: window.innerHeight - paddingW * ((arcNum.isMobile ? 4 : 2))
                    })
    }
    resize()
    window.addEventListener('resize', debounce(resize))

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.background}>
          <BackgroundCanvas
            className={styles.canvasBackground}
            canvasSize={screenSize}
            imgSize={bgElementSize}
          />
        </div>
        <div className={styles.wordCloud}
             style={{ 
              paddingLeft: bgElementSize.width,
              paddingRight: bgElementSize.width,
              paddingTop: bgElementSize.height,
              paddingBottom: bgElementSize.height
            }}
        >
          <WordCloudD3
            screenSize={screenSize}
            contentSize={contentSize}
            isMobile={isMobile}
          />
        </div>
      </main>
    </div>
  )
}

export default Home
