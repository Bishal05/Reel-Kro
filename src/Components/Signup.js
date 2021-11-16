import React,{useState,useEffect,useContext} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import "../Css/Signup.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link,useHistory} from "react-router-dom";
import { AuthContext } from "../Context/AuthContext"
import {database,storage} from "../firebase";


function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const history=useHistory();
    const {signup} = useContext(AuthContext);
    
    
    const handelFile= async()=>{
        if(file==null){
            setError("Please provide a profile pic");
            setTimeout(() => {
                setError('')
            }, 2000);
            return;
        }

        try {
            setError('');
            setLoading(true);
            let userObj=await signup(email,password);
            let uid=userObj.user.uid;
            console.log(uid);
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
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
            async function fn3() {
                // link get 
                let downloadurl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadurl)
                database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    name:name,
                    profileURL: downloadurl , 
                    createdAt: database.getTimeStamp(),
                    postIds:[]
                })
                setLoading(false);
                history.push("/");
            }
            
        }catch(error) {
            setError(error);
            setTimeout(() => {
                setError('')
            }, 2000);
            return;
        }
    }
    
    return (
        <>
            <div className="signupWrapper">
                <div className="signupCard">
                    <Card variant="outlined">
                        <CardMedia
                            image="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Black-Logo.wine.svg"
                            style={{ backgroundSize: "cover", height: "7rem", marginTop:"1.5rem"}} />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h6"
                                size="small"
                                style={{color: "#8395a7", textAlign: "center"}}>
                                Sign up to see photos and videos from your friends.
                            </Typography>
                            {error!='' && <Alert severity="error">{error}</Alert>}
                            <TextField id="outlined-basic" size="small" label="Email" variant="outlined"  fullWidth={true} margin="dense" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <TextField id="outlined-basic" size="small" label="Password" variant="outlined"  fullWidth={true} margin="dense" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <TextField id="outlined-basic" size="small" label="Full Name" variant="outlined"  fullWidth={true} margin="dense" value={name} onChange={(e)=>setName(e.target.value)}/>
                            <Button style={{marginTop:"0.5rem"}} color="secondary" variant="outlined" fullWidth={true} startIcon={<CloudUploadIcon/>} component="label">
                                Upload Profile Pic
                                <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}></input>
                            </Button>
                            <Button style={{ marginTop:"0.5rem" ,backgroundColor: "#2e86de", color: "#ffffff" }} disable={loading} onClick={handelFile} variant="Contained" fullWidth={true}>
                                Sign Up
                            </Button>
                        </CardContent>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h6"
                                size="small"
                                style={{fontSize:"1rem" , color: "#8395a7", textAlign: "center"}}>
                                By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <Typography
                            gutterBottom
                            variant="h6"
                            size="small"
                            style={{fontSize:"1rem" , color: "#8395a7", textAlign: "center"}}>
                            Have a Account? <Link  style={{textDecoration:"none"}} to="/login">Login</Link>
                        </Typography>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Signup
