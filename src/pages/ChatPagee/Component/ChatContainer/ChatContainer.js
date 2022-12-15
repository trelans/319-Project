import React from 'react'
import "./ChatContainer.css"
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function ChatContainer({currentChatUser}) {
    console.log(currentChatUser)
    const user = jwt_decode(localStorage.getItem('token'));
    const msgContainer = []

    const [message, setMessage] = useState([]);
    const [inputmessage, setinputmessage] = useState('')

    useEffect(() => {

        const getmessage = async () => {
            try {
                const res = await axios.get( `http://localhost:8080/get/chat/msg/${user._id}/${currentChatUser.objectId}`, {

                })
                setMessage(res.data)
            } catch (error) {
                
            }
        }
        getmessage()
    }, [currentChatUser.objectId])

    const sendmsg = () => {

        const myMessage = {
            myself: true,
            message: inputmessage
        }
        fetch("http://localhost:8080/msg", {method:"POST", mode: "cors",  headers:{'Content-Type': 'application/JSON', 'Authorization': `Bearer ${localStorage.getItem('token')}`}, body: JSON.stringify({
            from: user._id,
            to: currentChatUser.objectId,
            message: inputmessage
        }) })

        setMessage(message.concat(myMessage))
    }

    console.log(message)

    return(
        <div className='MainChatContainer'>
            <div>
                <div style={{display:"flex", marginLeft:"11px", marginTop:"10px", backgroundColor:"rgb(241 243 241)", width:"96.8%", padding:"5px", borderRadius:"10px"}}>
                    <p style={{marginTop: "10px", marginLeft: "10px"}}>{currentChatUser?.name} {currentChatUser?.surname}</p>
                </div>

                <div className='msgContainer'>
                {message?.map( (item) => (
                    <div>
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