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
            isSuccessful: "",
            numberOfECTS: "",
            grade: "",

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
                                    <th className="text-center"> Component Title at the receiving instution (as indicated in the course catalog)</th>
                                    <th className="text-center">Was the component successfully completed by the student?
                                        [Yes/No]</th>
                                    <th className="text-center"> Number of ECTS credits
                                        (or equivalent)
                                    </th>
                                    <th className="text-center">Receiving Institution Grade</th>

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
                                                value={this.state.rows[idx].componentCode}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="componentTitle"
                                                value={this.state.rows[idx].componentTitle}
                                                onChange={this.handleChange(idx)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name="isSuccessful"
                                                value={this.state.rows[idx].isSuccessful}
                                                onChange={this.handleChange(idx)}

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
