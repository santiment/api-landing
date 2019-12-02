import React, { useRef } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { injectIntl, Link } from 'gatsby-plugin-intl'
import AccountBtn from '../AccountBtn/AccountBtn'
import SantimentProductsTooltip from "../SantimentProductsTooltip/SantimentProductsTooltip"
import mainLogo from './../../images/logos/main-logo.svg'
import styles from './Header.module.scss'

const Header = ({ isAccountPage, intl }) => {
  const toggle = useRef(null)

  const closeNav = () => {
    toggle.current.checked = false
  }

  return (
    <header className={styles.header}>
      <div  className={styles.container}>
        <div className={styles.left}>

          <div className={styles.product}>
            <div className={styles.products}>
              <a className={styles.logo} href='https://app.santiment.net'>
                <img src={mainLogo} alt='logo' />
              </a>
              <SantimentProductsTooltip intl={intl}>
                <div className={styles.dividerLeft}/>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM13.3818 7.91355L14.0977 7.19891L13.353 6.45343C11.5014 4.60187 8.49938 4.60187 6.64782 6.45343L3.8456 9.25566C4.66756 10.078 6.00062 10.078 6.82299 9.25566L8.13631 7.94233C8.89947 7.17917 10.0175 6.98263 10.9632 7.35228L10.4044 7.91026L10.4048 7.91067C11.2264 8.73345 12.559 8.73469 13.3818 7.91355ZM13.353 13.5463L16.1548 10.7445C15.3324 9.92254 13.9994 9.92254 13.1778 10.7445L11.8645 12.0578C11.1013 12.821 9.98334 13.0175 9.03761 12.6479L9.59641 12.0903C8.77487 11.2671 7.44222 11.2659 6.61903 12.087L5.90274 12.8017L6.6474 13.5463C8.49937 15.3979 11.5014 15.3979 13.353 13.5463Z" fill="#5275FF"/>
                </svg>
                <div className={styles.productName}>API</div>
              </SantimentProductsTooltip></div>
          </div>
        </div>
        <label htmlFor='hamburger'>
          <Icon type='hamburger' />
        </label>
        <input id='hamburger' type='checkbox' ref={toggle} />
        <nav className={styles.nav}>
          <label htmlFor='hamburger' className={styles.close}>
            <Icon type='close' />
          </label>
          <Link className={styles.link} to='/#use-cases' onClick={closeNav}>
            {intl.formatMessage({ id: 'header.use_cases' })}
          </Link>
          <Link className={styles.link} to='/#pricing' onClick={closeNav}>
            {intl.formatMessage({ id: 'header.pricing' })}
          </Link>
          <a
            className={cx(styles.link, styles.linkLast)}
            href='mailto:support@santiment.net'
            onClick={closeNav}
          >
            {intl.formatMessage({ id: 'header.support' })}
          </a>
          <div className={styles.dividerRight}/>
          <AccountBtn isAccountPage={isAccountPage} onClick={closeNav} />
        </nav>
      </div>
    </header>
  )
}
export default injectIntl(Header)
