import NavigationBar from "../../components/ui/NavigationBar/NavigationBar.js";
import UniversityTable from "./UniversityTable.js";

function UniversityListPage() {
  return (
    <div>
      <NavigationBar />
      <div className="ulp-container">
        <p className="ulp-alert">
          <span>Universities Available for </span>
          <span>CS</span>
        </p>
        <UniversityTable />
      </div>
    </div>
  );
}

export default UniversityListPage;
