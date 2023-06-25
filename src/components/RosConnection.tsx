import { useState } from 'react'
import { rosConnection } from '../lib/ros'
import Alert from 'react-bootstrap/Alert'

export function RosConnection() {

  const [connected, setConnected] = useState(false)

  rosConnection.on('connection', () => {
    console.log('connected')
    setConnected(true)
  })

  rosConnection.on('close', () => {
    console.log('disconnected')
    setConnected(false)
  })

  return (
   <div>
    <Alert className='text-center m-3' variant={connected ? 'success' : 'danger'}>
      Robot is {connected ? 'connected' : 'disconnected'}
    </Alert>
   </div>
  )
}