import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useRoomService } from "../store/useRoomService";
import { useNavigate } from "react-router-dom";

export default function Room() {
  const { room,setRoom } = useRoomService();
  const navigate = useNavigate();

  const handleGoToRoom = () => {
    navigate("/chat");
    console.log(room)
  };
  return (
    <Grid container marginTop={"10px"} justifyContent="center" spacing={2}>
      <Grid item style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" style={{ marginRight: "8px" }}>
          Enter Room Name:
        </Typography>
      </Grid>
      <Grid item style={{ display: "flex", alignItems: "center" }}>
        <TextField
          onChange={(e: any) => {
            setRoom(e.target.value);
          }}
          id="standard-basic"
          label="Standard"
          variant="standard"
        />
      </Grid>
      <Grid item>
        <Button
          onClick={() => {
            handleGoToRoom();
          }}
          variant="contained"
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          Go to Room
        </Button>
      </Grid>
    </Grid>
  );
}
