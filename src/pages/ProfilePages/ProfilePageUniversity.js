import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import img from "./image.png";
import { useRef, useState } from "react";
import { handleRequests } from "../requests";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import CommentTableUni from "./CommentTableUni";

let loaded = false;

function ProfilePageUniversity() {
  const { state } = useLocation();
  var inputName = state;

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [mobilityPeriod, setMobilityPeriod] = useState("");
  const [erasmusCode, setErasmusCode] = useState("");

  const [isLoading, setLoading] = React.useState(true);

  if (!loaded) {
    handleRequests(
      null,
      { name: `${inputName}` },
      "profile-university",
      "1",
      (response, status) => {
        setName(response.name);
        setCountry(response.country);
        setWebsiteLink(response.websiteLink);
        setFeedbacks(response.feedbacks);
        setErasmusCode(response.erasmusCode);
        setMobilityPeriod(response.mobilityPeriod);

        console.log(name);
        console.log(country);
        console.log(response.feedbacks)
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
      <div className="ppu-container">
        <div className="ppu-img-container">
          <img className="ppu-img" alt="" src={img} />
        </div>
        <div>
          <table className="ppu-table">
            <tr>
              <td>
                <h1 className="ppu-header-name">{name}</h1>
              </td>
            </tr>
            <tr>
              <td className="ppu-header-other">Country/Region:</td>
            </tr>
            <tr>
              <td className="ppu-text-other">{country}</td>
            </tr>
            <tr>
              <td className="ppu-header-other">Mobility Period:</td>
            </tr>
            <tr>
              <td className="ppu-text-other">{mobilityPeriod}</td>
            </tr>
            <tr>
              <td className="ppu-header-other">Erasmus Code:</td>
            </tr>
            <tr>
              <td className="ppu-text-other">{erasmusCode}</td>
            </tr>
          </table>
          <div class="commentTableUniversity">
            <CommentTableUni />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageUniversity;
