import axios from "axios";
import React from "react";

const universities = [];  




class TableAddRows extends React.Component {


  createUniversity = async (data) => {

    //update according to data
    try {
      const res = await axios.post(`http://localhost:8080/create/newUniversity`, {
        name: "Technical University of Dortmund",
        departments: ["CS"],
        universityId: 1,
        fallSuitability: true,
        springSuitability: false,
        quota: 3,
        mobilityPeriod: "09.09.2023-04.04.2024",
        languageRequirement: [{"language": "English"}],
        erasmusCode: "D DORTMUN01",
        countryCode: "+49",
        country: "Germany",
        address: "August-Schmidt-Strasse 4, 44227 Dortmund"
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      universities.append(res.data)

    } catch (error) {}
  }

  updateUniversity = async (universityId, data) => {
    try {
      const res = await axios.patch(`http://localhost:8080/updateUniversity/${universityId}`, {
        data
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

    } catch (error) {}
  }


  deleteUniversity = async (universityId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/university/${universityId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

    } catch (error) {}
  }
  

  state = {
    rows: [{}],
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
  handleWebsiteChange = (idx) => (e) => {
    const { value } = e.target;
    const rows = [...this.state.rows];

    rows[idx].website = value;

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
  handleAddRow = () => {
    const item = {
      universityName: "",
      semester: "",
      quota: "",
      mobilityPeriod: "",
      country: "",
      website: "",
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
    const rows = [...this.state.rows];

    const isDisabled = rows[idx].disabledRow;

    if (!isDisabled) {
      rows[idx].disabledRow = true;
      this.setState({
        rows,

      });
    }
  };

  constructor(props) {
    super(props);


    this.setTableInfo = (arr) => {
      this.state.rows = arr;
      console.log(arr);

      var disabledRow = true
      this.setState({
        rows: [...this.state.rows],
      });
      console.log(this.state.rows)
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
                    <th className="text-center"> Website </th>
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
                          name="website"
                          disabled={this.state.rows[idx].disabledRow}
                          value={this.state.rows[idx].website}
                          onChange={this.handleWebsiteChange(idx)}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableAddRows;
