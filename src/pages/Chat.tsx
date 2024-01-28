import { Button } from '@mui/material'
import { useState } from 'react'
import { addDoc, collection,serverTimestamp } from 'firebase/firestore';
import { db,auth } from '../configs/firebaseConfig';
import { useRoomService } from '../services/useRoomService';

export default function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const {room} =useRoomService()
  const messageRef = collection(db,"messages")

  const handleSubmit =  async(e:any) => {
    e.preventDefault();
    if(newMessage =="") return;

    await addDoc(messageRef,{

      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room
    })

    setNewMessage("")
  };

  return (
    <div className='chat-app'>
      <form className='new-message-form' onSubmit={handleSubmit}>
        <input
          className='new-message-input'
          placeholder='Type your message here...'
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <Button type='submit' className='send-button'>
          Send
        </Button>
      </form>
    </div>
  );
}
