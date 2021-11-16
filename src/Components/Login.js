import React from 'react'
import { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import "../Css/Login.css";
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import{Link,useHistory} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";

function Login() {

    const {login,user}=useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const history=useHistory();
    const handelLogin=async(e)=>{
        e.preventDefault();
        try {
            setError("");
            // setLoader(true);
            let res=await login(email,password);
            // setLoader(false);
            console.log(res);
            console.log(user);
            history.push("/");
        } catch (error) {
            setLoader(false);
            setError(true);
            setEmail("");
            setPassword("");
        }
        
    }
    return (
        <>
            <div className="loginWrapper">
                
                <div className="imgcar" style={{backgroundImage:'url("https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png")',backgroundSize:"cover"}}>
                    <div className="car">
                        <CarouselProvider
                            visibleSlides={1}
                            totalSlides={4}
                            naturalSlideWidth={238}
                            naturalSlideHeight={423}
                            // hasMasterSpinner
                            isPlaying={true}
                            infinite={true}
                            dragEnabled={false}
                            touchEnabled={false}
                        >
                            <Slider>
                                <Slide index={0}><Image src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg"/></Slide>
                                <Slide index={1}><Image src="https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg"/></Slide>
                                <Slide index={2}><Image src="https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg"/></Slide>
                                <Slide index={3}><Image src="https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg"/></Slide>
                            </Slider>
                        </CarouselProvider>
                    </div>
                </div>

                <div className="loginCard">
                    <Card variant="outlined">
                        <CardMedia
                            image="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Black-Logo.wine.svg"
                            style={{ backgroundSize: "cover", height: "7rem", marginTop:"1.5rem"}} />
                        <CardContent>
                            {error!='' && <Alert severity="error">{error}</Alert>}
                            <TextField id="outlined-basic" size="small" label="Email" variant="outlined"  fullWidth={true} margin="dense" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <TextField id="outlined-basic" size="small" label="Password" variant="outlined"  fullWidth={true} margin="dense" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <Typography
                                gutterBottom
                                variant="h6"
                                size="small"
                                style={{fontSize:"1rem" , color: "#2e86de", textAlign: "center"}}>
                                Forget Password?
                            </Typography>
                            <Button style={{ marginTop:"0.5rem" ,backgroundColor: "#2e86de", color: "#ffffff" }} variant="Contained" fullWidth={true} onClick={handelLogin} disabled={loader}>
                                Login
                            </Button>
                        </CardContent>
                    </Card>
                    <Card  variant="outlined">
                        <Typography
                            gutterBottom
                            variant="h6"
                            size="small"
                            style={{fontSize:"1rem" , color: "#8395a7", textAlign: "center"}}>
                            Don't have a Account? <Link  style={{textDecoration:"none"}} to="/signup">Signup</Link>
                        </Typography>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Login
