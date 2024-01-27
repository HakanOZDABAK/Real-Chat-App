import { Button } from '@mui/material'
import React, { useState } from 'react'

export default function Chat() {
    const[newMessage, setNewMessage] =useState<string>("")
    const handleSubmit =(e:any)=>{
     e.preventDefault()
     console.log(newMessage)

    }
  return (
    <div className='chat-app'>

        <form className='new-message-form'>
        <input className='new-message-input'
        placeholder='"Type your message here...'
        onChange={(e:any)=>setNewMessage(e.target.value)}
        />
        <Button type='submit' className='send-button'>
            Send
        </Button>
        </form>
    </div>
  )
}
