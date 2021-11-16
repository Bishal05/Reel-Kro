import React,{useContext} from 'react'
import {AuthContext} from "../Context/AuthContext";

function Feed() {
    const {signout}=useContext(AuthContext);
    return (
        <div>
            <h1>Welcome to feed</h1>
            <button onClick={signout}>Logout</button>
        </div>
    )
}

export default Feed
