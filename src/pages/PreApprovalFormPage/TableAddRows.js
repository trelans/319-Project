import React from "react";


class TableAddRows extends React.Component {


  constructor(props) {
    super(props);

    this.bar = (ar) =>  {

     this.handleAddCourse(ar )

    }

    this.car = (zar) =>  {

      this.handleEqCourse(zar )

    }
    this.getTableInfo = () =>  {

      return this.state.rows

    }

    this.setTableInfo = (arr) => {
      this.state.rows = arr;
      console.log(arr);

      this.setState({
        rows: [...this.state.rows],
      });
    };
  }


  state = {
    rows: [],
    addingEquivalentCourse: false,
    currentCourseNameForEq: "",
    sendTotalCredits: 0
  };

  

  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      rows,
    });
  };
  handleAddRow = () => {
    const item = {
      idx:"",
      courseCode: "",
      courseName: "",
      credits: "",
      elective: "",
      courseCodeEq: "",
      courseNameEq: "",
      creditsEq: "",
      partNo: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };

  handleAddCourse = (row) => {

      if (row["courseCode"] === undefined) {
        console.log("Prevent")
        return
      }

      const item = {
        idx: "",
        courseCode: row["courseCode"],
        courseName:  row["courseName"],
        credits:  row["credit"],
        elective: row["courseType"],
        courseCodeEq: "",
        courseNameEq: "",
        creditsEq: "",
        partNo: "",
      };
      this.setState({
        rows: [...this.state.rows, item],
      });


  };

  handleEqCourse = (zar) => {

    if (zar["courseCode"] === undefined) {
      console.log("Prevent")
      return
    }
    this.state.sendTotalCredits += zar["credit"]
    this.props.sendTotalCredits(this.state.sendTotalCredits)
    const item = {
      idx: "",
      courseCode: this.state.rows[zar["idx"]]["courseCode"],
      courseName: this.state.rows[zar["idx"]]["courseName"] ,
      credits: this.state.rows[zar["idx"]]["credits"],
      elective:  this.state.rows[zar["idx"]]["courseType"],
      courseCodeEq: zar["courseCode"],
      courseNameEq: zar["courseName"],
      creditsEq: zar["credit"],
      partNo: zar["mergeNo"],
    };


    const newIds = this.state.rows.slice() //copy the array
    newIds[zar["idx"]] = item //execute the manipulations
    this.setState({rows: newIds}) //set the new state

  };

  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
    });
  };

  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    const row = rows.splice(idx, 1);
    this.setState({ rows });
  };

  handleAddEquivalentCourse = (idx) => () => {
    let arr = this.state.rows[idx]
    arr["idx"] = idx
    this.props.currentCourseForEq(arr)
     // this.setState(...this.state.addingEquivalentCourse, true)
     // this.setState(...this.state.currentCourseNameForEq, this.state.rows[idx])
  };



  render() {

    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
                style={{backgroundColor:"#a5c9ca"}}
              >
                <thead>
                  <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center"> Course Code</th>
                    <th className="text-center"> Course Name </th>
                    <th className="text-center"> Credits </th>
                    <th className="text-center"> Course Type </th>
                    <th className="text-center"> Course Code </th>
                    <th className="text-center"> Course Name </th>
                    <th className="text-center"> Credits </th>
                    <th className="text-center"> Part No </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      <td>
                        <input
                          type="text"
                          name="courseCode"
                          disabled="true"
                          value={this.state.rows[idx].courseCode}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="courseName"
                          disabled="true"
                          value={this.state.rows[idx].courseName}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="credits"
                          disabled="true"
                          value={this.state.rows[idx].credits}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="elective"
                          disabled="true"
                          value={this.state.rows[idx].elective}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="courseCodeBilkent"
                          disabled="true"
                          value={this.state.rows[idx].courseCodeEq}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="courseNameBilkent"
                          disabled="true"
                          value={this.state.rows[idx].courseNameEq}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                            type="text"
                            name="creditBilkent"
                            disabled="true"
                            value={this.state.rows[idx].creditsEq}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="partNo"
                          disabled="true"
                          value={this.state.rows[idx].partNo}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={this.handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                      </td>
                      <td>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={this.handleAddEquivalentCourse(idx)}
                        >
                          Add Equivalent Course
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableAddRows;
