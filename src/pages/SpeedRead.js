import React, { useState } from 'react'
import useInterval from '../hooks/use-interval'
import Settings from './Settings'
import Modal from './Modal'

import {
  Box,
  Button,
  Layer,
  Text,
  Heading,
  Grid,
  Meter,
} from 'grommet'

const defaultDelay = 300;
const SpeedRead = (props) => {
  const { pastedText } = props

  let [count, setCount] = useState(0)
  let [displayWord, setDisplayWord] = useState('')
  let [showModal, setShowModal] = useState(false)
  let [isRunning, setIsRunning] = useState(false)

  let [delay, setDelay] = useState(defaultDelay)
  let [userDelay, setUserDelay] = useState(defaultDelay)

  const pastedTextArray = pastedText ? pastedText.split(' ') : '';
  const wordCount = pastedTextArray.length

  useInterval(() => {
    if(isRunning && count < wordCount) {
      const word = pastedTextArray[count]
      setDisplayWord(word)
      setCount(count + 1)

      if(word.includes('-') || word.includes('—')) {
        setDelay(delay * 2)
      } else if(word.split('').pop() === '.' || word.length > 7) {
        setDelay(delay + Math.round(delay / 4))
      } else if(delay !== userDelay){
        setDelay(userDelay)
      }

    } else {
      finishedReading()
    }
  }, isRunning ? delay : null)

  function handleDelayChange(e) {
    const input = Number(e.target.value)
    if(isNaN(input) || input > 100000) return
    setDelay(input)
    setUserDelay(input)
  }

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

      <Settings
        delay={delay}
        userDelay={userDelay}
        handleDelayChange={ handleDelayChange }
      />

      <Modal
        displayWord={displayWord}
        onClose={onClose}
        wordCount={wordCount}
        showModal={showModal}
        count={count}
      />
    </Grid>
  )
}

export default SpeedRead
