import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import img from "./profile.png";

import {useRef, useState} from "react";
import {handleRequests} from "../requests";
import * as React from "react";

let loaded = false;

function ProfilePageOwnOthers() {

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const [isLoading, setLoading] = React.useState(true)


  if(!loaded) {
    handleRequests(null, {"surname": "Alkan"}, "profile-own-others", "1", (response, status) => {

      setName(response.name)
      setSurname(response.surname)
      setEmail(response.email)
      setRole(response.role)

      console.log("other name: " + name + " " + surname)
      console.log("role : " + role)

    })
    loaded = true
    setLoading(false)
  }

  if (isLoading) {
    return <div className={"Page"}>
      <NavigationBar/>
      <div className="App">Loading...</div>
    </div>;
  }

  return (
    <div>
      <NavigationBar />
      <div className="pp-container2">
        <div className="pp-img-container">
          <img className="pp-img" alt="" src={img} />
        </div>
        <div>
          <table className="pp-table2">
            <tr>
              <td>
                <h1 className="pp-header-name">Can Alkan</h1>
              </td>
            </tr>
            <tr>
              <td className="pp-header-other">Bilkent ID:</td>
            </tr>
            <tr>
              <td className="pp-text-other">XXXX</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="pp-header-other">E-Mail:</td>
            </tr>
            <tr>
              <td className="pp-text-other">calkan@cs.bilkent.edu.tr</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="pp-header-other">Role:</td>
            </tr>
            <tr>
              <td className="pp-text-other">Erasmus Coordinator</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="pp-button-container">
        <button className="pp-button2">Upload Image</button>
      </div>
    </div>
  );
}

export default ProfilePageOwnOthers;
