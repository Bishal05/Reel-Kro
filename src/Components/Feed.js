import React,{useContext,useEffect,useState} from 'react'
import {AuthContext} from "../Context/AuthContext";
import { database } from '../firebase';
import Post from './Post';
import UploadFile from './UploadFile';


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
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <div className="comp" style={{width:"50%"}}>
                <h1>Welcome to feed</h1>
                <button onClick={signout}>Logout</button>
            </div>
            <UploadFile user={userData}/>
            <Post user={userData}></Post>
        </div>
    )
}

export default Feed
