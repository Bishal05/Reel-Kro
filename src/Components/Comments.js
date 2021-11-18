import React,{useState,useEffect} from 'react'
import {database} from "../firebase";
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

function Comments({postData}) {
    const [comment, setComment] = useState(null)

    useEffect(async () => {
        let arr=[]
        for(let i=0;i<postData.comments.length;i++){
            let data=await database.comments.doc(postData.comments[i]).get();
            arr.push(data.data());
        }
        setComment(arr);
    }, [postData])
    return (
        <div>
            {
                comment==null?<CircularProgress color="secondary" />:
                <>
                {
                    comment.map((comment,index)=>(
                        <div style={{display:"flex"}}>
                            <Avatar src={comment.uProfileImage}></Avatar>
                            <p>&nbsp;&nbsp;<span style={{fontWeight:"bold"}}>{comment.uName}</span>&nbsp;&nbsp;{comment.text}</p>
                        </div>
                    ))
                }
                </>
            }
        </div>
    )
}

export default Comments
