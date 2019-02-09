import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import ms from 'pretty-ms';

import {  Grid, Heading, Box } from 'grommet'



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
  let [delay, setDelay] = useState(1000);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, delay);

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }


  return (
      <Layout>
        <Grid
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'main', start: [0, 1], end: [1, 1] },
          ]}
          columns={['small']}
          rows={['xsmall', 'small']}
          gap='small'
        >
          <Box
            a11yTitle
            background='accent-1'
            gridArea='header'>
            <Heading alignSelf='center'>Speed Readr</Heading>
          </Box>
          <Box gridArea='main' background='brand'>
            <h1>{count}</h1>
            <input value={delay} onChange={handleDelayChange} />
          </Box>
        </Grid>
      </Layout>
  )
}


export default IndexPage