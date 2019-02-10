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

  const [speedUpSmallWords, setSpeedUpSmallWords] = useState(true)
  const [slowDownLongWords, setSlowDownLongWords] = useState(true)
  const [pauseAfterPeriod, setPauseAfterPeriod] = useState(true)

  const pastedTextArray = pastedText ? pastedText.split(' ') : '';
  const wordCount = pastedTextArray.length

  useInterval(() => {
    if(isRunning && count < wordCount) {
      const word = pastedTextArray[count]
      setDisplayWord(word)
      setCount(count + 1)

      if(word.includes('-') || word.includes('—')) {
        setDelay(userDelay * 2)
      } else if(speedUpSmallWords && word.length <= 3) {
        setDelay(userDelay - Math.round(userDelay / 3));
      } else if(slowDownLongWords && word.length > 7) {
        setDelay(userDelay + Math.round(userDelay / 3))
      } else if(pauseAfterPeriod && word.split('').pop() === '.') {
        setDelay(userDelay + Math.round(userDelay / 3))
      }else if(delay !== userDelay){
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
      columns={['small', 'small']}
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

        speedUpSmallWords={speedUpSmallWords}
        setSpeedUpSmallWords={setSpeedUpSmallWords}

        slowDownLongWords={slowDownLongWords}
        setSlowDownLongWords={setSlowDownLongWords}

        pauseAfterPeriod={pauseAfterPeriod}
        setPauseAfterPeriod={setPauseAfterPeriod}
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
