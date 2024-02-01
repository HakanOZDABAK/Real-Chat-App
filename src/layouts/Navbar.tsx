import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import axios from "axios";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { auth, provider } from '../configs/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import Cookies from "universal-cookie"
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const cookies = new Cookies()
  const{setIsAuth}=useAuthStore()
  const sigInWithGoogle = async () =>{

    try{   
      const result = await signInWithPopup(auth,provider);

   console.log(result)
   cookies.set("auth-token",result.user.refreshToken)
   setIsAuth(cookies.get("auth-token"))
  }
 

  catch(err){
    console.log(err)
  }
    
  }
  React.useEffect(() => {
    const fetchData = async () => {
      const response:any = await axios.get("http://localhost:8081/api/v1/message/hello", {
        headers: {
          Accept: "*/*",
          "Content-Type":"application/json"

        },
      }).then(()=>console.log(response))
    };
  
    fetchData();
  })
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={()=>{sigInWithGoogle()}}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}