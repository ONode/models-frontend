import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  EXCLUSIVE_RARITY,
  COMMON_RARITY,
  SEMI_RARE_RARITY,
} from "@constants/global.constants";
import secondModelData from "src/data/second-models.json";

import api from "@services/api/espa/api.service";
import { getAvatarElementals } from "@services/api/apiService";

import ModelProfileTopPart from "@components/ModelProfile/TopPart";
import ModelProfileBottomPart from "@components/ModelProfile/BottomPart";

import {
  getAllResultsFromQueryWithoutOwner,
  getAttribute,
} from "@helpers/thegraph.helpers";

import { POLYGON_CHAINID } from "@constants/global.constants";

import styles from "./styles.module.scss";
import apiService from "@services/api/api.service";

const RARITIES = [COMMON_RARITY, EXCLUSIVE_RARITY, SEMI_RARE_RARITY];

const getRarityNumber = (rarity) =>
  RARITIES.findIndex((item) => item == rarity);

const ModelPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [modelInfo, setModelInfo] = useState(null);
  const [avatarElementals, setAvatarElementals] = useState([]);
  const [marketplaceItems, setMarketplaceItems] = useState([]);

  async function loadData() {
    const models = (await api.getAllModels()) || [];
    const thumbnails = await api.getAllThumbnails();

    // console.log('models: ', models)
    const model = models.find(
      (item) =>
        item.modelId.toLowerCase() === id.toLowerCase() ||
        (item.newModelID && item.newModelID.toLowerCase() === id.toLowerCase())
    );

    setModelInfo(model);
    const secondaryProducts = secondModelData.filter((data) =>
      data.model.find(
        (modelItem) =>
          modelItem.toLowerCase() === model.modelId.toLowerCase() ||
          (model.newModelID &&
            model.newModelID.toLowerCase() === modelItem.toLowerCase())
      )
    );

    // console.log('secondaryProducts: ', secondaryProducts)

    const thumbnailObj = {};
    const blockedList = [];
    for (const thumbnail in thumbnails.data) {
      const thumbItem = thumbnails.data[thumbnail];
      thumbnailObj[thumbItem.image_url] = thumbItem.thumbnail_url;
      if (thumbItem.blocked) {
        blockedList.push(thumbItem.image_url);
      }
    }

    console.log("thumbnailObj: ", thumbnailObj);

    // setThumbnailList(thumbnailObj)

    const idLabel = "Model ID";
    const { digitalaxModelCollectionGroups } =
      await apiService.getModelCollectionGroups();
    console.log({ digitalaxModelCollectionGroups });
    // console.log('digitalaxCollectionGroups: ', digitalaxCollectionGroups)
    const auctionItems = [];
    const secondaryAuctions = secondaryProducts.filter(
      (item) => item.isAuction == 1
    );
    const secondaryCollections = secondaryProducts.filter(
      (item) => item.isAuction == 0
    );
    digitalaxModelCollectionGroups.forEach((group) => {
      // console.log('-- current model: ', model)
      if (
        !(group.collections.length === 1 && group.collections[0].id === "0")
      ) {
        group.collections
          .filter((collectionItem) => {
            return (
              collectionItem?.model?.name.toLowerCase() ===
                model["modelId"].toLowerCase() ||
              (model["newModelID"] &&
                model["newModelID"] !== "" &&
                collectionItem.model.name.toLowerCase() ===
                  model["newModelID"].toLowerCase()) ||
              secondaryCollections.find(
                (secondary) =>
                  secondary.id == collectionItem.id &&
                  secondary.rarity == getRarityNumber(collectionItem.rarity)
              )
            );
          })
          .forEach((item) => {
            auctionItems.push(
              ...item.garments.map((garment) => {
                return {
                  ...garment,
                  rarity: getRarityNumber(item.rarity),
                  isAuction: 0,
                  id: item.id,
                };
              })
            );
          });
      }
    });

    setMarketplaceItems(auctionItems);
    // console.log('auctionItems: ', auctionItems)

    const result = await getAllResultsFromQueryWithoutOwner(
      getAvatarElementals,
      "avatarElementals",
      POLYGON_CHAINID
    );

    console.log("avatarElementals: ", result);
    setAvatarElementals(
      result.filter(
        (item) =>
          getAttribute(item, "Minter").toLowerCase() ===
            model.modelId.toLowerCase() && parseInt(item.id) > 100014
      )
    );
  }

  useEffect(() => {
    loadData();
  }, []);

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
    );
  }

  // console.log('modelInfo: ', modelInfo)
  // console.log('avatarElementals: ', avatarElementals)

  return (
    <div className={styles.wrapper}>
      <ModelProfileTopPart
        isEdit={false}
        modelInfo={modelInfo}
        avatarElementals={avatarElementals}
        marketplaceItems={marketplaceItems}
      />
      <ModelProfileBottomPart modelInfo={modelInfo} isEditable={false} />
    </div>
  );
};

export default ModelPage;
