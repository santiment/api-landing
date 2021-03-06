import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import cx from 'classnames'
import { tr } from '../../utils/translate'
import PlanRestrictBtn from './PlanRestrictBtn'
import PLANS from './prices'
import DETAILS from './details'
import styles from './PricingDetails.module.scss'

const all = [true, true, true]

export default ({
  isLoggedIn,
  billing,
  userPlan,
  plans,
  subscription,
  onDialogClose,
}) => (
  <table className={styles.table}>
    <tbody>
      <tr className={styles.headers}>
        {DETAILS.columns.map((column, y) => (
          <th className={styles.head} key={y}>
            {column ? tr(`pricing.details.${column}`) : ''}
          </th>
        ))}
      </tr>
      {DETAILS.rows.map((row, i) => (
        <React.Fragment key={i}>
          <tr>
            <td className={cx(styles.group, styles.cell)}>
              {tr(`pricing.details.${row.group.slug}`)}
            </td>
            <td className={styles.cell} />
            <td className={styles.cell} />
            <td className={styles.cell} />
          </tr>
          {row.data.map(({ name, checks, slug }) => (
            <tr key={name}>
              <td className={cx(styles.cell, styles.feature__title)}>
                {tr(`pricing.details.${slug}`)}
              </td>
              {(checks || all).map((check, y) => (
                <td key={y} className={cx(styles.cell, styles.feature__cell)}>
                  {check && (
                    <Icon
                      className={styles.feature__check}
                      type='checkmark-round'
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </React.Fragment>
      ))}

      <tr>
        <td />
        {plans
          .filter(
            ({ interval, name }) => interval === billing || name === 'FREE',
          )
          .map(({ id, name, amount }) => {
            const plan = PLANS[name]

            if(plan.notShow) {
              return null
            }

            const sameAsUserPlan = id === userPlan

            return (
              <td key={id} className={styles.link}>
                {!isLoggedIn || sameAsUserPlan ? (
                  <PlanRestrictBtn sameAsUserPlan={sameAsUserPlan} />
                ) : (
                  <plan.Component
                    title={plan.title}
                    label={plan.link}
                    //price={price}
                    price={amount}
                    planId={+id}
                    billing={billing}
                    subscription={subscription}
                    onDialogClose={onDialogClose}
                  />
                )}
              </td>
            )
          })}
      </tr>
    </tbody>
  </table>
)
