import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import img from "./profile.png";
import {useRef, useState} from "react";
import {handleRequests} from "../requests";
import * as React from "react";

let loaded = false;

function ProfilePageOwnIncoming() {


  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [studentId, setStudentId] = useState('')
  const [department, setDepartment] = useState('')
  const [studyCycle, setStudyCycle] = useState('')
  const [sendingInstitution, setSendingInstitution] = useState('')

  const [isLoading, setLoading] = React.useState(true)


  if(!loaded) {
    handleRequests(null, {"name": ""}, "profile-own-incoming", "1", (response, status) => {

      setName(response.name)
      setSurname(response.surname)
      setEmail(response.email)
      setStudentId(response.studentId)
      setDepartment(response.department)
      setStudyCycle(response.studyCycle)
      setSendingInstitution(response.sendingInstitution)

      console.log("student name: " + name + " " + surname)
      console.log("sending inst. : " + sendingInstitution)

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
      <div className="pp-container">
        <div className="pp-img-container">
          <img className="pp-img" alt="" src={img} />
        </div>
        <div className="pp-center">
          <table className="pp-table">
            <tr>
              <td>
                <h1 className="pp-header-name">Michael Jordan</h1>
              </td>
            </tr>
            <tr>
              <td className="pp-header-other">Bilkent ID:</td>
            </tr>
            <tr>
              <td className="pp-text-other">XXXXXXXX</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="pp-header-other">E-Mail:</td>
            </tr>
            <tr>
              <td className="pp-text-other">michael.jordan@ug.bilkent.edu.tr</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="pp-header-other">Department:</td>
            </tr>
            <tr>
              <td className="pp-text-other">Computer Science</td>
            </tr>
          </table>
        </div>
        <div className="pp-center">
          <table className="pp-table">
            <tr>
              <td>
                <h1 className="pp-header-name"> </h1>
              </td>
            </tr>
            <tr>
              <td>
                <h1 className="pp-header-name"> </h1>
              </td>
            </tr>
            <tr>
              <td className="pp-header-other">Study Cycle:</td>
            </tr>
            <tr>
              <td className="pp-text-other">Bachelor's</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="pp-header-other">Sending Institution:</td>
            </tr>
            <tr>
              <td className="pp-text-other">Kingston University</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="pp-button-container">
        <button className="pp-button">Upload Image</button>
      </div>
    </div>
  );
}

export default ProfilePageOwnIncoming;
