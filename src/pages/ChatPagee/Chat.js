import React from 'react'
import ChatContainer from './Component/ChatContainer/ChatContainer'
import Contact from './Component/Contact/Contact'
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";


export default function Chat() {

    return(<div>

        <div><NavigationBar /></div>
        <div style={{display: "flex"}}>
        <Contact/>   
        </div>


    </div>)

}