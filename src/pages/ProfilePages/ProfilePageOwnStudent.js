import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import img from "./profile.png";

function ProfilePageOwnStudent() {
  return (
    <div>
      <NavigationBar />
      <div className="pp-container">
        <div className="pp-center">
          <div className="pp-img-container">
            <img className="pp-img" alt="" src={img} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageOwnStudent;
