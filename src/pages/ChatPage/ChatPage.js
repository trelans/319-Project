
import React from 'react';

import ChatsPage from "./ChatsPage/index.tsx";
import { ContextProvider } from "../../functions/context.tsx";

const ChatPage = () => {
return (
    <ContextProvider>
         <ChatsPage/>
    </ContextProvider>
    );



}




export default ChatPage;
