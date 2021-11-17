import React,{useState} from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from "uuid";
import { database,storage } from '../firebase';

function UploadFile(props) {
    console.log(props.user);
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);

    const handelInput=async(file)=>{
        if(file==null){
            setError("Please Upload A file");
            setTimeout(()=>{
                setError("");
            },2000)
            return;
        }

        if(file.size/(1024*1024)>100){
            setError("Uploaded file is too big");
            setTimeout(()=>{
                setError("");
            },2000)
            return;
        }
        let uid=uuidv4();
        setLoading(true);
        const uploadTaskListener = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        // fn1 -> progress
        // fn2 -> error 
        // fn3-> success
        uploadTaskListener.on('state_changed' , fn1,  fn2 , fn3);
        function fn1(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }
        function fn2(error) {
            setError(error);
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false);
            return;
        }
        function fn3() {
            // link get 
            uploadTaskListener.snapshot.ref.getDownloadURL().then((url)=>{
                let obj={
                    likes:[],
                    comments:[],
                    pid:uid,
                    Purl:url,
                    uName:props.user.name,
                    uProfile:props.user.profileURL,
                    userid:props.user.userId,
                    createdAt:database.getTimeStamp()
                }
                database.posts.add(obj).then(async(ref)=>{
                    let res=await database.users.doc(props.user.userId).update({
                        postIds:props.user.postIds!=null?[...props.user.postIds,ref.id]:[ref.id]
                    })
                }).then(()=>{
                    setLoading(false);
                }).catch(error=>{
                    setError(error);
                    setTimeout(()=>{
                        setError('');
                    },2000)
                    setLoading(false);
                })
            });
            
              
            // setLoading(false);;
        }
    }
    return (
        <div>
            {
                error!=''? <Alert severity="error">{error}</Alert>:
                <>
                    <input type="file" accept="video/*" id="upload-file" style={{display:"none"}} onChange={(e)=>handelInput(e.target.files[0])}></input>
                    <label htmlFor="upload-file">
                        <Button
                         variant="outlined"
                         color="secondary"
                         disabled={loading}
                         component="span"
                         startIcon={<MovieCreationIcon></MovieCreationIcon>}
                        >
                            &nbsp;Upload File
                        </Button>
                    </label>
                    {loading && <LinearProgress color="secondary" style={{marginTop:"3%"}}/>}
                </>
            }
        </div>
    )
}

export default UploadFile
