import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from '../firebase';


function AddComment({userData,postData}) {
    const [text,setText]=useState('');

    const handelPost=()=>{
        let obj={
            text:text,
            uProfileImage:userData.profileURL,
            uName:userData.name
        }

        database.comments.add(obj).then((doc)=>{
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments,doc.id]
            })
        })
        setText('');
    }

    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <TextField id="filled-basic"  size="small" label="Comment" variant="filled" value={text} onChange={(e)=>setText(e.target.value)} />
            <Button variant="outlined" onClick={handelPost}>Post</Button>
        </div>
    )
}

export default AddComment
