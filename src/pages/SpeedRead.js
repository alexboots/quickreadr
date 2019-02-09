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
} from 'grommet'
console.log('useInterval', useInterval)
const SpeedRead = (props) => {
  const { pastedText } = props

  let [count, setCount] = useState(0)
  let [displayWord, setDisplayWord] = useState('')
  let [showModal, setShowModal] = useState(false)
  let [isRunning, setIsRunning] = useState(false)

  const defaultDelay = 300
  let [delay, setDelay] = useState(defaultDelay)

  const pastedTextArray = pastedText.split(' ');
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
    setDisplayWord('')
    setShowModal(true)
    setIsRunning(true)
  }

  function onClose () {
    setShowModal(false)
  }

  function finishedReading () {
    setIsRunning(false)
    setCount(0)
  }

  return(
    <Grid
      columns={['xsmall', 'small']}
      gap='medium'
      align='center'
    >
      <Button
        disabled={pastedText.length === 0}
        alignSelf='center'
        label="Read"
        onClick={() => handleRead()}
      />

      <Settings delay={ delay } handleDelayChange={ handleDelayChange } />
      {showModal &&
        <Layer
          position="center"
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            pad="medium"
            gap="small"
            width="medium"
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
          </Layer>
        }
    </Grid>
  )
}

export default SpeedRead
