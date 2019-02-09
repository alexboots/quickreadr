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

const SpeedRead = (props) => {
  const { pastedText, delay, handleDelayChange } = props
  const [showModal, setShowModal] = useState(false)

  function handleRead () {
    setShowModal(true)
  }

  function onClose () {
    setShowModal(false)
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

              <Heading>HI</Heading>
            </Box>
          </Layer>
        }
    </Grid>
  )
}

export default SpeedRead
