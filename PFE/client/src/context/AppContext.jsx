import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext()
export const AppContextProvider = (props)=>{
    axios.defaults.withCredentials=true
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn , setIsLoggedin] = useState(false)
    const [userData , setUserData] = useState(false)
    const getAuthState = async()=> {
        try{
         const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
         if(data.success){
             setIsLoggedin(true)
             getUserData()
            }
 
        }catch(err){
         console.log(err.message)
        } 
     }
    const getUserData = async()=> {
        try{
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.succes ? setUserData(data.userData) : toast.error(data.message)         
        }catch(err){
            toast.error(err.message)
        }

    }
    useEffect(()=>{
        getAuthState();
    },[])
    const value = {
        backendUrl,
        isLoggedIn,setIsLoggedin,
        userData,setUserData,
        getUserData
    }
    return( 

    <AppContent.Provider value={value}>
        {props.children}
    </AppContent.Provider>    

)}