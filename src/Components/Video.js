import React from 'react'
import "../Css/Video.css";
import ReactDom from 'react-dom';
function Video(props) {
    
    const handelClick=(e)=>{
        e.preventDefault();
        e.target.muted=!e.target.muted;
    }

    const handelScroll=(e)=>{
        let next=ReactDom.findDOMNode(e.target).parentNode.nextSibling;
        if(next){
            next.scrollIntoView();
            e.target.muted=!e.target.muted;
        }
    }
    return (
        <>
        <video src={props.src} onEnded={handelScroll} muted="muted" className="videos-stylling" onClick={handelClick}>

        </video>
        </>
    )
}

export default Video
