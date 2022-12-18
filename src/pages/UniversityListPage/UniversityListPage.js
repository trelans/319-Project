import NavigationBar from "../../components/ui/NavigationBar/NavigationBar.js";
import UniversityTable from "./UniversityTable.js";

import SearchBar from "material-ui-search-bar";
import {useEffect, useRef} from "react";
import axios from "axios";

function UniversityListPage() {
  
  var rowFormat = []

  const childRef = useRef()
  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:8080/universities`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      console.log(res.data)
      var curr = res.data
      childRef.current.setTableInfo(curr)

    } catch (error) {}
}, []);


  return (
    <div>
      <NavigationBar />
      <div className="ulp-container">
        <p className="ulp-alert">
          <span>Universities Available for </span>
          <span>CS</span>
        </p>
        <SearchBar />
        <UniversityTable  ref={childRef}/>
      </div>
    </div>
  );
}

export default UniversityListPage;
