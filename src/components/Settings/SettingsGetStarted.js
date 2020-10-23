import React from "react"
import Label from "@santiment-network/ui/Label"
import Button from "@santiment-network/ui/Button"
import Settings from "./Settings"
import styles from "./SettingsAPIKeys.module.scss"

const SettingsGetStarted = ({ apikeys = [], generateAPIKey, revokeAPIKey }) => (
  <Settings id='get-started' header='Get started'>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label className={styles.setting__description} accent='waterloo'>
          Read our guide "Getting started for developers"
        </Label>
      </div>
      <Button
        as='a'
        variant='fill'
        accent='neuro'
        target='_blank'
        rel='noopener noreferrer'
        href='https://academy.santiment.net/for-developers/'
        className={styles.text}
      >
        Read the article
      </Button>
    </Settings.Row>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label className={styles.setting__description} accent='waterloo'>
          Get Crypto Data Directly into Python
        </Label>
      </div>
      <Button
        as='a'
        variant='fill'
        accent='neuro'
        target='_blank'
        rel='noopener noreferrer'
        href='https://github.com/santiment/sanpy'
        className={styles.text}
      >
        Read the readme
      </Button>
    </Settings.Row>
  </Settings>
)

export default SettingsGetStarted
