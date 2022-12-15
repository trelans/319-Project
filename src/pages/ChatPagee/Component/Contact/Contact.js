import React from 'react'
import "./contact.css"
import ChatContainer from '../ChatContainer/ChatContainer'
import jwt_decode from "jwt-decode";
import { useState } from 'react';

export default function Contact() {

    const user = jwt_decode(localStorage.getItem('token'))
    const contacts = user.contacts;
    const[currentChatUser, setcurrentChatUser] = useState({})

    const handleUser = (e) => {
        setcurrentChatUser(e)
    }

    return(
    <div className='mainContactContainer'>
        <div>
            <div style={{width: "20pc", padding:"10px"}}>
                <input type="search" placeholder='Search Contacts' className='SearchBar'/>
            </div>

            <div className='usersDetailContainer'>
                {contacts?.map( (item) => (
                <div>
                {item?.objectId !== user._id ?
                    <div className='userContainer' onClick={(e) => handleUser(item)}>
                        <div style={{marginLeft: "10px"}}>
                            <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>{item.name}  {item.surname}</p>
                            <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                        </div>
                    </div> : ""
                }
                </div>
                ))}
            </div>
        </div>
        <ChatContainer currentChatUser={currentChatUser}/> 
    </div>)

}