import { Button, Grid, TextField, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useRoomService } from '../services/useRoomService'
import { useNavigate } from 'react-router-dom';

export default function Room() {
    const {setRoom} = useRoomService()
    const roomInputRef = useRef<any>(null)
    const navigate = useNavigate()

    const handleRoom = ()=>{
      setRoom(roomInputRef.current.value)
      navigate("/chat")
    }
    
  return (
    <Grid container marginTop={"10px"} justifyContent="center" spacing={2}>
    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" style={{ marginRight: '8px' }}>Enter Room Name:</Typography>
    </Grid>
    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
      <TextField ref={roomInputRef} id="standard-basic" label="Standard" variant="standard" />
    </Grid>
    <Grid item>
      <Button onClick={() => {handleRoom()}} variant="contained" style={{ marginLeft: "10px", marginTop: "10px" }}>Go to Room</Button>
    </Grid>
  </Grid>
  )
}
