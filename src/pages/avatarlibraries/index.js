import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import { getAvatarElementals } from '@services/api/apiService'

import {
  getAllResultsFromQueryWithoutOwner,
  getAttribute
 } from '@helpers/thegraph.helpers'

 import {
  POLYGON_CHAINID
} from '@constants/global.constants'

import AvatarElementalCard from '@components/AvatarElementalCard'
import PixelLoader from '@components/pixel-loader'

import { reviseUrl } from '@utils/helpers'

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

const AvatarLibraries = (props) => {
  const [loading, setLoading] = useState(false)
  const screenWidth = useWindowDimensions().width
  const [isMobile, setIsMobile] = useState(false)
  const [avatarElementals, setAvatarElementals] = useState([])

  useEffect(() => {
    screenWidth > 796 ? setIsMobile(false) : setIsMobile(true)
  }, [screenWidth])

  async function getData() {
    const result = await getAllResultsFromQueryWithoutOwner(
      getAvatarElementals, 
      'avatarElementals', 
      POLYGON_CHAINID
    )
    
    console.log('avatarElementals: ', result)
    setAvatarElementals(result.filter(item => parseInt(item.id) > 100014 && parseInt(item.id) != 100021))
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getData()
  }, [])

  return (
    <div className={styles.wrapper}>
      {!isMobile ? (
        <div className={styles.content}>
          <h1>
            Open Source Avatar Library
          </h1>
        </div>
      ) : (
        <div className={styles.content}>
          <h1>
            Open Source Avatar Library
          </h1>
        </div>
      )}
      {loading ? (
        <div className={styles.loadingSpace}>
          <div className={styles.loadingWrapper}>
            <PixelLoader title={'loading...'} />
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <Grid container item xs={12} spacing={2}  >
            {
              avatarElementals.map(item => {
                return (
                  <Grid item xs={!isMobile ? 4 : 12} key={item.id}>
                    <AvatarElementalCard
                      name={item.name}
                      image={item.image}
                      minter={getAttribute(item, 'Minter')}
                      type={getAttribute(item, 'Type')}
                      gender={getAttribute(item, 'Gender')}
                      style={getAttribute(item, 'Style')}
                      element={getAttribute(item, 'Element')}
                      tokenUri={reviseUrl(item.tokenUri)}
                      sourceFileExt={getAttribute(item, 'sourceFileExt')}
                      sourceFileType={getAttribute(item, 'sourceFileType')}
                      renderedFileExt={getAttribute(item, 'renderedFileExt')}
                    />
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      )}
    </div>
  )
}

export default AvatarLibraries
