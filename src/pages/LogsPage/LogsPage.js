
import LogsTable from "../../components/ui/CoursePopUp/Tables/LogsTable"
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import {useRef, useState} from "react";




 function LogsPage() {



return (
    <div>
        <NavigationBar/>

    <div style={{marginTop: 10}}>
        <div>
            <h1> User's Logs</h1>
        </div>
    <LogsTable   ></LogsTable>
    </div></div>);
}
export default LogsPage;
