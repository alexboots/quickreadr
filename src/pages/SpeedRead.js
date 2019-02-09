import React, { useState } from 'react'
import Settings from './Settings'
import useInterval from '../hooks/use-interval'


import {
  Box,
  Button,
  Layer,
  Text,
  Heading,
  Grid,
  Meter,
} from 'grommet'

const SpeedRead = (props) => {
  const { pastedText, defaultDelay } = props

  let [count, setCount] = useState(0)
  let [displayWord, setDisplayWord] = useState('')
  let [showModal, setShowModal] = useState(false)
  let [isRunning, setIsRunning] = useState(false)

  let [delay, setDelay] = useState(defaultDelay)

  const pastedTextArray = pastedText ? pastedText.split(' ') : '';
  const wordCount = pastedTextArray.length

  function handleDelayChange(e) {
    const input = Number(e.target.value)
    if(isNaN(input) || input > 100000) return
    setDelay(input)
  }

  useInterval(() => {
    if(isRunning && count < wordCount) {
      const word = pastedTextArray[count]
      setDisplayWord(word)
      setCount(count + 1)

      if(word.includes('-') || word.includes('—')) {
        setDelay(delay * 2)
      } else if(word.split('').pop() === '.' || word.length > 7) {
        setDelay(delay + 100)
      } else if(delay !== defaultDelay) {
        setDelay(defaultDelay)
      }

    } else {
      finishedReading()
    }
  }, isRunning ? delay : null)

  function handleRead () {
    setDisplayWord(pastedTextArray[0])
    setIsRunning(true)
    setShowModal(true)
  }

  function onClose () {
    setShowModal(false)
    finishedReading()
  }

  function finishedReading () {
    setIsRunning(false)
    setCount(0)
  }

  return(
    <Grid
      alignContent='center'
      align='center'
      columns={['xsmall', 'small']}
      gap='medium'
    >
      <Button
        disabled={pastedTextArray.length === 0}
        alignSelf='center'
        label="Read"
        onClick={() => handleRead()}
      />

      <Settings delay={ delay } handleDelayChange={ handleDelayChange } />

      {showModal &&
        <Layer
          position="center"
          modal
          size='full'
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            pad="large"
            gap="small"
            width="large"
            height="medium"
            align="center"
            justify="center"
          >
            <Text
              color="black"
              onClick={onClose}
              style={{ cursor: 'pointer', position: 'fixed', top: '12px', right: '16px' }}
            >
              <strong>✖</strong>
            </Text>

            <Heading> { displayWord } </Heading>

          </Box>
            <Meter
              size='full'
              thickness='xsmall'
              background='light-6'
              style={{ position: 'absolute', bottom: '0', left: '0', right: '0' }}
              values={[{ value: count / wordCount * 100, color: 'dark-6', }]}
              aria-label="meter"
            />
        </Layer>
      }
    </Grid>
  )
}

export default SpeedRead
