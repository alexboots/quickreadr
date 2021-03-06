import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Grommet } from 'grommet'
import ReactGA from 'react-ga';

const quickreadrTheme = {
  global: {
    font: {
      family: 'Roboto Slab',
    },
  },
  layer: {
    small: {
      borderSize: {
        xlarge: '300px'
      }
    },
    overlay: {
      background: "rgba(58, 58, 58, 1)"
    }
  }
};

ReactGA.initialize('UA-134221585-1')
if(typeof window !== 'undefined') {
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <div>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />

          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
	        <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
	        <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />
          <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>

        <Grommet theme={quickreadrTheme}>
          {children}
         </Grommet>
      </div>
    )}
  />
)

export default TemplateWrapper
