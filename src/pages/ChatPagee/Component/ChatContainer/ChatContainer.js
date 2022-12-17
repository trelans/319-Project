import React, { useRef } from 'react'
import "./ChatContainer.css"
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {io} from 'socket.io-client'
import { useLocation } from 'react-router';

export default function ChatContainer({currentChatUser}) {
    console.log(currentChatUser)
    console.log(JSON.stringify(currentChatUser) ) 
    const user = jwt_decode(localStorage.getItem('token'));
    const id = user._id
    const {state} = useLocation()

    if(JSON.stringify(currentChatUser) === '{}' && state) {
        currentChatUser = state
    }


    const scrollRef = useRef()
    const socket = useRef()
    const [message, setMessage] = useState([]);
    const [inputmessage, setinputmessage] = useState('')
    const [arrivalMessage, setarrivalMessage] = useState(null)

    useEffect(() => {

        const getmessage = async () => {
            try {
                const res = await axios.get( `http://localhost:8080/get/chat/msg/${id}/${currentChatUser.objectId}`, {

                })
                setMessage(res.data)
            } catch (error) {
                
            }
        }
        getmessage()
    }, [currentChatUser])

    useEffect(() => {
        
        if(currentChatUser && (JSON.stringify(currentChatUser) === '{}' || currentChatUser.fromProfile)) {
            socket.current = io("http://localhost:8080")
            socket.current.emit("addUser", id)
        }
        
    }, [currentChatUser, id])



    console.log(socket)

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior:"smooth"})
        }
    }, [message])

    const sendmsg = () => {
        try {   
            
            if(JSON.stringify(currentChatUser) === '{}') {
                throw new Error('No contact is selected')
            }

            const myMessage = {
                myself: true,
                message: inputmessage
            }

            socket.current.emit("send-msg", {
                to: currentChatUser.objectId,
                from: id,
                message: inputmessage
            })

            fetch("http://localhost:8080/msg", {method:"POST", mode: "cors",  headers:{'Content-Type': 'application/JSON', 'Authorization': `Bearer ${localStorage.getItem('token')}`}, body: JSON.stringify({
                from: id,
                to: currentChatUser.objectId,
                message: inputmessage
            }) })

            setMessage(message.concat(myMessage)) 

        } catch (error) {
            console.log(error)
            alert(error)
        }

    }

    useEffect (() => {
        if(socket.current) {
            socket.current.on("msg-receive", (msg) => {
                console.log(msg)
                setarrivalMessage({myself:false, message:msg})
            })
        }
    }, [arrivalMessage])

    useEffect(() => {
        arrivalMessage && setMessage((pre) => [...pre, arrivalMessage])
    }, [arrivalMessage])

    return(
        <div className='MainChatContainer'>
            <div>
                <div style={{display:"flex", marginLeft:"11px", marginTop:"10px", backgroundColor:"rgb(241 243 241)", width:"96.8%", padding:"5px", borderRadius:"10px"}}>
                    <p style={{marginTop: "10px", marginLeft: "10px"}}>{currentChatUser?.name} {currentChatUser?.surname}</p>
                </div>

                <div className='msgContainer'>
                {message?.map( (item) => (
                    <div ref={scrollRef}>
                        {item?.myself === false ?
                            <div className= "msg">
                                <p className='msgTxt'>
                                    {item?.message}
                                </p>
                            </div> 
                            : 
                            <div className= "msgUser">
                                <p className='msgTxt'>
                                    {item?.message}
                                </p>
                            </div>
                        }
                    </div>
                ))}

                </div>
                <div className='msgSenderContainer'>
                    <input type="text" placeholder='write your message' onChange={(e) => setinputmessage(e.target.value)} name="" id="" className='msgInput'/>
                    <button className='msgButton' onClick={sendmsg}>Send</button>
                </div>

            </div>
        </div>)
}