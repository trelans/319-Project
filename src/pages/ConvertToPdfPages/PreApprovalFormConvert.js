import { handleRequests } from "../requests";
import { useState } from "react";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import * as React from "react";

const durationTable = {
  0: "Fall",
  1: "Spring",
  2: "Year",
};

let loaded = false;

function PreApprovalFormConvert() {
  const [candName, setCandName] = useState("");
  const [candSurname, setCandSurname] = useState("");
  const [candID, setCandID] = useState("");
  const [candDepartment, setCandDepartment] = useState("");
  const [hostUniName, setHostUniName] = useState("");
  const [duration, setDuration] = useState("");
  const [ECTSCredits, setECTSCredits] = useState("");
  const [courses, setCourses] = useState([]);
  const [bilkentCourses, setBilkentCourses] = useState([]);
  const [isLoading, setLoading] = React.useState(true);

  // the if clause is required otherwise react continuously rerender the page
  if (!loaded) {
    handleRequests(null, {}, "preapproval-student", "1", (response, status) => {
      setCandName(response.name);
      setCandSurname(response.surname);
      setCandID(response.id);
      setCandDepartment(response.department);
      setHostUniName(response.appliedInstitution);
      setDuration(durationTable[response.duration]);
      setECTSCredits(response.ECTSCredits);
      setCourses(response.courses);
      setBilkentCourses(response.bilkentCourses);
    });
    loaded = true;
    setLoading(false);
  }

  if (isLoading) {
    return (
      <div className={"Page"}>
        <div className="App">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <table className="cp-table">
          <tr className="cp-row">
            <td className="cp-col">Name:</td>
            <td className="cp-col">{candName}</td>
          </tr>
          <tr className="cp-row">
            <td className="cp-col">Surname:</td>
            <td className="cp-col">asgsadgf</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default PreApprovalFormConvert;
