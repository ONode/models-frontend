import React, { memo, useEffect, useState } from 'react'
import cn from 'classnames'
import api from '@services/api/espa/api.service'

import ModelCard from './model-card'
import styles from './styles.module.scss'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
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

const ModelList = () => {
  const [modelList, setModelList] = useState([])
  const screenWidth = useWindowDimensions().width
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    screenWidth > 410 ? setIsMobile(false) : setIsMobile(true)
  }, [screenWidth])

  async function loadData() {
    const models = await api.getAllModels() || []
    setModelList(models.filter(model => !model.organization && !model.hidden))
  }

  useEffect(() => {
    loadData()
  }, [])

  console.log('modelList: ', modelList)
  return (
    <>
      {!isMobile ? (
        <div className={cn(styles.wrapper)}>
          <h1>
            Global Models Syndicate 
          </h1>
          <div className={styles.container}>
            {modelList.map((modelItem, index) => (
              <ModelCard item={modelItem} key={`modelcard-${index}`}/>
            ))}
          </div>
        </div>
      ) : (
        <div  className={cn(styles.wrapper)}>
          <h1>
            Global Models Syndicate 
          </h1>
          <div style={{display: 'flex',flexWrap: 'wrap', flexDirection: 'row'}}>
            {modelList.map((modelItem, index) => (
              <ModelCard item={modelItem} key={`modelcard-${index}`}/>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default memo(ModelList)
