import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import InfoPageItem from "./InfoPageItem";
import { Link } from "react-router-dom";

function InfoPage() {
  return (
    <div>
      <NavigationBar />
      <div className="ip-container">
        <h1 className="ip-h1">Pre-Approval Form Information Page:</h1>
        <h2 className="ip-h2">I ACKNOWLEDGE THAT</h2>
        <InfoPageItem
          text="Failure to prepare and submit pre-approval form before the mobility
          period starts may result in courses not to be transferred."
        ></InfoPageItem>
        <InfoPageItem
          text="The forms will be discussed in the Faculty Administration Committee
          and courses will be pre-approved or rejected."
        ></InfoPageItem>
        <InfoPageItem
          text="In case the pre-approved courses could not be taken due to 
        schedule conflict or prerequisites, the student immediately emails the coordinators 
        and proposes alternative courses. Pre-approval form is amended as necessary. The 
        Faculty Administration Committee do not discuss the amendment, therefore the transfer 
        is not guaranteed unless the changed course was previously accepted in an earlier semester."
        ></InfoPageItem>
        <InfoPageItem
          text="Pre-Approval and Learning Agreement Forms SHOULD BE COMPLETED DURING THE 
        SEMESTER BEFORE THE MOBILITY STARTS"
        ></InfoPageItem>
        <InfoPageItem
          text="A transferred course may provide exemption from a requirement in the curriculum if 
        deemed to be equivalent by the Faculty/School Executive Board. It is possible for one transferred 
        course to provide exemption from one or more curriculum courses or vice versa."
        ></InfoPageItem>
        <InfoPageItem
          text="BilkentCourse Group in Pre-Approval Form Page is applicable only if there is a directly
        equivalent course in the elective group that the student is exempted from. The student will be 
        considered to have taken this course by the STARS system."
        ></InfoPageItem>
        <InfoPageItem
          text="Total ECTS credits of courses transferred upon approval SHOULD BE AT LEAST 
        30 to be ELIGIBLE TO THE ERASMUS AID. "
        ></InfoPageItem>
      </div>
      <div className="ip-center">
        <Link to="/preapproval-form-page">
          <button className="ip-button">I Accept The Terms</button>
        </Link>
      </div>
    </div>
  );
}

export default InfoPage;
