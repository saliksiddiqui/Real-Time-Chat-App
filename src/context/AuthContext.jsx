import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebas'
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider=({children})=>{
     const [currentUser, setCurrentUser]=useState({});
     

     useEffect(()=>{
        const unSub=onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            console.log(user);          
        });

        return ()=>{
          unSub()
        }
     },[]);
     
     return(
     <AuthContext.Provider value={{currentUser}} >
        {children}
     </AuthContext.Provider>
     )
   }