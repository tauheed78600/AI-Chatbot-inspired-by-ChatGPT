import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext.tsx'
import NavLink from '../components/shared/NavLink'

const header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{bgcolor: 'transparent', position: 'static', boxShadow: "none"}}>
        <Toolbar sx={{display: 'flex'}}>
            <Logo/>
            <div>
              {auth?.isLoggedIn ? (
              <>
              <NavLink 
                to = "/chat" 
                bg = "#00fffc" 
                text = "Go to chat" 
                textColor = "black"
                />
                <NavLink
                  bg = "#51538f"
                  textColor='white'
                  to = "/"
                  text = "logout"
                  onClick = {auth.logout}
                />
              </>): 
              (<>
                <NavLink
                bg = "#00fffc"
                to = "/login" 
                text = "Login" 
                textColor = "black"
                />
                <NavLink
                  bg = "#51538f"
                  textColor='white'
                  to = "/signup"
                  text = "Signup"
                />
              </>)}
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default header
