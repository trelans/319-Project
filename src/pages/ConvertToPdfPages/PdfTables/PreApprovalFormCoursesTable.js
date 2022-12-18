function PreApprovalFormCoursesTable(props) {
  const tableData = [];
  for (
    let index = 0;
    index < JSON.parse(localStorage.getItem("preapprovalinfo")).length;
    index++
  ) {
    tableData.push(JSON.parse(localStorage.getItem("preapprovalinfo"))[index]);
    console.log(tableData[index]);
  }

  console.log(JSON.parse(localStorage.getItem("preapprovalinfo")));
  console.log(JSON.parse(localStorage.getItem("preapprovalinfo"))[0]);

  // get table column
  const column = Object.keys(tableData[0]);
  // get table heading data
  const ThData = () => {
    return column.map((data) => {
      return <th key={data}>{data}</th>;
    });
  };
  // get table row data
  const tdData = () => {
    return tableData.map((data) => {
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

export default PreApprovalFormCoursesTable;
