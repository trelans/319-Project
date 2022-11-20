import { Link } from "react-router-dom";

function MainPage() {
  return <div><div>Main Page</div><Link to="/settings-page"><button>Settings</button></Link></div>;
}

export default MainPage;
