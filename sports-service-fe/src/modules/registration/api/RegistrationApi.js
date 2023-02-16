import axios, { Axios } from "axios";

axios.defaults.baseURL= 'http://localhost:8080'

export const getAllEvents = () =>{
    return axios.get('/events').then(res => res.data);
}


export const getUserEvents = (userId) =>{
    return axios.get(`/events/${userId}`).then(res => res.data);
}

export const updateUserEvent = (userId,eventId,action) =>{
    return axios.post(`/events/${action}/${userId}/${eventId}`).then(res => res.data);
}