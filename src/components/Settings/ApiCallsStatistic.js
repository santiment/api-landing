import React from 'react'
import gql from 'graphql-tag'
import { Query } from "react-apollo"
import Settings from './Settings'
import styles from './ApiCallsStatistic.module.scss'

export const API_KEYS_STATS = {
  ALL: 'ALL',
  APIKEY: 'APIKEY'
}

export const API_CALLS_QUERY = gql`
    query currentUser(
        $from: DateTime!
        $to: DateTime!
        $authMethod: ApiCallAuthMethod!
    ) {
        currentUser {
            id
            apiCallsCount(from: $from, to: $to, authMethod: $authMethod)
        }
    }
`

const ApiCallsStatistic = ({type}) => {
  return (
    <Query query={API_CALLS_QUERY} variables={{
      from: 'utc_now-30d',
      to: 'utc_now',
      authMethod: type
    }}>
      {({ data: { currentUser } = {} }, loading) => {
        if (loading || !currentUser) {
          return null
        }

        const { apiCallsCount  } = currentUser

        return <ApiStatistic apiCallsCount={apiCallsCount}/>
      }}
    </Query>

  )
}

const ApiStatistic = ({apiCallsCount}) => {
  return (
    <Settings.Row>
      <div className={styles.panel}>
        <div className={styles.title}>API Usage</div>
        <div className={styles.info}>
          Count of API calls last 30 days:{' '}
          <span className={styles.count}>{apiCallsCount}</span>
        </div>
      </div>
    </Settings.Row>
  )
}

export default ApiCallsStatistic
