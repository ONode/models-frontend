import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import CircleMenu from '@components/circle-menu';
import APIService from '@services/api/api.service';
import api from '@services/api/espa/api.service';
import styles from './styles.module.scss';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function Libraries(props) {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(false);
  const screenWidth = useWindowDimensions().width;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // console.log('screen Width = >', screenWidth);
    screenWidth > 796 ? setIsMobile(false) : setIsMobile(true);
  }, [screenWidth]);

  async function getData() {
    const models = (await api.getAllModels()) || [];
    const thumbnails = (await api.getAllThumbnails()) || [];

    const thumbnailObj = {};
    const blockedList = [];
    for (const thumbnail in thumbnails.data) {
      const thumbItem = thumbnails.data[thumbnail];
      thumbnailObj[thumbItem.image_url] = thumbItem.thumbnail_url;
      if (thumbItem.blocked) {
        blockedList.push(thumbItem.image_url);
      }
    }

    // setThumbnailList(thumbnailObj)

    const idLabel = 'Model ID';

    const result = await APIService.getMaterialVS();
    const { digitalaxMaterialV2S } = result;
    let data = {};
    // console.log('digitalaxMaterialV2S: ', digitalaxMaterialV2S)
    let noThumbnailData = [];

    if (digitalaxMaterialV2S) {
      for (const item of digitalaxMaterialV2S) {
        if (item.attributes.length <= 0) continue;
        // console.log('--- item: ', item)
        const res = await fetch(item.tokenUri);
        // console.log('--- item res: ', res)
        const rdata = await res.json();
        // console.log('--- item rdata: ', rdata)
        if (!rdata['image_url'] || !rdata[idLabel]) continue;
        const modelObj = models.find(
          (modelItem) =>
            (modelItem.modelId &&
              modelItem.modelId.toLowerCase() === rdata[idLabel].toLowerCase()) ||
            (modelItem.newModelID &&
              modelItem.newModelID.toLowerCase() === rdata[idLabel].toLowerCase())
        );
        if (!modelObj || modelObj === undefined || modelObj === '') continue;
        let modelId = modelObj.modelId;

        if (blockedList.findIndex((item) => item === rdata['image_url']) < 0) {
          const modelItem = models.find(
            (item) => item.modelId.toLowerCase() === modelId.toLowerCase()
          );
          // console.log('modelItem: ', modelItem)
          if (modelItem['newModelID'] && modelItem['newModelID'] !== undefined) {
            modelId = modelItem['newModelID'];
          }
          if (!data[modelId]) {
            data[modelId] = [];
          }
          if (data[modelId].findIndex((item) => item.image === rdata['image_url']) >= 0) {
            continue;
          }

          if (!thumbnailObj[rdata['image_url']]) {
            noThumbnailData.push({
              modelId,
              image_url: rdata['image_url'],
              thumbnail: '',
            });
          }

          data[modelId].push({
            ...item,
            name:
              rdata['attributes'] && rdata['attributes'].length > 0 && rdata['attributes'][0].value,
            image: rdata['image_url'],
            source: rdata['source_url'],
            thumbnail: thumbnailObj ? thumbnailObj[rdata['image_url']] : null,
            description: rdata['description'],
          });
          setItems({ ...data });
        }
      }

      console.log('noThumbnailData: ', JSON.stringify(noThumbnailData));
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <div style={{ marginBottom: 30 }}>
      {!isMobile ? (
        <>

        </>
      ) : (
        <>
          <div className="flex flex-col my-5 items-center opensourceheader">
            
          </div>
        </>
      )}
      {loading ? (
        <>
          <div className={styles.loadingWrapper}>
            <video autoPlay muted loop className={styles.loadingVideo}>
              <source src="/video/init-loading.mp4" type="video/mp4" />
            </video>
          </div>
        </>
      ) : (
        <>
          {!isMobile ? (
            <Grid container item xs={12}>
              {/* {filterItems().map((key, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid container item xs={4} justify="center" key={`circle-${index}`}>
                  <CircleMenu items={items[key]} keyName={key} direction={'Right'} />
                </Grid>
              ))} */}
            </Grid>
          ) : (
            <div style={{ width: 375, maxWidth: 375 }}>
              <div className="opensourcecontent">
                
                {/* {filterItems().map((key, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid container item xs={12} justify="center" key={`circle-${index}`}>
                    <CircleMenu items={items[key]} keyName={key} direction="Right" />
                  </Grid>
                ))} */}
                
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Libraries;
