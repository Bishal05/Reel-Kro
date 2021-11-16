import React,{useState,useEffect} from "react";
import {auth} from "../firebase";

export const AuthContext=React.createContext();
export function AuthProvider({children}){

    const [user,setUser]=useState();
    const [loading,setLoading]=useState(false);


    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email, password);
    } 

    function signout(){
        return auth.signOut();
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        })
        return function () {
            console.log("hello");
            unsubscribe();
        }
    },[]);

    let value={
        signup,
        login,
        signout,
        user
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}