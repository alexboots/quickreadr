import React, { useState } from 'react'
import Layout from '../components/Layout'
import SpeedRead from './SpeedRead'

import {
  Grid,
  Heading,
  Box,
  Text,
  TextArea,
} from 'grommet'

const defaultDelay = 300
const IndexPage = (props) => {
  let [pastedText, setPastedText] = useState('')

  function handlePasteText(e) {
    setPastedText(e.target.value)
  }

  return (
      <Layout>
        <Grid
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'btn-read', start: [0, 1], end: [1, 1] },
            { name: 'main', start: [0, 2], end: [1, 2] },
          ]}
          columns={['small']}
          fill
          rows={['flex', 'xsmall','large']}
          gap='xxsmall'
          justify='center'
        >
          <Box
            a11yTitle="Speed Readr"
            gridArea='header'
            margin={{ bottom: 'small' }}
          >
            <Heading level='2' style={{ marginBottom: '0px' }}>Read Quickr</Heading>
            <Text alignSelf='end' size='xsmall'>by <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/alexboots'>@alexboots</a></Text>
          </Box>

          <Box gridArea='btn-read'>
            <SpeedRead defaultDelay={defaultDelay} pastedText={pastedText} />
          </Box>

          <Box
            gridArea='main'
            fill
            pad='large'
          >
            <TextArea
              style={{ minHeight: '300px' }}
              resize={true}
              value={pastedText}
              placeholder='Paste text here'
              onChange={(e) => handlePasteText(e)}
            />
          </Box>
        </Grid>
      </Layout>
  )
}


export default IndexPage