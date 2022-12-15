import NavigationBar from "../../components/ui/NavigationBar/NavigationBar.js";
import UniversityTable from "./UniversityTable.js";

import SearchBar from "material-ui-search-bar";

function UniversityListPage() {
  return (
    <div>
      <NavigationBar />
      <div className="ulp-container">
        <p className="ulp-alert">
          <span>Universities Available for </span>
          <span>CS</span>
        </p>
        <SearchBar />
        <UniversityTable />
      </div>
    </div>
  );
}

export default UniversityListPage;
