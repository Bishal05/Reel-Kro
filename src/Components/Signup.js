import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import "../Css/Signup.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import{Link} from "react-router-dom";


function Signup() {
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
                            {true && <Alert severity="error">This is an error alert — check it out!</Alert>}
                            <TextField id="outlined-basic" size="small" label="Email" variant="outlined"  fullWidth={true} margin="dense"/>
                            <TextField id="outlined-basic" size="small" label="Password" variant="outlined"  fullWidth={true} margin="dense"/>
                            <TextField id="outlined-basic" size="small" label="Full Name" variant="outlined"  fullWidth={true} margin="dense"/>
                            <Button style={{marginTop:"0.5rem"}} color="secondary" variant="outlined" fullWidth={true} startIcon={<CloudUploadIcon/>} component="label">
                                Upload Profile Pic
                                <input type="file" accept="image/*" hidden></input>
                            </Button>
                            <Button style={{ marginTop:"0.5rem" ,backgroundColor: "#2e86de", color: "#ffffff" }} variant="Contained" fullWidth={true}>Sign Up</Button>
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
