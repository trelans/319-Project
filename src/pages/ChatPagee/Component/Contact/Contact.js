import React from 'react'
import "./contact.css"
import ChatContainer from '../ChatContainer/ChatContainer'
import jwt_decode from "jwt-decode";

export default function Contact() {

    const handleUser = (e) => {
        console.log(e)
    }

    
    const getContacts = () => {
        const contacts = jwt_decode(localStorage.getItem('token')).contacts;

        const Print = contacts.map( (item, index) => {
            return (<div className='userContainer'>
                <div style={{marginLeft: "10px"}}>
                    <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>{item.name}  {item.surname}</p>
                    <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                </div>
            </div>)
        })

        console.log(Print)
        return Print

        /*
        const userContainer = []

        /*
        for(let i = 0; i < contacts.length; i++) {

            userContainer.push(
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>{contacts[i].name}  {contacts[i].surname}</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
            )
        }
                        <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
                <div className='userContainer'>
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>Kutay</p>
                        <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>   
                    </div>
                </div>
        */

        //return userContainer;
    }
    

    //const contacts = jwt_decode(localStorage.getItem('token')).contacts;

    return(
    <div className='mainContactContainer'>
        <div>
            <div style={{width: "20pc", padding:"10px"}}>
                <input type="search" placeholder='Search Contacts' className='SearchBar'/>
            </div>

            <div className='usersDetailContainer'>
                {getContacts()}
            </div>
        </div>
        <ChatContainer/> 
    </div>)

}