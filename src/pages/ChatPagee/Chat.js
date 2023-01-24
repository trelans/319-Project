import React, { useEffect } from 'react'
import ChatContainer from './Component/ChatContainer/ChatContainer'
import Contact from './Component/Contact/Contact'
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import axios from 'axios';


export default function Chat() {
    
    var contacts = JSON.parse(localStorage.getItem("contacts"))

    /*
    useEffect(() => {
        const getContacts = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/users/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                });
                console.log(res.data.contacts);
                contacts = res.data.contacts;
                console.log(contacts);
    
            } catch (error) {}
        };
        getContacts();
    }, [contacts]);
    */
    return(<div>

        <div><NavigationBar /></div>
        <div style={{display: "flex"}}>
        <Contact contacts={contacts}/>   
        </div>


    </div>)

}