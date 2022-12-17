import sampleData from "./CommentDataSample";
import StarsTable from "./StarsTable";

function CommentTable(props) {
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
          <div>
            <td>{data.Comment}</td>
            {console.log(data.Comment)}
            <td>
              {console.log(data.Rating)}
              <StarsTable fetchedRating={data.Rating} />
            </td>
          </div>
        </tr>
      );
    });
  };
  return (
    <table className="table">
      <thead>
        <tr>{ThData()}</tr>
      </thead>
      <tbody>{tdData()}</tbody>
    </table>
  );
}

export default CommentTable;
