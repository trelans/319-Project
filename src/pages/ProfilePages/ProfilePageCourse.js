import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import { useRef, useState } from "react";
import { handleRequests } from "../requests";
import * as React from "react";
import { Link } from "react-router-dom";
import CommentTableCourse from "./CommentTableCourse";

let loaded = false;

function ProfilePageCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [requiredLanguage, setRequiredLanguage] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [syllabusLink, setSyllabusLink] = useState("");
  const [university, setUniversity] = useState("");
  const [ectsCredits, setEctsCredits] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = React.useState(true);

  if (!loaded) {
    handleRequests(
      null,
      { courseCode: "CS315" },
      "profile-course",
      "1",
      (response, status) => {
        setCourseName(response.courseName);
        setCourseCode(response.courseCode);
        setRequiredLanguage(response.requiredLanguage);
        setWebsiteLink(response.websiteLink);
        setSyllabusLink(response.syllabusLink);
        setUniversity(response.university);
        setEctsCredits(response.ectsCredits);
        setComments(response.comments);

        console.log(courseName);
        console.log(courseCode);
        console.log(university);
      }
    );
    loaded = true;
    setLoading(false);
  }

  if (isLoading) {
    return (
      <div className={"Page"}>
        <NavigationBar />
        <div className="App">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      <div>
        <div className="ppc-center">
          <div>
            <p className="ppc-header-name">Course Name:</p>
            <p className="ppc-header-other">{courseName}</p>
          </div>
        </div>
        <hr className="ppc-line"></hr>
        <div className="ppc-container">
          <table className="ppc-table">
            <tr>
              <td className="ppc-header-other">Course Code: </td>
              <td className="ppc-text-other">{courseCode}</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="ppc-text-other">
                <a
                  className="ppu-link"
                  href="https://www.cs.bilkent.edu.tr/~eraytuzun/teaching/cs319/"
                  target="_blank"
                >
                  Website
                </a>
              </td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="ppc-text-other">
                <a
                  className="ppu-link"
                  href="https://stars.bilkent.edu.tr/syllabus/view/CS/319/20221"
                  target="_blank"
                >
                  Syllabus
                </a>
              </td>
            </tr>
          </table>
          <table className="ppc-table">
            <tr>
              <td className="ppc-header-other">Required Language: </td>
              <td className="ppc-header-other">{requiredLanguage}</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="ppc-header-other">ECTS Credits: </td>
              <td className="ppc-header-other">{ectsCredits}</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="ppc-header-other">University: </td>
              <td className="ppc-header-other">{university}</td>
            </tr>
          </table>
        </div>
        <div class="commentTableCourse">
          <CommentTableCourse />
        </div>
      </div>
    </div>
  );
}

export default ProfilePageCourse;
