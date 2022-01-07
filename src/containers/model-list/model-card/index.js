import React, { memo } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const ModelCard = ({ item }) => {
  if (!item) {
    return null
  }

  return (
    <div className={cn(styles.wrapper)}>
      <Link href={encodeURI(`/models/${item['modelId']}`)}>
        <a>
          <img src={item['image_url']} alt={item['modelId']} className={styles.photo} />
          <div className={styles.name}>{item['modelId']}</div>
        </a>
      </Link>
    </div>
  )
}

ModelCard.propTypes = {
  item: PropTypes.object,
}

ModelCard.defaultProps = {
  item: {},
}

export default memo(ModelCard)
