import React from 'react'
import { Link } from 'gatsby'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Pricing from '../components/Pricing'
import WhySantiment from '../components/WhySantiment/WhySantiment'
import Advantages from '../components/Advantages/Advantages'
import UseCases from '../components/UseCases/UseCases'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials/Testimonials'
import ReadyToStart from '../components/ReadyToStart/ReadyToStart'
import styles from './index.module.scss'

const code = `#keyword[import] san

daa #keyword[=] san.get(
\t"daily_active_addresses/santiment",
\t#keyword[from_date=]"2018-06-01",
\t#keyword[to_date=]"2018-06-05",
\t#keyword[interval=]"1d"
)

prices #keyword[=] san.get(
\t"prices/santiment",
\t#keyword[from_date=]"2018-06-01",
\t#keyword[to_date=]"2018-06-05",
\t#keyword[interval=]"1d"
)`

const lines = code.split(`\n`).map((line, i) => {
  const formatted = line
    .replace(/#keyword\[(.*)\]/g, '<span class="code__keyword">$1</span>')
    .replace(/\t/g, '<span class="code__tab"></span>')

  return `<span class="code__number">${i + 1}</span>${formatted}`
})

const IndexPage = () => (
  <Layout>
    <SEO title="Santiment's Neuro - Crypto’s Most Comprehensive API" />
    <section className={styles.wrapper}>
      <div>
        <h1 className={styles.title}>
          Comprehensive
          <br />
          <span className={styles.title__mark}>crypto API</span>
        </h1>
        <h2 className={styles.desc}>
          Get 100% custom-built and unique terabytes of processed on-chain,
          social, github and fundamental data sets
        </h2>
        <Button
          as={Link}
          to='/account'
          className={styles.access}
          variant='fill'
          accent='blue'
        >
          Get access
        </Button>
        <a
          href='https://help.santiment.net/metrics-explained#api'
          className={styles.doc}
          target='_blank'
          rel='noopener noreferrer'
        >
          Documentation <Icon type='arrow-right' className={styles.doc__icon} />
        </a>
      </div>

      <div className={styles.code}>
        <div className={styles.code__header}>
          <div className={styles.code__btn} />
          <div className={styles.code__btn} />
          <div className={styles.code__btn} />
        </div>
        <ol className={styles.source}>
          {lines.map((line, i) => (
            <li
              className={styles.source__line}
              key={i}
              dangerouslySetInnerHTML={{ __html: line }}
            />
          ))}
        </ol>
        <div className={styles.gathered}>
          <h3 className={styles.gathered__percent}>78.6 %</h3>
          <h4 className={styles.gathered__label}>data gathered</h4>
        </div>
      </div>
    </section>
    <WhySantiment />
    <Advantages />
    <UseCases />
    <Pricing />
    <Testimonials />
    <FAQ />
    <ReadyToStart />
  </Layout>
)

export default IndexPage
