import React from "react";

class TableAddRows extends React.Component {
    state = {
        rows: [{}],
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
            courseCode: "",
            courseName: "",
            numberOfECTS: "",
            grade: "",
            courseCode2: "",
            credits: "",
            elreq: "",
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
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row clearfix">
                        <div className="col-md-12 column">
                            <table style={{background: "#354259", color : "white"}}
                                className="table table-bordered table-hover"
                                id="tab_logic"
                            >
                                <thead>
                                <tr>
                                    <th colSpan={5} className="text-center"> # </th>
                                    <th colSpan={5} className="text-center"> Course Code</th>

                                </tr>
                                <tr>
                                    <th className="text-center" > # </th>
                                    <th className="text-center"> Course Code</th>
                                    <th className="text-center"> Course Name</th>
                                    <th className="text-center"> ECTS Credits for Erasmus Exchange Students</th>
                                    <th className="text-center"> Grade </th>
                                    <th className="text-center"> Course Code and Name for a Required Course,
                                        Elective Group Name for an Elective Requirement
                                    </th>
                                    <th className="text-center"> Credits
                                    </th>
                                    <th className="text-center"> Elective Requirement Exemptions only: Course code(s) of directly equivalent course(s), if any
                                    </th>
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
                                                value={this.state.rows[idx].courseCode}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="courseName"
                                                value={this.state.rows[idx].courseName}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="numberOfECTS"
                                                value={this.state.rows[idx].numberOfECTS}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="grade"
                                                value={this.state.rows[idx].grade}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>

                                        <td>
                                            <input
                                                type="number"
                                                name="courseCode2"
                                                value={this.state.rows[idx].courseCode2}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="credits"
                                                value={this.state.rows[idx].credits}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="elreq"
                                                value={this.state.rows[idx].elreq}
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
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button onClick={this.handleAddRow} className="btn btn-primary">
                                Add Row
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TableAddRows;
