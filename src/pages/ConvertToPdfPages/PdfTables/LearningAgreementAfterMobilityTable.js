import sampleData from "../sampleData";

function LearningAgreementAfterMobilityTable(props) {
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
          {column.map((v) => {
            return <td>{data[v]}</td>;
          })}
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

export default LearningAgreementAfterMobilityTable;
