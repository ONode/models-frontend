import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { FormControl, ClickAwayListener, Popper, Tooltip, InputBase, Fade, Select, MenuItem } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Input from '@components/Input'
import { upload as UploadToPinata } from '../../utils/pinata'
import { getAccount } from '@selectors/user.selectors'
import ERC20ABI from '@constants/mint_abi.json'
import styles from './styles.module.scss'

const address = '0x9bd6e928bef1ac9e41e8c5431657d2b9a6c6fe3e'

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

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip)

function Minting(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const account = useSelector(getAccount)

  console.log('account: ', account)

  const [status, setStatus] = useState(0)

  const [creatorId, setCreatorId] = useState('')
  const [elementType, setElementType] = useState('Avatar')
  const [gender, setGender] = useState('male')
  const [itemName, setItemName] = useState('')
  const [traits, setTraits] = useState('')
  const [itemStyle, setItemStyle] = useState('Not Rigged')
  const [itemType, setItemType] = useState('Digital')

  const [description, setDescription] = useState('')
  const [renderFile, setRenderFile] = useState(null)
  const [sourceFile, setSourceFile] = useState(null)
  
  const [istooltip, setIstooltip] = React.useState(false)

  
  const handleTooltip = () => {
    setIstooltip(!istooltip)
  }
  const handleLeave = () => {
    setIstooltip(false)
  }

  const getFileExt = file => {
    if (!file) return ''

    const nameArray = file.name.split('.')
    if (nameArray && nameArray.length > 1) {
      return nameArray[nameArray.length - 1]
    }
    
    return ''
  }

  const screenWidth = useWindowDimensions().width
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    screenWidth > 472 ? setIsMobile(false) : setIsMobile(true)
  }, [screenWidth])

  const handleSourceFileChange = e => {
    const file = e.target.files[0]
    setSourceFile(file)
    console.log('file: ', file)

  }

  const handleRenderFileChange = e => {
    setRenderFile(e.target.files[0])
    console.log('file: ', e.target.files[0])
  }

  const handleContributeClick = async () => {
    if (
      creatorId === '' ||
      elementType === '' ||
      itemStyle === '' || 
      itemType === '' || 
      gender === '' ||
      traits === '' ||
      !renderFile ||
      !sourceFile ||
      description === '' ||
      itemName === ''
    ) {
      setStatus(-1)
      return
    }
    setStatus(1)
    try {
      const metaJson = {
        name: itemName,
        description: description,
        external_url: 'http://designers.digitalax.xyz/',
        attributes: [
          {
            trait_type: 'Minter',
            value: creatorId,
          },
          {
            trait_type: 'Type',
            value: itemType,
          },
          {
            trait_type: 'Unique Traits',
            value: traits,
          },
          {
            trait_type: 'SourceFileExt',
            value: getFileExt(sourceFile)
          },
          {
            trait_type: 'SourceFileType',
            value: sourceFile.type
          },
          {
            trait_type: 'RenderedFileExt',
            value: getFileExt(renderFile)
          },
          {
            trait_type: 'Gender',
            value: gender,
          },
          {
            trait_type: 'Style',
            value: itemStyle,
          },
          {
            trait_type: 'Element',
            value: elementType,
          },
        ],
      }

      const url = await UploadToPinata(metaJson, renderFile, sourceFile)
      console.log('url: ', url)
      if (!url) {
        return
      }
      const contract = new window.web3.eth.Contract(ERC20ABI, address)
      console.log('this is before mint', address)
      console.log('this is before mint account: ', account)
      let response = await contract.methods
        .createChild(url)
        .send({ from: account })

      console.log('===createChild response: ', response)
      setStatus(2)
    } catch (error) {
      console.log('===error: ', error)
      setStatus(3)
    }
  }


  const setValue = (func, value) => {
    if (!value.includes('"')) {
      func(value)
    }
  }

  return (
    <div className={styles.mintingDiv}>
      <Popper open={open} anchorEl={anchorEl} placement='right' transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <span>{text}</span>
          </Fade>
        )}
      </Popper>
      <div className={styles.mintingContainer}>
        {!isMobile ? (
          <div className='mt-10'>
            <p
              className={styles.textGoldGradient}
              style={{ fontSize: '86px' }}
            >
              Contribute to Open
            </p>
            <p
              className={styles.textGoldGradient}
              style={{ fontSize: '86px' }}
            >
              Elementals On-Chain Libraries
            </p>
          </div>
        ) : (
          <>
            <div className='mt-10 mintingheader'>
              <p
                className={styles.textGoldGradient}
                style={{ fontSize: '50px' }}
              >
                Contribute to
              </p>
              <p
                className={styles.textGoldGradient}
                style={{ fontSize: '50px' }}
              >
                Open Elemantals
              </p>
              <p
                className={styles.textGoldGradient}
                style={{ fontSize: '50px' }}
              >
                On-Chain
              </p>
              <p
                className={styles.textGoldGradient}
                style={{ fontSize: '50px' }}
              >
                Libraries
              </p>
            </div>
          </>
        )}

        <div className='mintingtext'>
          <p className='font-black minttext'>
            Enter the information in the fillout boxes below to mint your 1155 NFT and contribute to 
            our open sourced material, pattern, texture on-chain libraries. Your contribution can be 
            used in master garments by other designers, artists, creators— it is open sourced. Open 
            source doesn’t mean without monetisation. Our infrastructure is being built to eventually 
            support automated fractional royalties for any designer as they contribute to open source 
            libraries that can be leveraged in both the digital and physical dimensions. A decentralised 
            commercial model. 
          </p>
          <p className='font-black minttext mt-5'>
            Although we can’t automatically enforce in smart contract code this fractional cross-chain, 
            cross-realm royalty distribution as of yet, we still are continuing to prove out the model 
            and hope that those that use these open source prints contribute a fractional portion of the 
            sales back to the DIGITALAX, as we have done and plan to do for anyone contributing to our 
            on-chain libraries going forward. Your NFT is minted on Matic Network for 99% more energy 
            efficiency than the Ethereum or Bitcoin blockchains. Through our MultiToken bridge these 
            NFTs can be bridged back to Ethereum for additional interoperability and functionalities.  
          </p>
        </div>

        {!isMobile ? (
          <div className='flex flex-col w-full mt-12 mb-20'>
            <div className='flex justify-center'>
              <div className='w-1/3 flex flex-col mr-10'>
                <Input
                  label='Creator ID'
                  required='true'
                  description='Creator Name or pseudonym.'
                  value={creatorId}
                  onChange={(e) => setValue(setCreatorId, e.target.value)}
                />
                <Input
                  label='Avatar Name'
                  value={itemName}
                  onChange={(e) => setValue(setItemName, e.target.value)}
                />
                <FormControl variant='filled' fullWidth>
                  <div className={[styles.selectLabel, 'mt-10 font-inter font-extrabold text-black text-sm mb-2'].join(' ')}>
                    Avatar Type
                  </div>
                  <Select
                    id='avatarType'
                    className={[styles.selectClass, 'border-1 border-third bg-white h-9 text-left'].join(' ')}
                    value={itemType}
                    inputProps={{
                      classes: {
                        root: styles.rootClass,
                        icon: styles.arrowClass,
                      },
                  }}
                    label='Avatar Type'
                    onChange={(e) => setValue(setItemType, e.target.value)}
                  >
                    <MenuItem value={'Digital'}>Digital</MenuItem>
                    <MenuItem value={'Physical'}>Physical</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='w-1/3 flex flex-col mr-10'>
                <Input
                  value={elementType}
                  onChange={(e) => setValue(setElementType, e.target.value)}
                  label='Type'
                />
                <Input
                  value={traits}
                  onChange={(e) => setValue(setTraits, e.target.value)}
                  label='Unique Traits'
                  required='true'
                  description='Anything else that you want minted on chain with the contribution. Separate by commas.'
                />
                <div className='flex flex-col mt-10 w-full'>
                  <div className='flex'>
                    <span className='font-inter font-extrabold text-black text-sm mb-2'>
                      Rendered File Upload
                    </span>
                    <LightTooltip
                      title='Files accepted PNG, JPEG, MP4, AVI'
                      placement='right'
                    >
                      <span className='questionMark'>?</span>
                    </LightTooltip>
                  </div>
                  <label
                    htmlFor='renderFile'
                    className='border-2 border-third bg-white rounded-2xl py-1 px-6 max-w-max font-inter text-xs font-medium'
                  >
                    Choose File
                  </label>
                  <InputBase
                    type='file'
                    id='renderFile'
                    inputProps={{
                      accept: '.jpg, .png, .jpeg, .mp4, .avi'
                    }}
                    className='border-1 w-180 border-third bg-white h-9 w-2/3 hidden'
                    style={{ display: 'none' }}
                    onChange={handleRenderFileChange}
                  />
                  <span
                    className='font-medium font-inter text-xxs mx-16 mt-2 whitespace-nowrap'
                    style={{ color: '#868686' }}
                  >
                    {renderFile ? renderFile.name : 'No file Chosen'}
                  </span>
                </div>
              </div>
              <div className='w-1/3 flex flex-col'>
                <FormControl variant='filled' fullWidth>
                  <div className={[styles.selectLabel, 'mt-10 font-inter font-extrabold text-black text-sm mb-2'].join(' ')}>
                    Avatar Type
                  </div>
                  <Select
                    id='selectGender'
                    className={[styles.selectClass, 'border-1 border-third bg-white h-9 text-left'].join(' ')}
                    style={{color: 'black'}}
                    value={gender}
                    inputProps={{
                      classes: {
                          root: styles.rootClass,
                          icon: styles.arrowClass,
                      },
                  }}
                    label='Gender'
                    onChange={(e) => setValue(setGender, e.target.value)}
                  >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant='filled' fullWidth>
                  <div className={[styles.selectLabel, 'mt-10 font-inter font-extrabold text-black text-sm mb-2'].join(' ')}>
                    Avatar Type
                  </div>
                  <Select
                    id='itemStyle'
                    className={[styles.selectClass, 'border-1 border-third bg-white h-9 text-left'].join(' ')}
                    value={itemStyle}
                    inputProps={{
                      classes: {
                          root: styles.rootClass,
                          icon: styles.arrowClass,
                      },
                  }}
                    label='Style'
                    onChange={(e) => setValue(setItemStyle, e.target.value)}
                  >
                    <MenuItem value={'Not Rigged'}>Not Rigged</MenuItem>
                    <MenuItem value={'Rigged'}>Rigged</MenuItem>
                  </Select>
                </FormControl>
                {<div className='flex flex-col mt-10 w-full'>
                  <div className='flex'>
                    <span className='font-inter font-extrabold text-black text-sm mb-2'>
                      Source File Upload
                    </span>
                    <LightTooltip
                      title='Files accepted: ZIP, RAR'
                      placement='right'
                    >
                      <span className='questionMark'>?</span>
                    </LightTooltip>
                  </div>
                  <label
                    htmlFor='sourceFile'
                    className='border-2 border-third bg-white rounded-2xl py-1 px-6 max-w-max font-inter text-xs font-medium'
                  >
                    Choose File
                  </label>
                  <InputBase
                    type='file'
                    id='sourceFile'
                    inputProps={{
                      accept: '.zip, .rar'
                    }}
                    className='border-1 w-180 border-third bg-white h-9 w-2/3 hidden'
                    style={{ display: 'none' }}
                    onChange={handleSourceFileChange}
                  />
                  <span
                    className='font-medium font-inter text-xxs mx-16 mt-2 whitespace-nowrap'
                    style={{ color: '#868686' }}
                  >
                    {sourceFile ? sourceFile.name : 'No file Chosen'}
                  </span>
                </div>
              }
              </div>
            </div>
            <div className='w-full'>
              <div className='flex flex-col mt-16'>
                <span className='font-inter font-extrabold text-black text-sm mb-2'>
                  Description
                </span>
                <InputBase
                  value={description}
                  onChange={(e) => setValue(setDescription, e.target.value)}
                  className='text-black border-1 border-third bg-white'
                  rows={5}
                  multiline
                  style={{ paddingLeft: 12 }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className='mobileform'>
            <div className='flex justify-center'>
              <div className='w-full flex flex-col'>
                <div style={{ marginTop: 37 }}>
                  <Input
                    label='Creator ID'
                    required='true'
                    description='Creator Name or pseudonym.'
                    value={creatorId}
                    onChange={(e) => setValue(setCreatorId, e.target.value)}
                  />
                </div>

                <div style={{ marginTop: 35 }}>
                  <Input
                    label='Type'
                    value={elementType}
                    onChange={(e) => setValue(setElementType, e.target.value)}
                  />
                </div>

                <div style={{ marginTop: 35 }}>
                  <Input
                    value={itemName}
                    onChange={(e) => setValue(setItemName, e.target.value)}
                    label='Avatar Name'
                  />
                </div>
                <div style={{ marginTop: 35 }}>
                  <FormControl variant='filled' fullWidth>
                    <div
                      className={[styles.selectLabelMobile, 'font-inter font-extrabold text-black mb-2'].join(' ')}
                    >
                      Avatar Type
                    </div>
                    <Select
                      id='itemType'
                      className={[styles.selectClassMobile, 'border-1 border-third bg-white h-9 text-left'].join(' ')}
                      value={itemType}
                      inputProps={{
                        classes: {
                            root: styles.rootClass,
                            icon: styles.arrowClass,
                        },
                    }}
                      label='Avatar Type'
                      onChange={(e) => setValue(setItemType, e.target.value)}
                    >
                      <MenuItem value={'Digital'}>Digital</MenuItem>
                      <MenuItem value={'Physical'}>Physical</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div style={{ marginTop: 35 }}>
                  <Input
                    value={traits}
                    onChange={(e) => setValue(setTraits, e.target.value)}
                    label='Unique Traits'
                    required='true'
                    description='Anything else that you want minted on chain with the contribution. Separate by commas.'
                  />
                </div>

                <div style={{ marginTop: 35 }}>
                  <FormControl variant='filled' fullWidth>
                    <div
                      className={[styles.selectLabelMobile, 'font-inter font-extrabold text-black mb-2'].join(' ')}
                    >
                      Gender
                    </div>
                    <Select
                      id='selectGender'
                      className={[styles.selectClassMobile, 'border-1 border-third bg-white h-9 text-left'].join(' ')}
                      value={gender}
                      inputProps={{
                        classes: {
                          root: styles.rootClass,
                          icon: styles.arrowClass,
                        },
                    }}
                      label='Gender'
                      onChange={(e) => setValue(setGender, e.target.value)}
                    >
                      <MenuItem value={'male'}>Male</MenuItem>
                      <MenuItem value={'female'}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div style={{ marginTop: 35 }}>
                  <FormControl variant='filled' fullWidth>
                    <div
                      className={[styles.selectLabelMobile, 'font-inter font-extrabold text-black mb-2'].join(' ')}
                    >
                      Style
                    </div>
                    <Select
                      id='itemStyle'
                      className={[styles.selectClassMobile, 'border-1 border-third bg-white h-9 text-left'].join(' ')}
                      value={itemStyle}
                      inputProps={{
                        classes: {
                          root: styles.rootClass,
                          icon: styles.arrowClass,
                        },
                    }}
                      label='Style'
                      onChange={(e) => setValue(setItemStyle, e.target.value)}
                    >
                      <MenuItem value={'Not Rigged'}>Not Rigged</MenuItem>
                      <MenuItem value={'Rigged'}>Rigged</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div style={{ marginTop: 32 }}>
                  <div className='flex flex-col mt-10 w-full'>
                    <div className='flex'>
                      <span className='font-inter font-extrabold text-black mb-2' style={{fontSize: 14, lineHeight: '22px'}}>
                        Rendered File Upload
                      </span>

                      <ClickAwayListener onClickAway={handleLeave}>
                        <Tooltip
                          title='Files accepted PNG, JPG, MP4, AVI'
                          placement='right-end'
                          open={istooltip}
                          classes={{ popper: classes.mobilePopper, tooltip: classes.tooltip }}
                        >
                          <span className='questionMark' onClick={handleTooltip}>
                            ?
                          </span>
                        </Tooltip>
                      </ClickAwayListener>
                    </div>
                    <label
                      htmlFor='renderFile'
                      className='border-2 file-border bg-white rounded-2xl py-1 px-6 max-w-max font-inter font-medium'
                      style={{fontSize: 10}}
                    >
                      Choose File
                    </label>
                    <InputBase
                      type='file'
                      id='renderFile'
                      inputProps={{
                        accept: '.jpg, .png, .jpeg, .mp4, .avi'
                      }}
                      className='border-1 w-180 border-third bg-white h-9 w-2/3 hidden'
                      style={{ display: 'none' }}
                      onChange={handleRenderFileChange}
                    />
                    <span
                      className='font-medium font-inter text-xxs mx-16 mt-2 whitespace-nowrap'
                      style={{ color: '#868686', fontSize: 10 }}
                    >
                      {renderFile ? renderFile.name : 'No file Chosen'}
                    </span>
                  </div>
                </div>
                
                {<div style={{ marginTop: 32 }}>
                  <div className='flex flex-col mt-10 w-full'>
                    <div className='flex'>
                      <span className='font-inter font-extrabold text-black mb-2' style={{fontSize: 14, lineHeight: '22px'}}>
                        Source File Upload
                      </span>

                      <ClickAwayListener onClickAway={handleLeave}>
                        <Tooltip
                          title='Files accepted ZIP, RAR'
                          placement='right-end'
                          open={istooltip}
                          classes={{ popper: classes.mobilePopper, tooltip: classes.tooltip }}
                        >
                          <span className='questionMark' onClick={handleTooltip}>
                            ?
                          </span>
                        </Tooltip>
                      </ClickAwayListener>
                    </div>
                    <label
                      htmlFor='sourceFile'
                      className='border-2 file-border bg-white rounded-2xl py-1 px-6 max-w-max font-inter font-medium'
                    >
                      Choose File
                    </label>
                    <InputBase
                      type='file'
                      id='sourceFile'
                      inputProps={{
                        accept: '.rar, .zip'
                      }}
                      className='border-1 w-180 border-third bg-white h-9 w-2/3 hidden'
                      style={{ display: 'none' }}
                      onChange={handleSourceFileChange}
                    />
                    <span
                      className='font-medium font-inter text-xxs mx-16 mt-2 whitespace-nowrap'
                      style={{ color: '#868686', fontSize: 10 }}
                    >
                      {sourceFile ? sourceFile.name : 'No file Chosen'}
                    </span>
                  </div>
                </div>
                }
              </div>
            </div>
            <div className='w-full'>
              <div className='flex flex-col' style={{ marginTop: 61 }}>
                <span className='font-inter font-extrabold text-black mb-2' style={{ fontSize: 14, lineHeight: '22px', marginBottom: 9 }}>
                  Description
                </span>
                <InputBase
                  value={description}
                  onChange={(e) => setValue(setDescription, e.target.value)}
                  className='text-black border-1 border-third bg-white'
                  rows={5}
                  multiline
                  style={{ paddingLeft: 12, height: 209 }}
                />
              </div>
              <button
                onClick={handleContributeClick}
                className='text-white font-black text-base font-inter px-4 bg-black rounded-xl max-w-min'
                style={{ marginTop: 38, paddingTop: 7, paddingBottom: 8, fontSize: 15 }}
              >
                Contribute
              </button>
            </div>
          </div>
        )}
        {!isMobile && (
          <button
            onClick={handleContributeClick}
            className='font-black text-white text-base font-inter p-2 px-4 bg-black rounded-xl mt-12 max-w-min'
          >
            Contribute
          </button>
        )}

        <div>
          {status === -1 && <h2 style={{ color: 'red' }}>Please fill all fields</h2>}
          {status === 1 && <h2 style={{ color: 'white' }}>Processing</h2>}
          {status === 2 && <h2 style={{ color: 'green' }}>Success</h2>}
          {status === 3 && <h2 style={{ color: 'red' }}>Failed</h2>}
        </div>
      </div>
    </div>
  )
}
const useStyles = makeStyles({
  mobilePopper: {
    fontSize: 8,
    width: 204,
  },
  tooltip: {
    backgroundColor: 'white',
    color: '#111111',
    fontFamily: 'inter',
    lineHeight: '8px',
    width: 162,
    fontSize: 8,
    padding: '4px 8px',
    textAlign: 'center',
    borderRadius: 0,
    marginLeft: 8,
  },
})
export default Minting
