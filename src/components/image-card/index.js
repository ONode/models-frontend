import Link from 'next/link';
import { getAccount } from '@selectors/user.selectors';
import LazyLoad from 'react-lazyload';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRarityId, reviseUrl } from '@utils/helpers';
import { getChainId } from '@selectors/global.selectors';
import Button from '@components/buttons/button';
import styles from './styles.module.scss';

const ImageCard = ({
  data,
  showDesigner = false,
  showCollectionName = false,
  showRarity = false,
  imgUrl = null,
  offerCount = null,
  reservePrice = null,
  price,
  disable = false,
  withLink = false,
  imgLink = null,
  isAuction = false,
  v1 = false,
  borderType = 'white',
}) => {
  const router = useRouter();
  const account = useSelector(getAccount);
  const chainId = useSelector(getChainId);
  const { asPath } = router;
  const dispatch = useDispatch();
  const [zoomMedia, setZoomMedia] = useState(false);
  const videoTagRef = useRef();
  const [hasAudio, setHasAudio] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [mainImageType, setMainImageType] = useState(0);

  function getAudio(video) {
    return (
      video.mozHasAudio ||
      Boolean(video.webkitAudioDecodedByteCount) ||
      Boolean(video.audioTracks && video.audioTracks.length)
    );
  }

  useEffect(() => {
    setMainImage(
      data?.garment?.animation || data?.animation || data?.garment?.image || data?.image,
    );
    if (data?.garment?.animation || data?.animation) setMainImageType(1);
    else if (data?.garment?.image || data?.image) setMainImageType(2);
  }, [data]);

  const onClickZoomOut = () => {
    setZoomMedia(true);
  };

  const onClickZoomIn = () => {
    setZoomMedia(false);
  };

  const onClickMute = () => {
    videoTagRef.current.pause();
    setVideoMuted(!videoMuted);
    videoTagRef.current.play();
  };

  useEffect(() => {
    if (mainImageType === 1 && videoTagRef.current) {
      videoTagRef.current.load();
    }
  }, [mainImageType, mainImage]);

  const renderImage = () => {
    return (
      <div className={[styles.bodyWrapper, borderType === 'white' ? styles.white : ''].join(' ')}>
        {showRarity ? (
          <div className={styles.rarity}> {data?.rarity || data?.garment?.rarity} </div>
        ) : null}
        {data ? (
          <div
            className={zoomMedia ? styles.zoomWrapper : styles.mediaWrapper}
            onClick={() => onClickZoomIn()}
          >
            {mainImageType === 1 ? (
              <LazyLoad>
                {/* <video key={data.id} autoPlay muted={!asPath.includes('product')} loop className={styles.video} */}
                <video
                  key={data.id}
                  autoPlay
                  muted={videoMuted}
                  loop
                  className={styles.video}
                  ref={videoTagRef}
                  preload={'auto'}
                  onLoadedData={() => {
                    if (!asPath.includes('product')) return;
                    // console.log('videoTagRef: ', videoTagRef.current)
                    var video = videoTagRef.current;
                    // console.log('video: ', video)
                    if (getAudio(video)) {
                      // console.log('video has audio')
                      setHasAudio(true);
                    } else {
                      setHasAudio(false);
                      // console.log(`video doesn't have audio`)
                    }
                  }}
                >
                  <source src={reviseUrl(mainImage)} type="video/mp4" />
                </video>
              </LazyLoad>
            ) : mainImageType === 2 ? (
              <img src={reviseUrl(mainImage)} className={styles.image} />
            ) : null}
            {hasAudio && zoomMedia && asPath.includes('product/') && (
              <Button
                className={styles.muteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickMute();
                }}
              >
                {videoMuted ? (
                  <img src="/images/audio-off.png" />
                ) : (
                  <img src="/images/audio-on.png" />
                )}
              </Button>
            )}
          </div>
        ) : null}
        {asPath.includes('product/') && (
          <Button className={styles.zoomButton} onClick={() => onClickZoomOut()}>
            <img src="/images/zoom_btn.png" />
          </Button>
        )}
        {hasAudio && mainImageType === 1 && (
          <Button className={styles.muteButton} onClick={() => onClickMute()}>
            {videoMuted ? <img src="/images/audio-off.png" /> : <img src="/images/audio-on.png" />}
          </Button>
        )}
        {!!reservePrice && (
          <div className={styles.reservePrice}>
            <span>{reservePrice}</span>
            <p> Reserve Price </p>
          </div>
        )}
        {imgUrl ? <img src={reviseUrl(imgUrl)} className={styles.image} /> : null}
        {!!offerCount && (
          <div className={styles.offerCount}>
            <span>{offerCount}</span> Offers
          </div>
        )}
        {!!data?.additionalSources?.length && (
          <div className={styles.additionalImages}>
            {[
              ...data?.additionalSources,
              {
                type: data?.garment?.animation || data?.animation ? 'animation' : 'image',
                url:
                  data?.garment?.animation ||
                  data?.animation ||
                  data?.garment?.image ||
                  data?.image,
              },
            ]
              .filter((item) => item.url !== mainImage)
              .map((item) => {
                if (item.type === 'image') {
                  return (
                    <img
                      src={reviseUrl(item.url)}
                      key={item.url}
                      onClick={() => {
                        setMainImage(item.url);
                        setMainImageType(2);
                      }}
                    />
                  );
                } else if (item.type === 'animation') {
                  return (
                    <video
                      muted
                      autoPlay
                      loop
                      key={item.url}
                      onClick={() => {
                        setMainImage(item.url);
                        setMainImageType(1);
                      }}
                    >
                      <source src={reviseUrl(item.url)} />
                    </video>
                  );
                }
              })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.imageCardWrapper}>
        {showCollectionName ? (
          <div className={styles.collectionName}>
            {data?.garment ? data.garment.name : data.name}
          </div>
        ) : null}
        {showDesigner ? (
          <a
            href={`https://designers.digitalax.xyz/designers/${data?.designer?.name}`}
            target="_blank"
            className={styles.designerLink}
          >
            <div className={styles.designerWrapper}>
              <img src={data?.designer?.image} className={styles.photo} />
              <div className={styles.name}>{data?.designer?.name} </div>
            </div>
          </a>
        ) : null}
        {withLink ? (
          <Link
            href={
              imgLink
                ? imgLink
                : `/product/${data?.id}/${getRarityId(data?.rarity)}/${isAuction ? 1 : 0}`
            }
          >
            <a>{renderImage()}</a>
          </Link>
        ) : (
          renderImage()
        )}
      </div>
    </>
  );
};

export default ImageCard;
