import React,{useState,useEffect} from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Video from './Video';
import Like from './Like';
import "../Css/Post.css";

function Post(props) {
    const [posts,setPost]=useState(null);
    console.log(props.user);
    useEffect(() => {
        let postArr=[];
        const unsub=database.posts.orderBy("createdAt","desc").onSnapshot((querySnapShot)=>{
            postArr=[]
            querySnapShot.forEach((doc)=>{
                console.log(doc.id);
                let data={...doc.data(),postId:doc.id}
                postArr.push(data);
            })
            setPost(postArr);
        })
        return unsub;
    }, [])
    console.log(posts);
    return (
        <div>
            {
                (posts==null || props.user==null)?<CircularProgress color="secondary" />:
                <div className="video-container">
                    {
                        posts.map((post,index)=>(
                            <React.Fragment key={index}>
                                <div className="videos">
                                    <Video src={post.Purl}></Video>
                                    <div className="fa" style={{display:"flex"}}>
                                        <Avatar src={props.user.profileURL} />
                                        <h4>{props.user.name}</h4>
                                    </div>
                                    <Like userData={props.user} postData={post}></Like>

                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Post
