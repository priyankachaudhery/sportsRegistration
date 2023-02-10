import React, { useState } from "react";
import { Alert, IconButton, InputAdornment, Stack, styled, TextField, Typography } from "@mui/material";
import { LoginTwoTone } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/LoginApi";
import { useSnackBar } from "../../../components/useSnackbar";

export const StyledStack = styled(Stack)(({theme})=>({
    alignItems: 'center',
}));

export const Login = ({setLoggedinUser}) => {
    const [userID, setUserID] = useState("");
    const [snackbar,setShowSnackbar] = useSnackBar({message: 'User not found. Kindly Register.' , type:'info' });
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setUserID(e.target.value);
    }

    const handleLogin = (e) =>{
        loginUser(userID).then((response)=>{
            if(response){
                setLoggedinUser(response);
                navigate('/home');
            }else{
                setShowSnackbar(true);
            }
        })
    }

    return (
        <StyledStack spacing={2} justifyContent="center" alignItems={"center"}>
            <Typography variant="h2" component={"h4"} color="primary">Sports Registrations</Typography>
            {snackbar}
            <TextField   label="Email Id" 
                value={userID}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                        aria-label="login"
                        onClick={handleLogin}
                        edge="end"
                        title="SignIn"
                        >
                        <LoginTwoTone />
                    </IconButton>
                    </InputAdornment>
              }}
            />
            <Typography color={"secondary"}> New User? Register <Link to="/register">here</Link></Typography>
        </StyledStack>
    );
}