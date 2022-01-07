import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import { MODELS } from '@constants/router-constants';
import styles from './styles.module.scss';

const SmallPhotoWithText = ({
  id,
  name,
  photo,
  photoIsLink,
  address,
  className,
  addressLink,
  addressText,
  children,
}) => (
  <div className={cn(styles.modelPhotoWrapper, className)}>
    {photo && !photoIsLink && (
      <>
        <img className={styles.modelPhoto} src={photo} alt="" />
        <p className={cn(styles.modelName, styles.modelNameLink)}>
          {name}
        </p>
      </>
    )}
    {photo && photoIsLink && (
      <Link href={`${MODELS}${id}`}>
        <a className={styles.photoLinkWrapper}>
          <img
            className={cn(styles.modelPhoto, styles.modelPhotoLink)}
            src={photo}
            alt=""
          />
        </a>
      </Link>
    )}
    {id && (
      <Link href={`${MODELS}${id}`}>
        <a className={cn(styles.modelName, styles.modelNameLink)}>
          {name}
        </a>
      </Link>
    )}
    {address && (
      <p
        className={cn(styles.hashAddress, 'smallPhotoWithText__hashAddress')}
        title={address}
      >
        {address}
      </p>
    )}
    {addressLink && (
      <a
        className={styles.hashAddress}
        href={addressLink}
        target="_blank"
        rel="noreferrer"
        title={addressText}
      >
        {addressText}
      </a>
    )}
    {children}
  </div>
);

SmallPhotoWithText.propTypes = {
  className: PropTypes.string,
  photo: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  address: PropTypes.string,
  addressLink: PropTypes.string,
  addressText: PropTypes.string,
  photoIsLink: PropTypes.bool,
  children: PropTypes.any,
};

SmallPhotoWithText.defaultProps = {
  className: '',
  photo: '',
  name: '',
  id: '',
  address: '',
  addressLink: '',
  addressText: '',
  photoIsLink: false,
  children: null,
};

export default memo(SmallPhotoWithText);
