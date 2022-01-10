import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Link from 'next/link'
import Button from '@components/buttons/button'
import SmallPhotoWithText from '@components/small-photo-with-text'
import { getUser, getAccount } from '@selectors/user.selectors'
import { openConnectMetamaskModal } from '@actions/modals.actions'
import accountActions from '@actions/user.actions'
import api from '@services/api/espa/api.service'
import Logo from './logo'
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

const HeaderTopLine = ({ className, buttonText }) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isCollapse, setIsCollapse] = useState(false)
  const [isModel, setIsModel] = useState(false)
  const [modelInfo, setModelInfo] = useState(null)

  const screenWidth = useWindowDimensions().width
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    screenWidth > 472 ? setIsMobile(false) : setIsMobile(true)
  }, [screenWidth])

  const checkIfModel = async (wallet) => {
    const models = await api.getModelByWallet(wallet?.toLowerCase()) || []
    if (models.length > 0) {
      setModelInfo(models[0])
      setIsModel(true)
    }
  }

  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const account = useSelector(getAccount)

  if (!user) {
    dispatch(accountActions.checkStorageAuth())
  }

  useEffect(() => {
    if (account) {
      checkIfModel(account)
    }
  }, [account])

  const handleClick = () => dispatch(openConnectMetamaskModal())
  const onIconHander = () => {
    setIsCollapse(!isCollapse)
  }

  const [isShowMenu, setIsShowMenu] = useState(false)

  const router = useRouter()
  const pathname = router.pathname
  const arrayPath = pathname.split('/')
  const isModelProfilePage = arrayPath && arrayPath.length > 1 && arrayPath[1].toLowerCase() === 'model'
  const isGlobalPage = arrayPath && arrayPath.length > 1 && arrayPath[1].toLowerCase() === 'global'
  const isAvatarPage = arrayPath && arrayPath.length > 1 && arrayPath[1].toLowerCase() === 'avatarlibraries'
  const isMintingPage = arrayPath && arrayPath.length > 1 && arrayPath[1].toLowerCase() === 'minting'
  const isOpenElementalsPage = arrayPath && arrayPath.length > 1 && arrayPath[1].toLowerCase() === 'openelementals'

  const isBlackHeader = !isGlobalPage && !isAvatarPage && !isMintingPage && !isOpenElementalsPage

  console.log('isGlobalPage: ', isGlobalPage)

  const handleProfileClick = () => {
    setIsShowMenu(false)
    Router.push('/profile')
  }
  const handleLogoutClick = () => {
    setIsShowMenu(false)
    dispatch(accountActions.logout())
  }

  const handleEditModelPageClick = () => {
    setIsShowMenu(false)
    Router.push('/edit-model-profile')
  }

  const handleViewModelPageClick = () => {
    setIsShowMenu(false)
    Router.push(`/models/${modelInfo.modelId}`)
  }

  return (
    <div className=
      {
        cn(
          className,
          styles.wrapper,
          hasScrolled ? styles.floatingNav : '',
          isBlackHeader ? '' : styles.transparentBackground
        )
      }
    >
      <div className={styles.leftBox}>
        <Logo className={isBlackHeader ? 'text-white' : 'text-black'} />
      </div>
      <div className={styles.rightBox}>
        <div className={cn(styles.links, isCollapse ? styles.expandedMenu : '')}>
          <Link href='https://fashion.digitalax.xyz'>
            <a className={cn(styles.link, isBlackHeader ? 'text-white' : 'text-black')} target='_blank'>
              Shop the Runway NFTs
            </a>
          </Link>
          <Link href='/global'>
            <a className={cn(styles.link, isBlackHeader ? 'text-white' : 'text-black')}>
              Global Models Syndicate
            </a>
          </Link>
          <Link href='/avatarlibraries'>
            <a className={cn(styles.link, isBlackHeader ? 'text-white' : 'text-black')}>Open Source Avatar Library</a>
          </Link>
          <Link href='/getdressed'>
            <a className={cn(styles.link, isBlackHeader ? 'text-white' : 'text-black')}>Staking</a>
          </Link>
          {isMobile && !user && (
            <a className={cn(styles.link, isBlackHeader ? 'text-white' : 'text-black')} onClick={() => handleClick()}>
              {buttonText}
            </a>
          )}
          <div className={styles.signBtn}>
            {user ? (
              <div className={styles.buttonWrapper}>
                <SmallPhotoWithText
                  photo={user.get('avatar') ? user.get('avatar') : './images/user-photo.svg'}
                  address={user.get('username')}
                  className={cn(styles.hashAddress, isBlackHeader ? 'text-white' : 'text-black')}
                >
                  <button className={styles.arrowBottom} onClick={() => setIsShowMenu(!isShowMenu)}>
                    <img
                      className={styles.arrowBottomImg}
                      src={`./images/icons/${isBlackHeader ? 'arrow-bottom' : 'arrow-bottom-black'}.svg`}
                      alt='arrow-bottom'
                    />
                  </button>
                </SmallPhotoWithText>
                {isShowMenu && (
                  <div className={styles.menuWrapper}>
                    <button onClick={() => handleProfileClick()} className={styles.menuButton}>
                      Profile
                    </button>
                    {
                    isModel && 
                      <button onClick={() => handleViewModelPageClick()} className={styles.menuButton}>
                        View Model Page
                      </button>
                    }
                    {
                    isModel && 
                      <button onClick={() => handleEditModelPageClick()} className={styles.menuButton}>
                        Edit Model Page
                      </button>
                    }
                    <button onClick={() => handleLogoutClick()} className={styles.menuButton}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={() => handleClick()} className={styles.signButton} background={isBlackHeader ? 'transparent' : 'black'}>
                {buttonText}
              </Button>
            )}
          </div>
          <a className={styles.collapseIcon} onClick={onIconHander}>
            <img src='/images/hamburger.png' alt='' />
          </a>
        </div>
      </div>
    </div>
  )
}

HeaderTopLine.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string,
}

HeaderTopLine.defaultProps = {
  className: '',
  buttonText: 'SIGN IN'
}

export default HeaderTopLine
