import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom";
import { database } from '../firebase';
import NavBar from "./NavBar"
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import LikesComment from "./LikesComment";
import AddComment from './AddComment';
import Comments from './Comments';
import "../Css/Profile.css"

function Profile() {
    const {id}=useParams();
    const [userData,setUserData]=useState(null);
    const [post,setPost]=useState(null);

    const [open, setOpen] =useState(null);
    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserData(snap.data())
        })
    },[id])

    useEffect(async()=>{
        if(userData!=null){
            let postArr=[];
            for(let i=0;i<userData.postIds.length;i++){
                let postdata=await database.posts.doc(userData.postIds[i]).get();
                postArr.push({...postdata.data(),postId:postdata.id});
            }
            setPost(postArr);
        }

    })
    return (
        <>
        {
            post==null || userData==null?<CircularProgress color="secondary" />:
            <>
                <NavBar userData={userData}></NavBar>
                <div className="spacer"></div>
                <div className="container">
                    <div className="upper-part">
                        <div className="profile-img">
                            <img src={userData.profileURL}></img>
                        </div>
                        <div className="info">
                            <Typography variant="h5">
                                Email:{userData.email}
                            </Typography>
                            <Typography variant="h6">
                                Posts:{userData.postIds.length}
                            </Typography>
                        </div>
                    </div>
                    <hr style={{marginBottom:"2.5rem",marginTop:"2.5rem"}}/>
                    <div className="profile-video-container">
                        {
                            post.map((post,index)=>(
                                <React.Fragment key={index}>
                                    <div className="videos">
                                        <video muted="muted"  onClick={()=>handleClickOpen(post.pid)}>
                                            <source src={post.Purl}></source>
                                        </video>
                                        <Dialog
                                            open={open==post.pid}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth="true"
                                            maxWidth="md"
                                        >
                                            <div className="modal-container">
                                                <div className="video-modal">
                                                    <video  autoPlay={true} muted="muted" controls>
                                                        <source src={post.Purl}></source>
                                                    </video>
                                                </div>
                                                <div className="comment-container">
                                                    <Card className="card1" style={{padding:"1rem"}}>
                                                        <Comments postData={post}></Comments>
                                                    </Card>
                                                    <Card variant="outlined" className="card2">
                                                        <Typography style={{textAlign:"center"}}>
                                                            {post.likes.length==0?'':`Liked by ${post.likes.length} users`}
                                                        </Typography>
                                                        <div style={{display:"flex"}}>
                                                            <LikesComment userData={userData} postData={post} style={{display:"flex",justifyContent:"center",alignItems:"center"}}></LikesComment>
                                                            <AddComment userData={userData} postData={post}></AddComment>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>                                        
                                        </Dialog>
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
                
            </>
        }
        </>
    )
}

export default Profile
