import { maxWidth } from "@mui/system";
import sampleData from "./CommentDataSampleCourse";
import StarsTable from "./StarsTable";

function CommentTableCourse(props) {
  // get table column
  const column = Object.keys(sampleData[0]);
  // get table heading data
  const ThData = () => {
    return column.map((data) => {
      return <th key={data}>{data}</th>;
    });
  };
  // get table row data
  const tdData = () => {
    return sampleData.map((data) => {
      return (
        <tr>
          <td>{data.Comment}</td>
          {console.log(data.Comment)}
          <td>
            {console.log(data.Rating)}
            <StarsTable fetchedRating={data.Rating} />
          </td>
        </tr>
      );
    });
  };
  return (
    <div style={{ maxHeight: 400, overflowY: "scroll" }}>
      <table className="table" style={{ maxWidth: 1000, minWidth: 1000 }}>
        <thead>
          <tr>{ThData()}</tr>
        </thead>
        <tbody>{tdData()}</tbody>
      </table>
    </div>
  );
}

export default CommentTableCourse;
