import { Box, Grid, styled, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getAllEvents, getUserEvents } from "../api/RegistrationApi";
import Event from "./EventCard";
import Header from "./Header";

export const Home = ({user, setLoggedinUser}) =>{
    const [events, setEvents] = useState([]);
    const [userEventIds, setUserEventIds] = useState(new Set());
    const [userBusyTime,setUserBusyTime] = useState(new Set());

    useEffect(() =>{
        getAllEvents().then((refreshedEvents)=> {
            setEvents(refreshedEvents);
        });
        getUserEvents(user.id).then((response) =>{
            setUserEventIds(new Set(response));
        });
    },[]);

    useEffect(()=>{
        if(events.length > 0  && userEventIds.size > 0){
            let callerSet = new Set();
            for(let i = 0; i < events.length; i++){
                if(userEventIds.has(events[i].id)){
                    callerSet = updateBusyTime(events[i],'add', callerSet);
                }
            }
        }
    },[events,userEventIds]);

    const updateBusyTime = (event, action, callerSet) => {
        let startDate = new Date(event.startTime), 
        endDate = new Date(event.endTime), 
        halfHourly = (startDate.getMinutes > 0), 
        busySet = new Set(callerSet ? callerSet : userBusyTime);
        console.log('before', busySet);
        if(halfHourly){
            busySet[action](`${startDate.getHours()}:30`);
        }else{
            busySet[action](`${startDate.getHours()}:0`);   
        }

        for(let i = (startDate.getHours()+1);i < endDate.getHours(); i++){
            busySet[action](`${i}:0`);
            if(halfHourly){
                busySet[action](`${i}:30`);
            }            
        }
        if(endDate.getMinutes() > 0){
            busySet[action](endDate.getHours());
        }
        console.log('after',busySet);
        setUserBusyTime(busySet);
        return busySet;
    } 

    const showAllEvents = () =>{
        console.log("insideShowEvents");
        let userEvents = [], allEvents = [];
        events.forEach((event,index) => {
            let disabled = (userEventIds.size >= 3);
            if(!disabled){
                let startDate = new Date(event.startTime), endDate = new Date(event.endTime);
                disabled = userBusyTime.has(`${startDate.getHours()}:${startDate.getMinutes > 0 ? '30' : '0'}`) || 
                userBusyTime.has(`${endDate.getMinutes() > 0 ? endDate.getHours(): (endDate.getHours() - 1)}:${endDate.getMinutes() > 0 ? '0' : '30'}`);
            }
            if(userEventIds.has(event.id)){
                userEvents.push(<Event event={event} isRegistered key={`event${index}`} setUserEventIds={setUserEventIds}  updateBusyTime={updateBusyTime}/>);
            }else{
                allEvents.push(<Event  event={event} key={`event${index}`} 
                                disabled={disabled} setUserEventIds={setUserEventIds} updateBusyTime={updateBusyTime}/>);
            }

         });

         return [allEvents,userEvents];
    }

     const [allEvents,userEvents] = useMemo(showAllEvents,[events,userEventIds,userBusyTime]);

    return (
        <Box>
            <Header setLoggedinUser={setLoggedinUser} />
            <Grid container>
                {/* <Grid item xs={12}><Button startIcon={<RefreshTwoTone/>} sx={{float:"right", margin:"8px", backgroundColor: '#efefef'}} onClick={refreshEvents.bind(this,"button")}>Refresh</Button></Grid> */}
                <Grid item xs={6} container>
                    <Grid item sx={{width: "100%", textAlign: 'center'}}>
                        <StyledTypography variant="h6"> All Events</StyledTypography>
                    </Grid>
                    <Grid container item sx={{backgroundColor: "#ededed", padding:"5px", margin:"2px", height:"90%"}}>
                       {allEvents}
                    </Grid>
                </Grid>
                <Grid item xs={6} container>
                    <Grid item sx={{width: "100%", textAlign: 'center'}}>
                        <StyledTypography variant="h6"> Registered Events</StyledTypography>
                    </Grid>
                    <Grid container item sx={{backgroundColor: "#ededed", padding:"5px",margin:"2px",  height:"90%"}}>
                        {userEvents}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}


const StyledTypography = styled(Typography)(({theme})=>({
    margin: '2px',
    padding: '6px',
    backgroundColor: theme.palette.secondary.light,
    color: 'white'
  }));