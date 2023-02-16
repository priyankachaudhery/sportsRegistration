import axios from "axios"

export const addUser = async (user) =>{
    try {
        const response = await axios.post('/user', user);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const loginUser = async (userId) =>{
    try {
        const response = await axios.post('/user/me', {emailId : userId});
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}