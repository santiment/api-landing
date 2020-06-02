import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { injectIntl } from 'gatsby-plugin-intl'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import Icon from '@santiment-network/ui/Icon'
import { CardElement } from 'react-stripe-elements'
import vars from '@santiment-network/ui/variables.scss'
import TotalPrice from './TotalPrice'
import { tr, trStr } from '../../utils/translate'
import { client } from '../../apollo/client'
import visaSrc from './visa.png'
import mastercardSrc from './mastercard.png'
import styles from './CheckoutForm.module.scss'

const style = {
  base: {
    fontSize: '14px',
    color: vars.mirage,
    fontFamily: 'Rubik, sans-serif',
    '::placeholder': {
      color: vars.casper,
    },
  },
  invalid: {
    color: vars.persimmon,
  },
}

const CHECK_COUPON_QUERY = gql`
  query getCoupon($coupon: String!) {
    getCoupon(coupon: $coupon) {
      amountOff
      id
      isValid
      name
      percentOff
    }
  }
`

function useDiscout(coupon) {
  const [discount, setDiscount] = useState({})

  useEffect(() => {
    let race = false

    const timer = setTimeout(
      () =>
        coupon &&
        client
          .query({
            query: CHECK_COUPON_QUERY,
            variables: { coupon },
          })
          .then(({ data: { getCoupon } }) => race || setDiscount(getCoupon))
          .catch(() => race || setDiscount({ error: true })),
      500,
    )

    return () => {
      race = true
      clearTimeout(timer)
    }
  }, [coupon])

  return discount
}

const DiscountInput = ({ coupon, setCoupon, isValid }) => {
  return (
    <label className={cx(styles.label, styles.label_card)}>
      Discount code
      <div className={styles.discount}>
        <Input
          className={styles.input}
          placeholder='2H8vZG5P'
          name='coupon'
          value={coupon}
          onChange={({ currentTarget: { value } }) => setCoupon(value)}
        />
        {isValid && <Icon type='success-round' className={styles.valid} />}
      </div>
    </label>
  )
}

const CheckoutForm = ({ intl, stripe, plan, billing, price, currentUser }) => {
  const [visible, setVisible] = useState()
  const [coupon, setCoupon] = useState('')
  const discount = useDiscout(coupon)

  function onToggleClick() {
    setVisible(!visible)
  }

  return (
    <>
      <div className={styles.top}>
        {tr('payment.card_details')}
        <div className={styles.top__cards}>
          <img
            width='40'
            alt='visa'
            src={visaSrc}
            className={styles.top__visa}
          />
          <img width='40' alt='mastercard' src={mastercardSrc} />
        </div>
      </div>
      <div className={styles.form}>
        <label className={cx(styles.label, styles.label_card)}>
          {tr('payment.full_name')}
          <Input
            className={styles.input}
            placeholder={trStr(intl, 'billing.username')}
            required
            name='name'
          />
        </label>

        <label className={cx(styles.label, styles.label_card)}>
          {tr('billing.card_number', 'Card number')}
          <CardElement style={style} />
        </label>

        <label className={cx(styles.label, styles.label_card)}>
          {tr('payment.country')}
          <Input
            className={styles.input}
            name='address_country'
            placeholder='US'
            required
          />
        </label>
      </div>

      <div className={styles.toggle} onClick={onToggleClick}>
        {/* <Icon type={visible ? 'subtract-round' : 'plus-round-small'} /> Add{' '} */}
        {tr('payment.bill_address')}
      </div>
      {/* {visible && ( */}
      {true && (
        <div className={styles.form}>
          <label className={cx(styles.label, styles.label_card)}>
            {tr('payment.street')}
            <Input
              className={styles.input}
              placeholder='670 Glen Creek St.'
              name='address_line1'
              required
            />
          </label>
          <label className={cx(styles.label, styles.label_card)}>
            {tr('payment.city')}
            <Input
              className={styles.input}
              required
              placeholder='Seattle'
              name='address_city'
            />
          </label>
          <label className={cx(styles.label, styles.label_card)}>
            {tr('payment.state')}
            <Input
              required
              className={styles.input}
              placeholder='Washington'
              name='address_state'
            />
          </label>
        </div>
      )}
      <div className={styles.hold}>
        <Icon className={styles.hold__icon} type='question-round-small' />
        Holding 1000 SAN tokens will result in a 20% discount.{' '}
        <a
          href='https://santiment.net/about-santiment/how-to-buy-san/'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.learn}
        >
          Learn how to buy SAN.
        </a>
      </div>

      <DiscountInput
        coupon={coupon}
        setCoupon={setCoupon}
        isValid={discount.isValid}
      />
      <TotalPrice
        price={price}
        plan={plan}
        planWithBilling={`${plan} ${billing}`}
        percentOff={discount.percentOff}
        hasSanDiscount={currentUser.sanBalance >= 1000}
      />
    </>
  )
}

export default injectIntl(CheckoutForm)
