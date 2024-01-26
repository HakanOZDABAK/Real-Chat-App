import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import Cookies from 'universal-cookie'

export default function Dashboard() {
  const cookies = new Cookies()
  const[isAuth,setIsAuth] = useState<any>(cookies.get("auth-token"))
  const[room,setRoom] = useState<any>(null)
  const roomInputRef= useRef<any>(null)

  if(!isAuth){
    return (
      <div>Dashboard</div>
    )
  }
  else{
    return(
      <Grid container marginTop={"10px"} justifyContent="center" spacing={2}>
      <Grid item style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" style={{ marginRight: '8px' }}>Enter Room Name:</Typography>
      </Grid>
      <Grid item style={{ display: 'flex', alignItems: 'center' }}>
        <TextField ref={roomInputRef} id="standard-basic" label="Standard" variant="standard" />
      </Grid>
      <Grid item>
        <Button onClick={() => {setRoom(roomInputRef.current.value)}}variant="contained" style={{ marginLeft: "10px", marginTop: "10px" }}>Go to Room</Button>
      </Grid>
    </Grid>
    )
  }

}
