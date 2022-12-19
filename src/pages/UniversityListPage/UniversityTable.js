import axios from "axios";
import React from "react";


class TableAddRows extends React.Component {

  createUniversity = async (data) => {
    //create according to data
    try {
      const res = await axios.post(`http://localhost:8080/create/newUniversity`, data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res.data)
    } catch (error) {}
  };

  updateField = () =>{

  }

  updateUniversity = async (universityId, data) => {
    try {
  
      if(!data) {
        throw new Error("No data is provided")
      }

      console.log(data)
  
      const res = await axios.patch(
        `http://localhost:8080/updateUniversity/${universityId}`, data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      console.log(res.data)
    } catch (error) {}
  }
  

  deleteUniversity = async (universityId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/university/${universityId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {}
  };

  state = {
    rows: [{}],
    option: 0
  };
  handleNameChange = (idx) => (e) => {
    const { value } = e.target;
    const rows = [...this.state.rows];

    console.log(rows);

    rows[idx].universityName = value;

    this.setState({
      rows,
    });
  };
  handleSemesterChange = (idx) => (e) => {
    const { value } = e.target;
    const rows = [...this.state.rows];

    rows[idx].semester = value;

    this.setState({
      rows,
    });
  };
  handleQuotaChange = (idx) => (e) => {
    const { value } = e.target;
    const rows = [...this.state.rows];

    rows[idx].quota = value;

    this.setState({
      rows,
    });
  };
  handleMobPerChange = (idx) => (e) => {
    const { value } = e.target;
    const rows = [...this.state.rows];

    rows[idx].mobilityPeriod = value;

    this.setState({
      rows,
    });
  };
  handleCountryChange = (idx) => (e) => {
    const { value } = e.target;
    const rows = [...this.state.rows];

    rows[idx].country = value;

    this.setState({
      rows,
    });
  };

  handleAppLinkChange = (idx) => (e) => {
    const { value } = e.target;
    const rows = [...this.state.rows];

    rows[idx].applicationLink = value;

    this.setState({
      rows,
    });
  };

  handleErasmusCodeChange = (idx) => (e) => {
    const { value } = e.target;
    const rows = [...this.state.rows];

    rows[idx].erasmusCode = value;

    this.setState({
      rows,
    });
  };

  handleAddressChange = (idx) => (e) => {
    const { value } = e.target;
    const rows = [...this.state.rows];

    rows[idx].address = value;

    this.setState({
      rows,
    });
  };

  handleSaveAll = (idx) => {

  }

  handleAddRow = () => {
    this.setState({
      option: 1
    });
    const item = {
      universityName: "",
      semester: "",
      quota: "",
      mobilityPeriod: "",
      country: "",
      applicationLink: "",
      erasmusCode: "",
      address: "",
      disabledRow: false,
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
    });

  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });

    this.deleteUniversity(this.state.rows[idx]._id)
  };

  handleEditSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    const isDisabled = rows[idx].disabledRow;

    if (isDisabled) {
      rows[idx].disabledRow = false;
      this.setState({
        rows,
      });
    }
  };

  handleSaveSpecificRow = (idx) => () => {

      const selectedUniversity = this.state.rows[idx]
      const rows = [...this.state.rows];

      const isDisabled = rows[idx].disabledRow;

      console.log("clicked")
      if (!isDisabled) {
        rows[idx].disabledRow = true;
        this.setState({
          rows,
        });
      }

    //update
    if(this.state.option == 0) {

      this.updateUniversity(selectedUniversity._id, this.state.rows[idx])
    } else if (this.state.option == 1) { //create
      console.log(this.state.rows[idx])
      this.createUniversity(this.state.rows[idx])
    }
    
    this.setState({
      option: 0
    });

  };

  constructor(props) {
    super(props);

    this.setTableInfo = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i].disabledRow = true;
      }
      this.state.rows = arr;
      console.log(arr);

      this.setState({
        rows: [...this.state.rows],
      });
      console.log(this.state.rows);
    };
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center"> University Name</th>
                    <th className="text-center"> Semester </th>
                    <th className="text-center"> Quota </th>
                    <th className="text-center"> Mobility Period </th>
                    <th className="text-center"> Country </th>
                    <th className="text-center"> Application Link </th>
                    <th className="text-center"> Erasmus Code </th>
                    <th className="text-center"> Address</th>
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
                          name="universityName"
                          disabled={this.state.rows[idx].disabledRow}
                          value={this.state.rows[idx].name}
                          onChange={this.handleNameChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="semester"
                          disabled={this.state.rows[idx].disabledRow}
                          value={this.state.rows[idx].semester}
                          onChange={this.handleSemesterChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="quota"
                          disabled={this.state.rows[idx].disabledRow}
                          value={this.state.rows[idx].quota}
                          onChange={this.handleQuotaChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="mobilityPeriod"
                          disabled={this.state.rows[idx].disabledRow}
                          value={this.state.rows[idx].mobilityPeriod}
                          onChange={this.handleMobPerChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="country"
                          disabled={this.state.rows[idx].disabledRow}
                          value={this.state.rows[idx].country}
                          onChange={this.handleCountryChange(idx)}
                          className="form-control"
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          name="applicationLink"
                          disabled={this.state.rows[idx].disabledRow}
                          value={this.state.rows[idx].applicationLink}
                          onChange={this.handleAppLinkChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="erasmusCode"
                          disabled={this.state.rows[idx].disabledRow}
                          value={this.state.rows[idx].erasmusCode}
                          onChange={this.handleErasmusCodeChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="address"
                          disabled={this.state.rows[idx].disabledRow}
                          value={this.state.rows[idx].address}
                          onChange={this.handleAddressChange(idx)}
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
                          onClick={this.handleEditSpecificRow(idx)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={this.handleSaveSpecificRow(idx)}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={this.handleAddRow} className="btn btn-primary">
                Add University
              </button>
                {(this.state.options != 0) ?   <button onClick={this.handleSaveAll} className="btn btn-primary" style={{marginLeft : 5}}>
                Save
              </button> : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableAddRows;
