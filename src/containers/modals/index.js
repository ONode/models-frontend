import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import ModalConnectWallet from '@containers/modals/modal-connect-wallet'
import ModalConnectArkane from '@containers/modals/modal-connect-arkane'
import ModalSignup from '@containers/modals/modal-sign-up'
import ModalSuccess from '@containers/modals/modal-gen-success'
import PreviewMaterial from '@containers/modals/preview-material'
import ModalConnectMatic from './modal-connect-matic'
import ModalCC0 from '@containers/modals/modal-cc0'


const Modals = () => {
  const modals = useSelector((state) => state.modals.toJS())
  const {
    isShowModalConnectMetamask,
    isShowModalConnectArkane,
    isShowModalSignup,
    isShowModalSuccess,
    isShowPreviewMaterial,
    isShowModalConnectMatic,
    isShowModalCC0
  } = modals

  return (
    <>
      {isShowModalConnectMetamask && <ModalConnectWallet />}
      {isShowModalSignup && <ModalSignup />}
      {isShowModalSuccess && <ModalSuccess />}
      {isShowPreviewMaterial && <PreviewMaterial />}
      {isShowModalConnectMatic && <ModalConnectMatic />}
      {isShowModalConnectArkane && <ModalConnectArkane/>}
      {isShowModalCC0 && <ModalCC0 />}
    </>
  )
}

export default memo(Modals)
