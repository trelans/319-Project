import React, { useState } from "react";
//import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link, useNavigate } from "react-router-dom";

function SearchBarMain({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const navigate = useNavigate();

  const handleFilter = (event) => {
    const element = document.querySelector(".main-absolute");
    element.style.zIndex = -1;

    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = data
      ? data.filter((value) => {
          return value.name.toLowerCase().includes(searchWord.toLowerCase());
        })
      : [];

    if (searchWord === "" || !data) {
      setFilteredData([]);
      element.style.zIndex = 0; //search bar change: when its deleted main page is clickable too
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    const element = document.querySelector(".main-absolute");
    element.style.zIndex = 0;
  };

  const handleClick = (item) => {
    if (item.itemType == "university") {
      navigate("/profile-university", { state: item.name });
    } else {
      navigate("/profile-other", { state: item.id });
    }
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          readOnly={data ? false : true}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" onClick={(e) => handleClick(value)}>
                <p>{value.name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBarMain;
