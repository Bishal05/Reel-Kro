import React,{useState,useEffect} from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Video from './Video';
import Like from './Like';
import LikesComment from "./LikesComment";
import AddComment from './AddComment';
import Comments from './Comments';
import "../Css/Post.css";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


function Post(props) {
    const [posts,setPost]=useState(null);
    console.log(props.user);
    
    const [open, setOpen] =useState(null);
    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

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

    const callBack=(entries)=>{
        entries.forEach((entry)=>{
            let ele=entry.target.childNodes[0];
            console.log(ele);
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }
    let obsever=new IntersectionObserver(callBack,{threshold:0.6});

    useEffect(()=>{
        const elements=document.querySelectorAll(".videos")
        elements.forEach((element)=>{
            obsever.observe(element);
        })

        return ()=>{
            obsever.disconnect();
        }
    },[posts])
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
                                    <ChatBubbleIcon className="comments-style" onClick={()=>handleClickOpen(post.pid)}></ChatBubbleIcon>
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
                                                        <LikesComment userData={props.user} postData={post} style={{display:"flex",justifyContent:"center",alignItems:"center"}}></LikesComment>
                                                        <AddComment userData={props.user} postData={post}></AddComment>
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
            }
        </div>
    )
}

export default Post
