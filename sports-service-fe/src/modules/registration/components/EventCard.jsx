import {  PersonAddDisabledTwoTone, PersonAddTwoTone } from '@mui/icons-material';
import { Alert, Box, Card, CardActions, CardContent, Divider, Grid, IconButton, Snackbar, styled, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';
import { useSnackBar } from '../../../components/useSnackbar';
import { updateUserEvent } from '../api/RegistrationApi';

const StyledBox = styled(Box)(({theme})=>({
    display: 'flex', 
    alignItems: 'flex-start', 
    flexDirection:'column'
}));
const StyledTypography = styled(Typography)(({theme})=>({
  margin: '2px',
  padding: '0 6px'
}));

const Event = ({event, isRegistered, disabled, setUserEventIds, updateBusyTime}) => {    
    let startDate = new Date(event.startTime), endDate = new Date(event.endTime);
    const user = useContext(UserContext);
    const [snackbar,setShowSnackbar] = useSnackBar({message: `Failed to ${isRegistered ? "un":""}register for event - ${event.eventName}. Please try again
    ` , type:'error' });

    const registerUserEvent = (e) =>{
      updateUserEvent(user.id,event.id, isRegistered ? "unregister" : "register").then( response =>{
        if(response){
          if(isRegistered){
            setUserEventIds(ids => {
              let newSet = new Set(ids);
              newSet.delete(event.id);
              return newSet;
            });
            updateBusyTime(event,'delete');
          }else{
            setUserEventIds(ids => {
              let newSet = new Set(ids);
              newSet.add(event.id);
              return newSet;
            });
            updateBusyTime(event,'add');
          }
        }else{
          setShowSnackbar(true);
        }
      });
    }

  return (<>
     {snackbar}
     {event && (<Card sx={{display:'flex', margin:'5px', padding:'10px', alignItems:'center', height:'90px', backgroundColor: (disabled ? 'grey': 'white')}}>
                    <StyledTypography variant='h4'>{event.eventCategory[0]}</StyledTypography>
                    <Divider orientation="vertical" flexItem />
                    <StyledBox>
                        <StyledTypography variant='h6'>{event.eventName}</StyledTypography>
                        <StyledTypography variant='p' >({event.eventCategory})</StyledTypography>
                        <StyledTypography variant='p' >{`${startDate.getHours()}:${startDate.getMinutes()}  - ${endDate.getHours()}:${endDate.getMinutes()}`}</StyledTypography>
                    </StyledBox>
                    <Divider orientation="vertical" flexItem />
                    <IconButton title={isRegistered ? 'Unregister' : 'Register'} disabled={disabled} onClick={registerUserEvent}> {isRegistered ? <PersonAddDisabledTwoTone /> : <PersonAddTwoTone/>}</IconButton>
            </Card>)}
            </>
  );
}

export default Event;
