import React, { useState } from "react"
import { navigate } from "gatsby"
import Panel from "@santiment-network/ui/Panel/Panel"
import Button from "@santiment-network/ui/Button"
import Checkboxes from "@santiment-network/ui/Checkboxes"
import styles from "./GDPR.module.scss"

const GDPRPage = ({ togglePrivacyPolicy, privacyPolicyAccepted }) => {
  const [isGDPR, setGDPR] = useState(false)
  const toggleGDPR = () => setGDPR(!isGDPR)

  if (privacyPolicyAccepted) {
    navigate("/account")
  }

  return (
    <Panel padding className={styles.wrapper}>
      <h2 className={styles.title}>
        Last step to get your Sanbase experience.
      </h2>
      <p>
        Please accept our updated Privacy Policy by May, 2018 to continue using
        Sanbase
      </p>
      <Checkboxes
        className={styles.checkbox}
        labelOnRight
        options={["I have read and accept the "]}
        onSelect={toggleGDPR}
      />

      <a
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        href="https://app.santiment.net/privacy-policy"
      >
        Santiment Privacy Policy
      </a>

      <div className={styles.bottom}>
        <Button
          disabled={!isGDPR}
          variant="fill"
          accent="positive"
          onClick={() =>
            togglePrivacyPolicy({
              variables: { privacyPolicyAccepted: true },
            })
          }
        >
          I Agree
        </Button>
      </div>
    </Panel>
  )
}

export default GDPRPage
