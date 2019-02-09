import React from 'react'

import {
  Box,
  Grid,
  TextInput,
  Text,
} from 'grommet'

const ReadSpeed = (props) => {
  const { delay, handleDelayChange } = props

  return(
    <Grid
      areas={[
        { name: 'input-readspead', start: [0, 0], end: [0, 0] },
        { name: 'text-readspeed', start: [1, 0], end: [1, 0] },
      ]}
      columns={['xsmall', 'small']}
      fill
      rows={['flex']}
      gap='small'
      align='center'
    >
      <Box gridArea='input-readspead'>
        <TextInput
          value={delay}
          onChange={(e) => handleDelayChange(e) }
        />
      </Box>
      <Box
        gridArea='text-readspeed'
        justify='center'
      >
        <Text size='small'>Speed (ms)</Text>
      </Box>
    </Grid>
  )
}

export default ReadSpeed
