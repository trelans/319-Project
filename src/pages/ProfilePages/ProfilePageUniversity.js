import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import img from "./image.png";
import { useRef, useState } from "react";
import { handleRequests } from "../requests";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

let loaded = false;

function ProfilePageUniversity() {
  const {state} = useLocation()
  var inputName = state

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
      { name: `${inputName}`},
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
            <tr>
              <td>
                <br />
              </td>
            </tr>
          </table>
          <tr>
            <td className="ppu-text-other"></td>
          </tr>
        </div>
        <a
          className="ppu-link"
          href="https://w3.bilkent.edu.tr/www/"
          target="_blank"
        >
          Official Website
        </a>
      </div>
      <div className="ppu-table-container">
        <table className="ppu-table2">
          <tr>
            <td className="ppu-td">
              <p className="ppu-table-header">Comments</p>
            </td>
            <td className="ppu-td">
              <p className="ppu-table-header">Rate</p>
            </td>
          </tr>
          <tr>
            <td className="ppu-td">
              <p className="ppu-table-other">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </td>
            <td className="ppu-td">
              <p className="ppu-table-other">4/5</p>
            </td>
          </tr>
          <tr>
            <td className="ppu-td">
              <p className="ppu-table-other">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </td>
            <td className="ppu-td">
              <p className="ppu-table-other">3/5</p>
            </td>
          </tr>
          <tr>
            <td className="ppu-td">
              <p className="ppu-table-other">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </td>
            <td className="ppu-td">
              <p className="ppu-table-other">3.5/5</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default ProfilePageUniversity;
