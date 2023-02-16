import React, { useContext } from 'react'
import { AppBar, IconButton, Typography } from '@mui/material'
import { UserContext } from '../../../App';
import { LogoutTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({setLoggedinUser}) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) =>{
    setLoggedinUser({});
    navigate("/");
  }

  return (
    <AppBar position='static' sx={{flexDirection:"row"}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,padding:"10px"}}> Sports Registrations</Typography>
        {user && user.firstName && <span style={{padding:"10px"}}>{user.firstName}  {user.lastName}</span>}
        {user && user.firstName && <IconButton style={{padding:"10px"}} onClick={handleLogout} title="Logout"><LogoutTwoTone/></IconButton>}
    </AppBar>
  )
}

Header.propTypes = {}

export default Header