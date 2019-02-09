import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import Settings from './Settings'
import SpeedRead from './SpeedRead'

import {
  Grid,
  Heading,
  Box,
  Button,
  TextArea,
} from 'grommet'

const IndexPage = () => {
  let [count, setCount] = useState(0);
  let [delay, setDelay] = useState(300);
  let [pastedText, setPastedText] = useState('');

  function handleDelayChange(e) {
    const input = Number(e.target.value)
    if(isNaN(input) || input > 100000) return
    setDelay(input)
  }

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
          rows={['xsmall', 'xsmall','small']}
          gap='xxsmall'
          justify='center'
        >
          <Box
            a11yTitle="Speed Readr"
            gridArea='header'
            align='center'
          >
            <Heading level='2'>Read Quickr</Heading>
          </Box>

          <Box
            gridArea='btn-read'
            height='xxsmall'
            justify='center'
           >
            <SpeedRead
              handleDelayChange={handleDelayChange}
              delay={delay}
              pastedText={pastedText}
            />
          </Box>

          <Box
            gridArea='main'
            align='center'
          >
            <Box width='large' height='medium'>
              <TextArea
                fill={true}
                value={pastedText}
                placeholder='Paste text here'
                onChange={(e) => handlePasteText(e)}
              />
             </Box>
          </Box>
        </Grid>
      </Layout>
  )
}


export default IndexPage