import React, { useState } from 'react'

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
    setPauseAfterPeriod
   } = props

  return(
    <Grid
      areas={[
        { name: 'input-readspead', start: [0, 0], end: [0, 0] },
        { name: 'text-readspeed', start: [1, 0], end: [1, 0] },

        { name: 'input-speedup-small-words', start: [0, 1], end: [1, 1] },
        { name: 'input-slowdown-long-words', start: [0, 2], end: [1, 2] },
        { name: 'input-pause-after-period', start: [0, 3], end: [1, 3] },
      ]}
      columns={['xsmall', 'small']}
      fill
      rows={['flex', 'flex', 'flex', 'flex']}
      gap='small'
      margin='small'
    >
      <Box gridArea='input-readspead'>
        <TextInput
          value={userDelay}
          onChange={(e) => handleDelayChange(e) }
        />
      </Box>
      <Box
        justify='center'
        gridArea='text-readspeed'
      >
        <Text size='medium'>Word Speed (ms)</Text>
      </Box>

      <Box gridArea='input-speedup-small-words'>
        <CheckBox
          label='Speed up small words'
          checked={speedUpSmallWords}
          onChange={() => setSpeedUpSmallWords(!speedUpSmallWords) }
        />
      </Box>

      <Box gridArea='input-slowdown-long-words'>
        <CheckBox
          label='Slow down long words'
          checked={slowDownLongWords}
          onChange={() => setSlowDownLongWords(!slowDownLongWords) }
        />
      </Box>

      <Box gridArea='input-pause-after-period'>
        <CheckBox
          label="Pause after period's `.`"
          checked={pauseAfterPeriod}
          onChange={() => setPauseAfterPeriod(!pauseAfterPeriod) }
        />
      </Box>
    </Grid>
   )
}

const Settings = (props) => {
  return(
    <DropButton
      label="Settings"
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropContent={
        <SetingsComponent {...props} />
      }
    />
  )
}

export default Settings
