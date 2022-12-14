import React from 'react'
import "./contact.css"
import ChatContainer from '../ChatContainer/ChatContainer'

export default function Contact() {

    const handleUser = (e) => {
        console.log(e)
    }
    return(
    <div className='mainContactContainer'>
        <div>
            <div style={{width: "20pc", padding:"10px"}}>
                <input type="search" placeholder='Search Contacts' className='SearchBar'/>
            </div>

            <div className='usersDetailContainer'>
                <div className='userContainer' onClick={(e) =>handleUser(e)}>
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
            </div>
        </div>
        <ChatContainer/> 
    </div>)

}