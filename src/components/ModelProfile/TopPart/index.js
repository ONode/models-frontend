import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

import Button from '@components/Button'
import CollectionCard from '@components/collection-card'
import OnChainFashionSubmitForm from '../OnChainFashionSubmitForm'
import PatternCircle from '@components/ModelProfile/PatternCircle'
import modelActions from '@actions/model.actions'
import styles from './styles.module.scss'

const MAX_DESCRIPTION_LENGTH = 672

const ModelProfileTopPart = (props) => {
  const { isEdit, modelInfo, materialList, marketplaceItems } = props

  const [avatarUrl, setAvatarUrl] = useState('')
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [descriptionDraft, setDescriptionDraft] = useState('')
  const [twitterDraft, setTwitterDraft] = useState('')
  const [instagramDraft, setInstagramDraft] = useState('')
  const [tiktokDraft, setTiktokDraft] = useState('')
  const [youtubeDraft, setYoutubeDraft] = useState('')
  const [linkedinDraft, setLinkedinDraft] = useState('')
  const [mirrorDraft, setMirrorDraft] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('--here')
    setAvatarUrl(modelInfo['image_url'])
  }, [modelInfo['image_url']])

  useEffect(() => {
    setTwitterDraft(modelInfo['twitter'])
    console.log('twitter: ', modelInfo['twitter'])
  }, [modelInfo['twitter']])

  useEffect(() => {
    setInstagramDraft(modelInfo['instagram'])
  }, [modelInfo['instagram']])

  useEffect(() => {
    setMirrorDraft(modelInfo['ThreadMirror'])
  }, [modelInfo['ThreadMirror']])

  useEffect(() => {
    setLinkedinDraft(modelInfo['linkedin'])
  }, [modelInfo['linkedin']])

  useEffect(() => {
    setYoutubeDraft(modelInfo['youtube'])
  }, [modelInfo['youtube']])

  useEffect(() => {
    setTiktokDraft(modelInfo['tiktok'])
  }, [modelInfo['tiktok']])

  // Mod Avatar
  const showBrowserForAvatar = () => {
    document.getElementById('avatar-upload').click()
  }

  const cancelModAvatar = () => {
    setIsEditingAvatar(false)
    setAvatarUrl(modelInfo['image_url'])
    document.getElementById('avatar-upload').value = ''
  }

  const saveModAvatar = () => {
    let files = document.getElementById('avatar-upload').files
    if (files.length === 0) {
      cancelModAvatar()
      return
    }

    dispatch(modelActions.uploadAvatar(files[0]))
    setIsEditingAvatar(false)
    document.getElementById('avatar-upload').value = ''
  }

  const onChangeAvatarFile = (e) => {
    let files = e.target.files || e.dataTransfer.files
    if (files.length === 0) {
      return
    }

    setAvatarUrl(URL.createObjectURL(files[0]))
    setIsEditingAvatar(true)
  }

  // Mod Description
  const showEditDescription = () => {
    setDescriptionDraft(modelInfo['description'])
    setIsEditingDescription(true)
  }

  const saveModDescription = () => {
    modelInfo['description'] = descriptionDraft
    dispatch(modelActions.updateProfile(modelInfo))
    setIsEditingDescription(false)
  }

  const cancelModDescription = () => {
    setIsEditingDescription(false)
  }

  const onChangeDescription = (e) => {
    setDescriptionDraft(e.target.value.substring(0, MAX_DESCRIPTION_LENGTH))
  }

  // Add more
  const addMore = () => {
    window.open('/minting', '_blank')
  }

  // Social
  const saveSocialLinks = () => {
    modelInfo['twitter'] = twitterDraft.includes('twitter.com')
      ? twitterDraft
      : `https://twitter.com/${twitterDraft}`
    modelInfo['instagram'] = instagramDraft.includes('https')
      ? instagramDraft
      : `https://${instagramDraft}`
    modelInfo['linkedin'] = linkedinDraft.includes('https')
      ? linkedinDraft
      : `https://${linkedinDraft}`
    modelInfo['youtube'] = youtubeDraft.includes('https')
      ? youtubeDraft
      : `https://${youtubeDraft}`
    modelInfo['tiktok'] = tiktokDraft.includes('https') ? tiktokDraft : `https://${tiktokDraft}`
    modelInfo['ThreadMirror'] = mirrorDraft.includes('https') ? mirrorDraft : `https://${mirrorDraft}`

    dispatch(modelActions.updateProfile(modelInfo))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.rect1}></div>
      <div className={styles.rect2}></div>
      <img className={styles.userPhoto} src={avatarUrl} />
      <input
        id="avatar-upload"
        type="file"
        onChange={onChangeAvatarFile}
        hidden
        accept=".jpg, .png, .gif"
      />
      {isEdit && !isEditingAvatar && (
        <Button
          className={[styles.modPFPButton, styles.blackGoldButton].join(' ')}
          onClick={() => showBrowserForAvatar()}
        >
          MOD PFP
        </Button>
      )}
      {isEdit && isEditingAvatar && (
        <Button
          className={[styles.modPFPButtonSave, styles.blackGoldButton].join(' ')}
          onClick={() => saveModAvatar()}
        >
          SAVE
        </Button>
      )}
      {isEdit && isEditingAvatar && (
        <Button
          className={[styles.modPFPButtonCancel, styles.blackGoldButton].join(' ')}
          onClick={() => cancelModAvatar()}
        >
          CANCEL
        </Button>
      )}
      <img className={styles.claimUsername} src="/images/model-page/claim-username.png" />
      <div className={styles.blackBack}></div>
      <div className={[styles.modelName, isEdit ? styles.editing : ''].join(' ')}>
        {modelInfo['modelId'].toUpperCase()}
        <img className={styles.arrowImg} src="/images/model-page/arrow.png" />
      </div>

      {isEdit && (
        <Button className={[styles.modNameButton, styles.blackGoldButton].join(' ')}>MOD</Button>
      )}

      {!isEdit && (
        <div className={styles.socialIcons}>
          {modelInfo['twitter'] && modelInfo['twitter'] !== '' && (
            <a
              href={
                modelInfo['twitter'].includes('https')
                  ? modelInfo['twitter']
                  : `https://${modelInfo['twitter']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/twitter.png" />
            </a>
          )}
          {modelInfo['instagram'] && modelInfo['instagram'] !== '' && (
            <a
              href={
                modelInfo['instagram'].includes('https')
                  ? modelInfo['instagram']
                  : `https://${modelInfo['instagram']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/instagram.png" />
            </a>
          )}
          {modelInfo['linkedin'] && modelInfo['linkedin'] !== '' && (
            <a
              href={
                modelInfo['linkedin'].includes('https')
                  ? modelInfo['linkedin']
                  : `https://${modelInfo['linkedin']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/linkedin.png" />
            </a>
          )}
          {modelInfo['tiktok'] && modelInfo['tiktok'] !== '' && (
            <a
              href={
                modelInfo['tiktok'].includes('https')
                  ? modelInfo['tiktok']
                  : `https://${modelInfo['tiktok']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/tiktok.png" />
            </a>
          )}
          {modelInfo['youtube'] && modelInfo['youtube'] !== '' && (
            <a
              href={
                modelInfo['youtube'].includes('https')
                  ? modelInfo['youtube']
                  : `https://${modelInfo['youtube']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/youtube.png" />
            </a>
          )}
          {modelInfo['ThreadMirror'] && modelInfo['ThreadMirror'] !== '' && (
            <a
              href={
                modelInfo['ThreadMirror'].includes('https')
                  ? modelInfo['ThreadMirror']
                  : `https://${modelInfo['ThreadMirror']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/mirror.png" />
            </a>
          )}
        </div>
      )}

      {isEdit && (
        <div className={styles.inputSocialIcons}>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/twitter.png" />
            <input
              type="text"
              value={twitterDraft}
              onChange={(e) => setTwitterDraft(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/instagram.png" />
            <input
              type="text"
              value={instagramDraft}
              onChange={(e) => setInstagramDraft(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/tiktok.png" />
            <input
              type="text"
              value={tiktokDraft}
              onChange={(e) => setTiktokDraft(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/youtube.png" />
            <input
              type="text"
              value={youtubeDraft}
              onChange={(e) => setYoutubeDraft(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/linkedin.png" />
            <input
              type="text"
              value={linkedinDraft}
              onChange={(e) => setLinkedinDraft(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/mirror.png" />
            <input
              type="text"
              value={mirrorDraft}
              onChange={(e) => setMirrorDraft(e.target.value)}
            />
          </div>
          <Button
            className={[styles.modSocialSave, styles.blackGoldButton].join(' ')}
            onClick={() => saveSocialLinks()}
          >
            SAVE
          </Button>
        </div>
      )}

      {!isEditingDescription && (
        <div className={[styles.modelDescription, isEdit ? styles.editing : ''].join(' ')}>
          {modelInfo['description'].substring(0, MAX_DESCRIPTION_LENGTH)}
        </div>
      )}
      {isEdit && isEditingDescription && (
        <textarea
          className={styles.editDescription}
          onChange={onChangeDescription}
          value={descriptionDraft}
        />
      )}
      {isEdit && !isEditingDescription && (
        <Button
          className={[styles.modDescriptionButton, styles.blackGoldButton].join(' ')}
          onClick={() => showEditDescription()}
        >
          MOD
        </Button>
      )}
      {isEdit && isEditingDescription && (
        <Button
          className={[styles.modDescriptionButtonSave, styles.blackGoldButton].join(' ')}
          onClick={() => saveModDescription()}
        >
          SAVE
        </Button>
      )}
      {isEdit && isEditingDescription && (
        <Button
          className={[styles.modDescriptionButtonCancel, styles.blackGoldButton].join(' ')}
          onClick={() => cancelModDescription()}
        >
          CANCEL
        </Button>
      )}

      {!isEdit && (
        <div className={styles.patternSection}>
          <div
            className={[
              styles.patternWrapper3,
              materialList.length <= 5 ? styles.smallPattern : '',
            ].join(' ')}
          >
            {materialList.slice(0, 6).map((item, index) => {
              return (
                <PatternCircle
                  key={index}
                  item={item}
                  index={index}
                  direction={index === 2 ? 'Left' : 'Right'}
                />
              )
            })}
          </div>

          <div className={styles.patternWrapper4}>
            {materialList.slice(7, materialList.length).map((item, index) => {
              return (
                <PatternCircle
                  key={index}
                  item={item}
                  index={index}
                  secondPart
                  direction={index % 3 === 2 ? 'Left' : 'Right'}
                />
              )
            })}
          </div>
        </div>
      )}

      <div className={styles.ownershipText}>OPEN AVATAR LIBRARY.</div>
      {isEdit && (
        <Button
          className={[styles.addMoreButton, styles.blackGoldButton].join(' ')}
          onClick={() => addMore()}
        >
          ADD MORE TO OAL
        </Button>
      )}

      {!isEdit && marketplaceItems.length > 0 && (
        <div className={styles.marketplaceSection}>
          <h1>On-Chain Looks</h1>

          <div className={styles.marketplaceItems}>
            {marketplaceItems.map((item, index) => (
              <CollectionCard
                item={item}
                key={item.animation && item.animation != '' ? item.animation : item.image}
              />
            ))}
          </div>
        </div>
      )}

      {isEdit && (
        <div className={styles.submitFormWrapper}>
          <h1>On-Chain Looks</h1>
          <OnChainFashionSubmitForm modelId={modelInfo['modelId']} />
        </div>
      )}
    </div>
  )
}

export default ModelProfileTopPart
