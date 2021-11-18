import React,{useContext,useEffect,useState} from 'react'
import {AuthContext} from "../Context/AuthContext";
import { database } from '../firebase';
import Post from './Post';
import UploadFile from './UploadFile';
import NavBar from './NavBar';


function Feed() {
    const {user,signout}=useContext(AuthContext);
    const [userData,setUserData]=useState(); 
    useEffect(()=>{
        const unsub=database.users.doc(user.uid).onSnapshot((snapshot)=>{
            setUserData(snapshot.data())
        })
        return()=>{unsub()}
    },[user])
    return (
        <>
        <NavBar userData={userData}/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <UploadFile user={userData}/>
            <Post user={userData}></Post>
        </div>
        </>
    )
}

export default Feed
