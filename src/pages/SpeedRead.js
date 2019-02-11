import React, { useState, useEffect } from 'react'
import useInterval from '../hooks/use-interval'
import Settings from './Settings'
import Modal from './Modal'

import { Button, Grid } from 'grommet'

const SpeedRead = (props) => {
  const { pastedText } = props
  const defaultDelay = 300

  let [count, setCount] = useState(0)
  let [displayWord, setDisplayWord] = useState('')
  let [showModal, setShowModal] = useState(false)
  let [isRunning, setIsRunning] = useState(false)

  let [delay, setDelay] = useState(defaultDelay)
  let [userDelay, setUserDelay] = useState(defaultDelay)

  const [speedUpSmallWords, setSpeedUpSmallWords] = useState(true)
  const [slowDownLongWords, setSlowDownLongWords] = useState(true)
  const [pauseAfterPeriod, setPauseAfterPeriod] = useState(true)
  const [pauseForHyphens, setPauseForHyphens] = useState(true)

  let [mounted, setMounted] = useState(false)

  function formatWordsArray(pastedText) {
    // replace new lines with spaces and split into array
    return pastedText ? pastedText.replace(/(?:\r\n|\r|\n)/g, ' ').split(' ') : ''
  }

  const pastedTextArray = formatWordsArray(pastedText)
  const wordCount = pastedTextArray.length

  useEffect(() => {
    if(!mounted) {
      setMounted(true)
      const settings = JSON.parse(localStorage.getItem('settings'))
      if(settings) {
        setUserDelay(settings.userDelay)
        setSpeedUpSmallWords(settings.speedUpSmallWords)
        setSlowDownLongWords(settings.slowDownLongWords)
        setPauseAfterPeriod(settings.pauseAfterPeriod)
        setPauseForHyphens(settings.pauseForHyphens)
      }
    }
  })

  useInterval(() => {
    if(isRunning && count < wordCount) {
      const word = pastedTextArray[count]
      setDisplayWord(word)
      setCount(count + 1)

      const adjustDelay = Math.round(userDelay / 3)

      if(speedUpSmallWords && word.length <= 3) {
        setDelay(userDelay - adjustDelay)
      } else if((slowDownLongWords && word.length > 7)) {
        setDelay(userDelay + adjustDelay)
      } else if(pauseAfterPeriod && word.split('').pop() === '.') {
        setDelay(userDelay + adjustDelay)
      } else if(pauseForHyphens && (word.includes('-') || word.includes('—'))) {
        setDelay(userDelay + adjustDelay)
      } else if(delay !== userDelay) {
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
      columns={[['xsmall', 'small'], ['xsmall', 'small']]}
      gap='medium'
      margin='large'
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

        pauseForHyphens={pauseForHyphens}
        setPauseForHyphens={setPauseForHyphens}
      />

      <Modal
        isRunning={isRunning}
        setIsRunning={setIsRunning}
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
