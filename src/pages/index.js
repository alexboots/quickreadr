import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import ms from 'pretty-ms';

import {
  Grid,
  Heading,
  Box,
  Button,
  TextArea,
  TextInput,
} from 'grommet'



function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const IndexPage = () => {
  let [count, setCount] = useState(0);
  let [delay, setDelay] = useState(300);
  let [pastedText, setPastedText] = useState('');

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, delay);

  function handleDelayChange(e) {
    const input = Number(e.target.value)
    if(isNaN(input) || input > 100000) return
    setDelay(input)
  }

  return (
      <Layout>
        <Grid
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'settings', start: [0, 1], end: [1, 1] },
            { name: 'btn-read', start: [0, 2], end: [1, 2] },
            { name: 'main', start: [0, 3], end: [1, 3] },
          ]}
          columns={['small']}
          rows={['xsmall', 'xsmall', 'xxsmall','small']}
          gap='small'
        >
          <Box
            a11yTitle="Screen reader text"
            background='accent-1'
            gridArea='header'>
            <Heading alignSelf='center'>Speed Readr</Heading>
          </Box>
          <Box
            background='accent-3'
            gridArea='settings'
            fill
            align="center"
            justify="center"
           >
              <Box width="xsmall">
                <TextInput
                  value={delay}
                  onChange={(e) => handleDelayChange(e) }
                />
              </Box>
          </Box>
          <Box gridArea='btn-read' background='accent-2'>
             <Button alignSelf='center' label="Read"  onClick={() => {}} />
          </Box>
          <Box gridArea='main' background='brand'>
            <h1>{count}</h1>
            <TextArea
              fill={true}
              value={pastedText}
              placeholder='Paste text here'
              onChange={(e) => setPastedText(e)}
            />
          </Box>
        </Grid>
      </Layout>
  )
}


export default IndexPage