import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Image from "gatsby-image"
import classNames from 'classnames';


import styles from './index.module.css';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

const cx = classNames.bind(styles)

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Blockfrastructure"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`staking`, `blockchain`, `digital`, `asset`, `bitcoin`]}
        />
        {/* <img style={{ margin: 0 }} src="./GatsbyScene.svg" alt="Gatsby Scene" /> */}
        <h1>
          Hey people{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>Welcome to Blockfrastructure! We provide staking infrastructure and tooling for token holders of stake-based blockchains. <strong>We are under active development so stay tuned!</strong>
        </p>
        <p>
          Head over to our blog to learn about blockchain and staking, the risks and rewards of staking in blockchain networks.
        </p>
        <h2>Under Development</h2>
        <StaticQuery
          query={kusamaImageQuery}
          render={data => {
            return (
              <div className={styles.supported_network_container}>
                <div className={styles.home_image_wrapper}>
                  <Image
                    fixed={data.file.childImageSharp.fixed}
                    style={{
                      marginBottom: 0,
                      minWidth: 150,
                      borderRadius: `100%`,
                      background: 'gray'
                    }}
                    imgStyle={{
                      borderRadius: `50%`,
                    }}
                  />
                  <div>Kusama</div>
                </div>

              </div>
            )
          }}
        />
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
      </Layout>
    )
  }
}
const kusamaImageQuery = graphql`
query {
  file(relativePath: { eq: "kusama.png" }) {
    childImageSharp {
      # Specify the image processing specifications right in the query.
      # Makes it trivial to update as your page's design changes.
      fixed(width: 150, height: 150) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}
`

export default IndexPage
