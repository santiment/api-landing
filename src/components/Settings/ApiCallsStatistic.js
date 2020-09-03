import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { Query } from "react-apollo"
import Settings from './Settings'
import { startOfMonth } from "../../utils/dates"
import styles from './ApiCallsStatistic.module.scss'

export const API_CALLS_QUERY = gql`
  query currentUser($from: DateTime!, $to: DateTime!) {
    currentUser {
      id
      apikeys
      apiCallsHistory(from: $from, to: $to, interval: "1d") {
        datetime
        apiCallsCount
      }
    }
  }
`

const NOW = new Date()
const MONTH_START = startOfMonth(NOW)

const ApiCallsStatistic = () => {
  return (
    <Query query={API_CALLS_QUERY} variables={{
      from: MONTH_START,
      to: NOW
    }}>
      {({ data: { currentUser } = {} }, loading) => {
        if (loading || !currentUser) {
          return null
        }

        const { apikeys = [], apiCallsHistory = []  } = currentUser

        if(apikeys.length === 0){
          return  null
        }

        return <ApiStatistic apiCallsHistory={apiCallsHistory}/>
      }}
    </Query>

  )
}

const ApiStatistic = ({apiCallsHistory}) => {
  const count = useMemo(
    () => {
      return apiCallsHistory.reduce((acc, item) => item.apiCallsCount + acc, 0)
    },
    [apiCallsHistory]
  )

  return (
    <Settings.Row>
      <div className={styles.panel}>
        <div className={styles.title}>API Usage</div>
        <div className={styles.info}>
          Count of API calls this month:{' '}
          <span className={styles.count}>{count}</span>
        </div>
      </div>
    </Settings.Row>
  )
}

export default ApiCallsStatistic
