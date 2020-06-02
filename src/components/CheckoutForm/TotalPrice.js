import React from 'react'
import styles from './TotalPrice.module.scss'

const formatOnlyPrice = amount => `$${parseInt(amount / 100, 10)}`

const TotalPrice = ({
  plan,
  price,
  billing,
  planWithBilling,
  percentOff,
  hasSanDiscount,
}) => {
  const resultPercentOff = percentOff || (hasSanDiscount && 20)
  const priceInt = price / 100
  const amountOff = resultPercentOff
    ? Math.floor(priceInt * (resultPercentOff / 100))
    : 0

  const discountMsg = percentOff
    ? 'Discount code'
    : hasSanDiscount && 'SAN Holder discount'

  return (
    <div className={styles.check}>
      <div className={styles.check__label}>
        {planWithBilling}
        <div>{formatOnlyPrice(price)}</div>
      </div>
      {resultPercentOff && (
        <div className={styles.check__label}>
          {discountMsg} {resultPercentOff}%
          <div className={styles.check__discount}>-${amountOff}</div>
        </div>
      )}
      <div className={styles.check__total}>
        Total due
        <div className={styles.check__price}>${priceInt - amountOff}</div>
      </div>
    </div>
  )
}

export default TotalPrice
