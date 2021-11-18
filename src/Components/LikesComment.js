import React,{useState,useEffect} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../Css/Like.css";
import { database } from '../firebase';

function Like({userData,postData}) {
    const [like,setLike]=useState(null);
    useEffect(() => { 
        let check=postData.likes.includes(userData.userId)?true:false
        setLike(check);
    }, [postData])

    const handelLike=()=>{
        if(like==true){
            let narr=postData.likes.filter((el)=>{
                return el!=userData.userId
            })
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }else{
            let narr=[...postData.likes,userData.userId];
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }
    }
    return (
        <div>
            {
                like!=null?
                <>
                    {
                        like==true?<FavoriteIcon style={{padding:"1rem"}} onClick={handelLike} className={`like`}/>:<FavoriteIcon style={{color:"black",cursor:"pointer",padding:"1rem"}} onClick={handelLike}/>
                    }
                </>:
                <>

                </>
            }
        </div>
    )
}

export default Like
