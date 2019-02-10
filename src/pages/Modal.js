import React from 'react'

import {
  Box,
  Button,
  Layer,
  Text,
  Heading,
  Meter,
} from 'grommet'

const Modal = (props) => {
  const { showModal, onClose, displayWord, wordCount, count, isRunning, setIsRunning } = props

  return(
    <>
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
          <Button
            alignSelf='center'
            label={ isRunning ? '||' : '>'}
            size='small'
            style={{position: 'absolute', bottom: '30px'}}
            onClick={() => setIsRunning(!isRunning)}
          />
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
    </>
  )
}


export default Modal