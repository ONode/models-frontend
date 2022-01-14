import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

function Landing(props) {
  const screenWidth = useWindowDimensions().width
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    
    screenWidth > 707 ? setIsMobile(false) : setIsMobile(true)
  }, [screenWidth])

  const onClickTopArrow = () => {
    console.log('clicked!')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleSection}>
        <h1>
          Dedicated Network For Models 
        </h1>
        <h2>
          Exploring  Breakout Looks And Rising in Prominence<br /> in Web3 Fashion And the Open Metaverse. 
        </h2>
      </div>
      <div className={styles.modelImage1}>
        <Image
          src='/images/homepage/home_model_1.png'
          width='1079'
          height='1188'
        />
      </div>
      <div className={styles.rect1}></div>
      <div className={styles.rect2}>
        <a href='/enter'>
          <div className={styles.text}>
            ENTER
          </div>
          <div className={[styles.arrowImage, 'animate-horizonbounce'].join(' ')}>
            <Image
              src='/images/homepage/right_arrow.png'
              width='321'
              height='320'
            />
          </div>
        </a>
      </div>

      <div className={styles.modelImage2}>
        <Image
          src='/images/homepage/home_model_2.png'
          width='1258'
          height='1258'
        />
      </div>
      <div className={styles.modelImage3}>
        <Image
          src='/images/homepage/home_model_3.png'
          width='352'
          height='1328'
        />
      </div>
    </div>
  )
}

export default Landing
