import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../components/modal/popup";

import { getAccount, getUser } from "@selectors/user.selectors";

import userActions from "@actions/user.actions";
import styles from "./styles.module.scss";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function Home(props) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const account = useSelector(getAccount);
  if (!user) {
    dispatch(userActions.checkStorageAuth());
  }

  const [comingModalOpen, setComingModalOpen] = useState(false);
  const [switchModalOpen, setSwitchModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [whitelisted, setWhitelisted] = useState(false);
  const screenWidth = useWindowDimensions().width;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    screenWidth > 376 ? setIsMobile(false) : setIsMobile(true);
  }, [screenWidth]);

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchWhiteListed = async () => {
      const resp = await userActions.checkWhitelisted(account);
      if (resp !== whitelisted) setWhitelisted(resp);
    };

    if (account) {
      fetchWhiteListed();
    }
  }, [account]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className="relative flex flex-col justify-center items-center md:flex md:flex-row md:justify-between md:items-end w-full mt-10">
          <div className="relative productimg mt-10 md:mt-0">
            <img src="/images/product1.png" className="w-full" alt="" />
            <a href="/global">
              <img
                src="/images/homepage/right_arrow.png"
                className={[
                  styles.arrowImage,
                  "z-50 w-28 animate-horizonbounce",
                ].join(" ")}
                alt=""
              />
            </a>
          </div>

          <div className="relative productimg mt-10 md:mt-0">
            <img
              src="/images/product2.png"
              className="w-full enterimg"
              alt=""
            />
            <a href="https://runway.digitalax.xyz">
              <img
                src="/images/homepage/right_arrow.png"
                className={[
                  styles.arrowImage,
                  "z-50 w-28 animate-horizonbounce",
                ].join(" ")}
                alt=""
              />
            </a>
          </div>
          <div className={styles.rect1}></div>
        </div>

        <div className="relative flex flex-col justify-center items-center md:flex md:flex-row md:justify-between md:items-end w-full mt-16">
          <div className={styles.rect2}></div>

          <div className="relative productimg mt-10 md:mt-0">
            <img
              src="/images/product3.png"
              className="md:w-full enterimg"
              alt=""
            />
            <a href="/openelementals">
              <img
                src="/images/homepage/right_arrow.png"
                className={[
                  styles.arrowImage,
                  "z-50 w-28 animate-horizonbounce",
                ].join(" ")}
                alt=""
              />
            </a>
          </div>

          <div className="relative productimg mt-10 md:mt-0">
            <img
              src="/images/product4.png"
              className="w-full enterimg"
              alt=""
            />
            <a href="/avatarlibraries">
              <img
                src="/images/homepage/right_arrow.png"
                className={[
                  styles.arrowImage,
                  "z-50 w-28 animate-horizonbounce",
                ].join(" ")}
                alt=""
              />
            </a>
          </div>
        </div>

        <div className="relative flex flex-col justify-center items-center md:flex md:flex-row md:justify-between md:items-end w-full mt-16">
          <div className="relative productimg mt-10 md:mt-0">
            <img src="/images/product5.png" className="w-full" alt="" />
            <a href="/minting" target="_blank">
              <img
                src="/images/homepage/right_arrow.png"
                className={[
                  styles.arrowImage,
                  "z-50 w-28 animate-horizonbounce",
                ].join(" ")}
                alt=""
              />
            </a>
          </div>

          <div className="relative productimg mt-10 md:mt-0">
            <img
              src="/images/product6.png"
              className="w-full enterimg"
              alt=""
            />
            <a href="https://realmrunway.xyz">
              <img
                src="/images/homepage/right_arrow.png"
                className={[
                  styles.arrowImage,
                  "z-50 w-28 animate-horizonbounce",
                ].join(" ")}
                alt=""
              />
            </a>
          </div>
        </div>

        <div className="relative flex flex-col justify-center items-center md:flex md:flex-row md:justify-between md:items-end w-full mt-16">
          <div className={styles.rect2}></div>

          <div className="relative productimg mt-10 md:mt-0">
            <img
              src="/images/product7.png"
              className="md:w-full enterimg"
              alt=""
            />
            <a
              href="https://soundcloud.com/modelsalamode"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/homepage/right_arrow.png"
                className={[
                  styles.arrowImage,
                  "z-50 w-28 animate-horizonbounce",
                ].join(" ")}
                alt=""
              />
            </a>
          </div>

          <div className="relative productimg mt-10 md:mt-0">
            <img
              src="/images/product8.png"
              className="w-full enterimg"
              alt=""
            />
            <a
              href="https://mirror.xyz/globalmodelssyndicate.eth"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/homepage/right_arrow.png"
                className={[
                  styles.arrowImage,
                  "z-50 w-28 animate-horizonbounce",
                ].join(" ")}
                alt=""
              />
            </a>
          </div>
        </div>

        <Modal
          open={comingModalOpen}
          handleClose={() => setComingModalOpen(false)}
        >
          <p className="text-gray-50 font-normal text-base font-inter text-center">
            Coming Soon!
          </p>
        </Modal>

        <Modal
          open={switchModalOpen}
          handleClose={() => setSwitchModalOpen(false)}
        >
          <p className="text-gray-50 font-normal text-base font-inter text-center">
            Please switch network to Matic on metamask
          </p>
        </Modal>

        <Modal open={open} handleClose={handleClose}>
          <p className="text-gray-50 font-normal text-base font-inter text-center">
            <p className="text-gray-50 font-normal text-base font-inter text-center">
              Hey! Please make sure to SIGN IN to contribute!
            </p>
            <p className="text-gray-50 font-extrabold text-base font-inter text-center mt-6">
              We are currently in BETA and whitelisting designers!
            </p>
            <p className="text-gray-50 font-normal text-base font-inter text-center mt-6">
              If you would like to join the Global Designer Network and
              contribute to our on-chain open source libraries through
              Fractional Garment Ownership then please join our discord or
              telegram and reach out!
            </p>
            <p className="text-gray-50 font-extrabold text-base font-inter text-center mt-6">
              Join us on our mission as we storm the gates of the metaverse and
              enable the gatemakers for web3 fashion and beyond!
            </p>
          </p>
        </Modal>

        <Modal open={open1} handleClose={handleClose1}>
          <p className="text-gray-50 font-normal text-base font-inter text-center">
            <p className="text-gray-50 font-normal text-base font-inter text-center">
              Hey!
            </p>
            <p className="text-gray-50 font-extrabold text-base font-inter text-center mt-6">
              We are currently in BETA and whitelisting designers!
            </p>
            <p className="text-gray-50 font-normal text-base font-inter text-center mt-6">
              If you would like to join the Global Designer Network and
              contribute to our on-chain open source libraries through
              Fractional Garment Ownership then please join our discord or
              telegram and reach out!
            </p>
            <p className="text-gray-50 font-extrabold text-base font-inter text-center mt-6">
              Join us on our mission as we storm the gates of the metaverse and
              enable the gatemakers for web3 fashion and beyond!
            </p>
          </p>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
