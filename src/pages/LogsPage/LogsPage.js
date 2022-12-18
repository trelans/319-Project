import axios from "axios";

async function LogsPage() {

  var notifications;

  async function getLogs() {

    const res = await axios.get(`http://localhost:8080/notifications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    notifications = res.data
    console.log(notifications)
  }

await getLogs();

import LogsTable from "../../components/ui/CoursePopUp/Tables/LogsTable"
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";

function LogsPage() {
  return <div><NavigationBar/>
    <div style={{marginTop: 10}}>
    <LogsTable></LogsTable></div></div>;
}

export default LogsPage;
