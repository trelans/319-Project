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
            componentCode: "",
            componentTitle: "",
            semester: "",
            numberOfECTS: "",

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
                            <table
                                className="table table-bordered table-hover"
                                id="tab_logic"
                            >
                                <thead>
                                <tr>
                                    <th className="text-center"> # </th>
                                    <th className="text-center"> Component Code</th>
                                    <th className="text-center"> Component Title at the receiving instution (as indicated in the course catalog) </th>
                                    <th className="text-center"> Semester
                                        [e.g. autumn / spring / term] </th>
                                    <th className="text-center"> Number of ECTS credits (or equivalent)  to be awarded by the receiving institution upon successful completion </th>

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
                                                name="componentCode"
                                                value={this.state.rows[idx].courseCode}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="title"
                                                value={this.state.rows[idx].courseName}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="semester"
                                                value={this.state.rows[idx].credits}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="credits"
                                                value={this.state.rows[idx].elective}
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
