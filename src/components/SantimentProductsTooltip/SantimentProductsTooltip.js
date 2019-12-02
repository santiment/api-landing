import React, { useState } from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Icon from '@santiment-network/ui/Icon'
import sanbaseLogoImg from './../../images/logos/logo-sanbase.svg'
import sheetsLogoImg from './../../images/logos/logo-sheets.svg'
import neuroLogoImg from './../../images/logos/logo-neuro.svg'
import styles from './SantimentProductsTooltip.module.scss'

const PRODUCTS = [
  {
    img: sanbaseLogoImg,
    title: 'Sanbase',
    description:
      'Behavior analysis & monitoring platform for 1000+ crypto assets',
    to: 'https://app.santiment.net',
    showLink: true,
    linkTitle: 'sanbase'
  },
  {
    img: sheetsLogoImg,
    title: 'Sheets',
    description: 'Google Spreadsheets plugin for importing Santiment data',
    to: 'https://sheets.santiment.net',
    showLink: true,
    linkTitle: 'sheets'
  },
  {
    img: neuroLogoImg,
    title: 'API',
    description: 'The most comprehensive crypto API on the market',
    to: 'https://neuro.santiment.net',
    showLink: true,
    linkTitle: 'API'
  }
]

const ProductItem = ({
                       product: { to, img, title, linkTitle, description, showLink = true },
                       className
                     }) => {
  return (
    <a className={cx(styles.wrapper, className)} href={to}>
      <div className={cx(styles.product, styles.wrapper__product)}>
        {img && <img className={styles.product__img} src={img} alt={title} />}
        <div className={styles.product__info}>
          <div className={styles.product__title}>{title}</div>
          <div className={styles.product__description}>{description}</div>

          {showLink && (
            <MakeLink
              className={cx(styles.wrapper__link)}
              to={to}
              as={'div'}
              title={'Go to ' + linkTitle}
            />
          )}
        </div>
      </div>
    </a>
  )
}


const MakeLink = ({ to, title, className, as: El = 'a' }) => (
  <El href={to} className={cx(styles.link, className)}>
    {title} <Icon className={styles.linkArrow} type='pointer-right' />
  </El>
)

const OpenTrigger = () => <Icon type='arrow-down' className={styles.arrowIcon} />
const CloseTrigger = () => <Icon type='arrow-up' className={styles.arrowIcon}/>

const SantimentProductsTooltip = ({ className, intl, children }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Tooltip
      passOpenStateAs='isActive'
      closeTimeout={150}
      position='bottom'
      align='start'
      offsetY={7}
      className={styles.tooltip}
      trigger={
        <div className={cx(className, styles.trigger)}>
          {children}
          <div className={cx(styles.arrow, isOpen && styles.opened)}>
            {isOpen ? <CloseTrigger /> : <OpenTrigger />}
          </div>
        </div>
      }
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>{intl.formatMessage({ id: 'header.products' })}</div>
          <MakeLink to='https://santiment.net' title={intl.formatMessage({ id: 'header.santiment.goto' })}/>
        </div>
        <div className={styles.products}>
          {PRODUCTS.map((item, index) => (
            <ProductItem key={index} product={item} intl={intl} />
          ))}
        </div>
      </div>
    </Tooltip>
  )
}

export default SantimentProductsTooltip
