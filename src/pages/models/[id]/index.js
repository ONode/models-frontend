import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { EXCLUSIVE_RARITY, COMMON_RARITY, SEMI_RARE_RARITY } from '@constants/global.constants'
import secondModelData from 'src/data/second-models.json'

import APIService from '@services/api/api.service'
import api from '@services/api/espa/api.service'

import ModelProfileTopPart from '@components/ModelProfile/TopPart'
import ModelProfileBottomPart from '@components/ModelProfile/BottomPart'

import styles from './styles.module.scss'

const RARITIES = [COMMON_RARITY, EXCLUSIVE_RARITY, SEMI_RARE_RARITY]

const getRarityNumber = (rarity) => RARITIES.findIndex((item) => item == rarity)

const ModelPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [modelInfo, setModelInfo] = useState(null)
  const [materialList, setMaterialList] = useState([])
  const [marketplaceItems, setMarketplaceItems] = useState([])

  async function loadData() {
    const models = (await api.getAllModels()) || []
    const thumbnails = await api.getAllThumbnails()

    // console.log('models: ', models)
    const model = models.find(
      (item) =>
        item.modelId.toLowerCase() === id.toLowerCase() ||
        (item.newModelID && item.newModelID.toLowerCase() === id.toLowerCase())
    )

    setModelInfo(model)
    const secondaryProducts = secondModelData.filter(
      data => data.model.find(
        modelItem => modelItem.toLowerCase() === model.modelId.toLowerCase() || 
        (model.newModelID && model.newModelID.toLowerCase() === modelItem.toLowerCase())
      )
    )

    // console.log('secondaryProducts: ', secondaryProducts)

    const thumbnailObj = {}
    const blockedList = []
    for (const thumbnail in thumbnails.data) {
      const thumbItem = thumbnails.data[thumbnail]
      thumbnailObj[thumbItem.image_url] = thumbItem.thumbnail_url
      if (thumbItem.blocked) {
        blockedList.push(thumbItem.image_url)
      }
    }

    console.log('thumbnailObj: ', thumbnailObj)

    // setThumbnailList(thumbnailObj)

    const idLabel = 'Model ID'

    const result = await APIService.getMaterialVS()
    const { digitalaxMaterialV2S } = result

    const { digitalaxCollectionGroups } = await APIService.getCollectionGroups()
    // console.log('digitalaxCollectionGroups: ', digitalaxCollectionGroups)
    const auctionItems = []
    const secondaryAuctions = secondaryProducts.filter(item => item.isAuction == 1)
    const secondaryCollections = secondaryProducts.filter(item => item.isAuction == 0)
    digitalaxCollectionGroups.forEach((group) => {
      if (!(group.auctions.length === 1 && group.auctions[0].id === '0')) {
        auctionItems.push(
          ...group.auctions
            .filter((auctionItem) => {
              return (
                auctionItem.model.name.toLowerCase() === model['modelId'].toLowerCase() ||
                secondaryAuctions.find(secondary => secondary.id == auctionItem.id)
              )
            })
            .map((item) => {
              // console.log('item: ', item)
              return {
                ...item.garment,
                isAuction: 1,
              }
            })
        )
      }
      // console.log('-- current model: ', model)
      if (!(group.collections.length === 1 && group.collections[0].id === '0')) {
        group.collections
          .filter((collectionItem) => {
          //   console.log(`model: ${collectionItem.model.name.toLowerCase()},current: ${model['newModelID'].toLowerCase()}, check: ${
          //     collectionItem.model.name.toLowerCase() == model['newModelID'].toLowerCase()
          // } `)
            return (
              collectionItem.model.name.toLowerCase() === model['modelId'].toLowerCase() ||
              (
                model['newModelID'] && model['newModelID'] !== '' 
                && collectionItem.model.name.toLowerCase() === model['newModelID'].toLowerCase()
              ) ||
              secondaryCollections.find(
                secondary => 
                  secondary.id == collectionItem.id && secondary.rarity == getRarityNumber(collectionItem.rarity)
              )
            )
          })
          .forEach((item) => {
            auctionItems.push(
              ...item.garments.map((garment) => {
                return {
                  ...garment,
                  rarity: getRarityNumber(item.rarity),
                  isAuction: 0,
                  id: item.id,
                }
              })
            )
          })
      }
    })

    setMarketplaceItems(auctionItems)
    console.log('auctionItems: ', auctionItems)

    const materials = []
    console.log('digitalaxMaterialV2S: ', digitalaxMaterialV2S)
    let noThumbnailData = []
    // console.log('model id: ', model)
    if (digitalaxMaterialV2S) {
      for (const item of digitalaxMaterialV2S) {
        if (item.attributes.length <= 0) continue
        try {
          let imageUrl = null
          let modelId = null

          imageUrl = item.image == '' ? null : item.image
          modelId = item.name == '' ? null : item.name

          if (!imageUrl || !modelId) {
            const res = await fetch(item.tokenUri)
            // console.log('--- item res: ', res)
            const rdata = await res.json()
            // console.log('--- item rdata: ', rdata)

            if (!rdata['image_url'] || !rdata[idLabel]) continue
            imageUrl = rdata['image_url']
            modelId = rdata[idLabel]
          }
          
          if (
            model['modelId'].toLowerCase() !== modelId.toLowerCase() &&
            (!model['newModelID'] ||
              model['newModelID'] === '' ||
              model['newModelID'].toLowerCase() !== modelId.toLowerCase())
          )
            continue
          
          if (!modelId || modelId === undefined || modelId === '') continue

          if (blockedList.findIndex((item) => item === imageUrl) < 0) {
            if (model['newModelID'] && model['newModelID'] !== undefined) {
              modelId = model['newModelID']
            }

            // console.log('--rdata: ', rdata)
            if (materials.findIndex((item) => item.image === imageUrl) >= 0) continue
            materials.push({
              ...item,
              name:
                item['attributes'] &&
                item['attributes'].length > 0 &&
                item['attributes'][0].value,
              image: imageUrl,
              thumbnail: thumbnailObj ? thumbnailObj[imageUrl] : null,
              description: item['description'],
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
    loadData()
  }, [])

  if (!modelInfo) {
    return (
      <div className={styles.beforeLoading}>
        <div className={styles.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  // console.log('modelInfo: ', modelInfo)
  // console.log('materialList: ', materialList)

  return (
    <div className={styles.wrapper}>
      <ModelProfileTopPart
        isEdit={false}
        modelInfo={modelInfo}
        materialList={materialList}
        marketplaceItems={marketplaceItems}
      />
      <ModelProfileBottomPart modelInfo={modelInfo} isEditable={false} />
    </div>
  )
}

export default ModelPage
