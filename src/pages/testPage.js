
import {socket} from '../App';

/*
import io from 'socket.io-client';
const socket = io.connect("http://localhost:8080");
*/

function TestPage() {
    console.log("socket: " + socket)

    const sendMessage= () => {
        socket.emit("send_message", { message : "Hello" }); 
        console.log("button clicked")
        //socket.emit("send_message", { message : "Hello" }); 
    };

    return <div className="TestPage">
        <input placeholder="Message" />
        <button onClick={sendMessage}> Send Message </button>
    </div>;
}
  
export default TestPage;
