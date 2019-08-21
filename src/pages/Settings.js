import React from 'react'

import {
  Box,
  CheckBox,
  DropButton,
  Grid,
  TextInput,
  Text,
} from 'grommet'


const SetingsComponent = (props) => {
  const {
    userDelay,
    handleDelayChange,
    speedUpSmallWords,
    setSpeedUpSmallWords,
    slowDownLongWords,
    setSlowDownLongWords,
    pauseAfterPeriod,
    setPauseAfterPeriod,
    pauseForHyphens,
    setPauseForHyphens,
   } = props

  return(
    <Grid
      areas={[
        { name: 'input-readspead', start: [0, 0], end: [0, 0] },
        { name: 'text-readspeed', start: [1, 0], end: [1, 0] },

        { name: 'input-speedup-small-words', start: [0, 1], end: [1, 1] },
        { name: 'input-slowdown-long-words', start: [0, 2], end: [1, 2] },
        { name: 'input-pause-after-period', start: [0, 3], end: [1, 3] },
        { name: 'input-pause-for-hypens', start: [0, 4], end: [1, 4] },
      ]}
      columns={['xsmall', 'small']}
      fill
      rows={['flex', 'flex', 'flex', 'flex', 'flux']}
      gap='small'
    >
      <Box gridArea='input-readspead' style={{padding: '16px 10px 0px 10px' }}>
        <TextInput
          value={userDelay}
          onChange={(e) => handleDelayChange(e) }
        />
      </Box>
      <Box
        justify='center'
        gridArea='text-readspeed'
        style={{ margin: '10px 0 0 -10px' }}
      >
        <Text size='small'>Milliseconds between words</Text>
        <Text size='xsmall'>(smaller number = faster)</Text>
      </Box>

      <Box gridArea='input-speedup-small-words' style={{padding: '0 10px 0 10px' }}>
        <CheckBox
          label='Speed up small words'
          checked={speedUpSmallWords}
          onChange={() => setSpeedUpSmallWords(!speedUpSmallWords) }
        />
      </Box>

      <Box gridArea='input-slowdown-long-words' style={{padding: '0 10px 0 10px' }}>
        <CheckBox
          label='Slow longer words'
          checked={slowDownLongWords}
          onChange={() => setSlowDownLongWords(!slowDownLongWords) }
        />
      </Box>

      <Box gridArea='input-pause-after-period' style={{padding: '0 10px 0 10px' }}>
        <CheckBox
          label="Slow after periods `.`"
          checked={pauseAfterPeriod}
          onChange={() => setPauseAfterPeriod(!pauseAfterPeriod) }
        />
      </Box>

      <Box gridArea='input-pause-for-hypens' style={{padding: '0 10px 16px 10px' }}>
        <CheckBox
          label="Slow hyphenated words"
          checked={pauseForHyphens}
          onChange={() => setPauseForHyphens(!pauseForHyphens) }
        />
      </Box>

    </Grid>
   )
}

const Settings = (props) => {
  function saveSettings (props) {
    const {
      userDelay,
      speedUpSmallWords,
      slowDownLongWords,
      pauseAfterPeriod,
      pauseForHyphens,
    } = props

    const settings = JSON.stringify({
      userDelay,
      speedUpSmallWords,
      slowDownLongWords,
      pauseAfterPeriod,
      pauseForHyphens,
    })

    localStorage.setItem('settings', settings)
  }

  return(
    <DropButton
      label="Settings"
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropContent={
        <SetingsComponent {...props} />
      }
      onClose={() => saveSettings(props) }
    />
  )
}

export default Settings
