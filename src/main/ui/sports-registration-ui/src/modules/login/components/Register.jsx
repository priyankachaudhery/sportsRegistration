import React, { useState } from "react";
import { Alert, AlertTitle, Button, Stack, styled, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/LoginApi";
import { LibraryAddTwoTone } from "@mui/icons-material";
import { useSnackBar } from "../../../components/useSnackbar";

export const StyledStack = styled(Stack)(({theme})=>({
    alignItems: 'center',
}));

export const Register = ({setLoggedinUser}) => {
    const [user, setUser] = useState({
        firstName:"", lastName:"",emailId:""
    });
    const [snackbar,setShowSnackbar] = useSnackBar({message: 'Failed to register. Please try again.' , type:'error' });
    const navigate = useNavigate();

    const handleChange = (e) =>{
        let field = e.target.name, value = e.target.value;
        setUser((user)=>({...user, [field] : value}));
    }

    const registerUser = (e) =>{
            addUser(user).then(response => {
                if(response){
                    setLoggedinUser(response);
                    navigate('/home');
                }else{
                    setShowSnackbar(true);
                }
            });
    }
    const isFirstNameValid = user.firstName && user.firstName.length > 3;
    const isLastNameValid = user.lastName && user.lastName.length > 3;
    const isEmailValid = user.emailId && user.emailId.includes("@");
    const isFormValid = isEmailValid && isFirstNameValid && isLastNameValid;

    return (
        <StyledStack spacing={2} justifyContent="center" alignItems={"center"}>
            <Typography variant="h2" component={"h4"} color="primary" onClick={()=> {navigate(`/`);}}>Sports Registrations</Typography>
            {snackbar}
            <TextField   label="First Name" 
                required
                error = {!isFirstNameValid}
                value={user.firstName}
                name="firstName"
                onChange={handleChange}
            />
             <TextField   label="Last Name" 
             required
                error = {!(isLastNameValid)}
                value={user.lastName}
                name="lastName"
                onChange={handleChange}
            />
             <TextField   label="Email ID"
             required
                error={!(isEmailValid)}
                value={user.emailId}
                name= {"emailId"}
                onChange={handleChange}
                helperText={isEmailValid ? "" : "Invalid Email"}
            />

            <Button color="secondary" disabled={!isFormValid}  startIcon={<LibraryAddTwoTone />}  onClick={registerUser} type="submit">Register</Button>
        </StyledStack>
    );
}