import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { SocketContext } from '../SocketContext'

const Notifications = () => {
    const { call, answerCall, callAccepted } = useContext(SocketContext);

    console.log(call, callAccepted)
    return (
        <>
            {call.isReceivedCall && !callAccepted && (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1>{call.name} wants to login</h1>
                    <Button variant='contained' fullWidth color='primary' onClick={answerCall}>View User</Button>
                </div>
            )}
        </>
    )
}

export default Notifications
