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

  return <div>
      <div> LOGS </div>
      {notifications?.map( (item) => {
        return (
          <div>{item.text}</div>
        )
      })}
  </div>;
}

export default LogsPage;
