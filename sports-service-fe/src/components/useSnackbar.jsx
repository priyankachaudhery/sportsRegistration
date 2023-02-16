import { Alert, Snackbar } from "@mui/material";
import { useState } from "react"

export const useSnackBar = ({message, type}) =>{
    const [showAlert,setShowAlert] = useState(false);
    const [messageS, setMessage] = useState(message);
    const [typeS,setType] = useState(type);
    return [(<Snackbar open={showAlert} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={() => {setShowAlert(false)}}>
                <Alert severity={typeS} onClose={() => {setShowAlert(false)}}>
                    {messageS}
                </Alert>
            </Snackbar>), setShowAlert,setMessage, setType];


}