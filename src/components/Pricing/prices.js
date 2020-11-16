import React from 'react'
import Button from '@santiment-network/ui/Button'
import PaymentDialog from '../PaymentDialog/PaymentDialog'
import ChangePlanDialog from '../ChangePlanDialog/ChangePlanDialog'
import PipedriveDialogBtn from '../Pipedrive/Pipedrive'
import { tr, trStr } from '../../utils/translate'
import styles from './index.module.scss'

const PlanActionDialog = props =>
  props.subscription ? (
    <ChangePlanDialog {...props} />
  ) : (
    <PaymentDialog {...props} />
  )

export default {
  FREE: {
    discount: 'price.bill_discount.free',
    link: 'Upgrade now',
    Component: () => (
      <Button accent='blue' border fluid className={styles.link} disabled>
        {tr('cta.default_plan')}
      </Button>
    ),
    features: [
      'HDA',
      intl => `1k ${trStr(intl, 'plan.feature.AC.month')}`,
      'metrics',
    ],
    notShow: true
  },
  ESSENTIAL: {
    link: 'Upgrade now',
    Component: PlanActionDialog,
    features: [
      'HDA',
      intl => `300k ${trStr(intl, 'plan.feature.AC.month')}`,
      'metrics',
    ],
  },
  PRO: {
    isPopular: true,
    Component: PlanActionDialog,
    link: 'Upgrade now',
    features: [
      'HDA',
      intl => `600k ${trStr(intl, 'plan.feature.AC.month')}`,
      'metrics',
    ],
  },
  PREMIUM: {
    desc: '',
    Component: PlanActionDialog,
    link: 'Upgrade now',
    features: [
      'HDA',
      intl => (
        <>
          180 {trStr(intl, 'plan.feature.AC')}
          <br />
          500k {trStr(intl, 'plan.feature.AC.month')}
        </>
      ),
      <>
        {tr('plan.feature.AM')} <span className={styles.ast}>*</span>
      </>,
      tr('plan.feature.NA'),
    ],
  },
  CUSTOM: {
    discount: 'price.bill_discount.custom',
    link: 'cta.contact',
    Component: props => (
      <PipedriveDialogBtn
        {...props}
        title='Enterprise plan Pipedrive form'
        src='https://pipedrivewebforms.com/form/0527db4d781f7c4c0760b7bc7a58549c4144829'
      />
    ),
    features: [
      'HDA',
      intl => `${trStr(intl, 'plan.custom.feature.CDCR.top')}
        ${trStr(intl, 'plan.custom.feature.CDCR.bottom')}`,
      'metrics',
    ],
  },
}
