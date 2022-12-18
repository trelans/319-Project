import LogsTable from "../../components/ui/CoursePopUp/Tables/LogsTable"
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";

function LogsPage() {
  return <div><NavigationBar/>
    <div style={{marginTop: 10}}>
    <LogsTable></LogsTable></div></div>;
}

export default LogsPage;
