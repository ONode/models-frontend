import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { EXCLUSIVE_RARITY, COMMON_RARITY, SEMI_RARE_RARITY } from '@constants/global.constants'

import APIService from '@services/api/api.service'
import api from '@services/api/espa/api.service'

import ModelProfileTopPart from '@components/ModelProfile/TopPart'
import ModelProfileBottomPart from '@components/ModelProfile/BottomPart'
import Loader from '@components/loader'
import { getAccount } from '@selectors/user.selectors'

import modelActions from '@actions/model.actions'
import { getCurrentModelInfo, getIsLoading } from '@selectors/model.selectors'
import styles from './styles.module.scss'


const RARITIES = [
  COMMON_RARITY, EXCLUSIVE_RARITY, SEMI_RARE_RARITY
]

const getRarityNumber = rarity => RARITIES.findIndex(item => item == rarity)

const EditModelProfile = () => {
  const dispatch = useDispatch()
  const account = useSelector(getAccount)
  const modelInfo = useSelector(getCurrentModelInfo())
  const isLoading = useSelector(getIsLoading())

  const [materialList, setMaterialList] = useState([])
  const [marketplaceItems, setMarketplaceItems] = useState([])

  async function loadData() {
    const models = await api.getModelByWallet(account.toLowerCase()) || []
    const thumbnails = await api.getAllThumbnails()

    const model = models && models.length > 0 ? models[0] : null
    
    dispatch(modelActions.setCurrentModelInfo(model))

    if (!model) return
      
    const thumbnailObj = {}
    const blockedList = []
    for (const thumbnail in thumbnails.data) {
      const thumbItem = thumbnails.data[thumbnail]
      thumbnailObj[thumbItem.image_url] = thumbItem.thumbnail_url
      if (thumbItem.blocked) {
        blockedList.push(thumbItem.image_url)
      }
    }

    const idLabel = 'Model ID'

    const result = await APIService.getMaterialVS()
    const { digitalaxMaterialV2S } = result

    // const { digitalaxCollectionGroups } = await APIService.getCollectionGroups()

    // const auctionItems = []
    // if (model && model['modelId']) {
    //   digitalaxCollectionGroups.forEach(group => {
    //     auctionItems.push(
    //       ...group.auctions.filter(
    //         auctionItem => {
    //           return auctionItem.model.name.toLowerCase() === model['modelId'].toLowerCase()
    //         }
    //       ).map(item => {
    //         return {
    //           ...item.garment,
    //           isAuction: 1
    //         }
    //       })
    //     )
  
    //     group.collections.filter(
    //       collectionItem => {
    //         return collectionItem.model.name.toLowerCase() === model['modelId'].toLowerCase()
    //       }
    //     ).forEach(item => {
    //       auctionItems.push(
    //         ...item.garments.map(garment => { return {...garment, rarity: getRarityNumber(item.rarity), isAuction: 0, id: item.id}})
    //       )
    //     })
    //   })
    // }

    // setMarketplaceItems(auctionItems)
    // console.log('auctionItems: ', auctionItems)

    const materials = []
    // console.log('digitalaxMaterialV2S: ', digitalaxMaterialV2S)
    let noThumbnailData = []
    // console.log('model id: ', modelInfo['Model ID'])
    if (digitalaxMaterialV2S && model && model['deisngerId']) {
      for (const item of digitalaxMaterialV2S) {
        if (item.attributes.length <= 0) continue
        try {
          const res = await fetch(item.tokenUri)
          // console.log('--- item res: ', res)
          const rdata = await res.json()
          // console.log('--- item rdata: ', rdata)
          if (!rdata['image_url'] || !rdata[idLabel]) continue
          if (
            model['modelId'].toLowerCase() !== rdata[idLabel].toLowerCase()
            && (!model['newModelID'] || model['newModelID'] === '' || 
            model['newModelID'].toLowerCase() !== rdata[idLabel].toLowerCase())
          ) continue

          let modelId = rdata[idLabel]
          if (!modelId || modelId === undefined || modelId === '') continue

          if (blockedList.findIndex(item => item === rdata['image_url']) < 0) {
            if (model['newModelID'] && model['newModelID'] !== undefined) {
              modelId = model['newModelID']
            }

            // console.log('--rdata: ', rdata)
            if (materials.findIndex(item => item.image === rdata['image_url']) >= 0) continue
            materials.push({
              ...item,
              name:
                rdata['attributes'] && rdata['attributes'].length > 0 && rdata['attributes'][0].value,
              image: rdata['image_url'],
              thumbnail: thumbnailObj ? thumbnailObj[rdata['image_url']] : null,
              description: rdata['description']
            })

            setMaterialList([...materials])
          }
        } catch (exception) {
          console.log('exception: ', exception)
        }
      }
    }
  }

  useEffect(() => {
    if (!account) return
    loadData()
  }, [account])

  if (!account) {
    return (
      <div className={styles.beforeLoading}>
        <div className={styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  if (!modelInfo || Object.keys(modelInfo).length <= 0) {
    return (
      <div className={styles.beforeLoading}>
        <div className={styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  // console.log('materialList: ', materialList)

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader white size='large' className={styles.loader} />}
      <ModelProfileTopPart 
        isEdit={true}
        modelInfo={modelInfo}
        materialList={materialList}
        marketplaceItems={marketplaceItems}
      />
      <ModelProfileBottomPart 
        modelInfo={modelInfo}
        isEditable={true}
      />
    </div>
  )
}

export default EditModelProfile