import React, { useContext } from 'react'
import { AppBar, Typography } from '@mui/material'
import { UserContext } from '../../../App';

const Header = () => {
  const user = useContext(UserContext);
  return (
    <AppBar position='static' sx={{flexDirection:"row"}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,padding:"10px"}}> Sports Registrations</Typography>
         {user && user.firstName && <span style={{padding:"10px"}}>{user.firstName}  {user.lastName}</span>}
    </AppBar>
  )
}

Header.propTypes = {}

export default Header