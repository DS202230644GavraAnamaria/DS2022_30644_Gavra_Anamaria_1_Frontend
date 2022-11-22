import React from "react";
import Table from "../../commons/tables/table";

const columns0 = [
    {
        Header: 'NAME',
        accessor: 'name',
    },
    {
        Header: 'PASSWORD',
        accessor: 'password',
    },
    {
        Header: 'ROLE',
        accessor: 'role',
    }
];
const columns1 = [
    {
        Header: 'DESCRIPTION',
        accessor: 'description',
    },
    {
        Header: 'ADDRESS',
        accessor: 'address',
    },
    {
        Header: 'MAX_ENERGY',
        accessor: 'max_energy',
    }
];
const columns2 = [
    {
        Header: 'USER',
        accessor: 'name',
    },
    {
        Header: 'DEVICE',
        accessor: 'description',
    }
];

const filters = [
    {
        accessor: 'name',
    }
];
const filters1 = [
    {
        accessor: 'description',
    }
];
const filters2 = [
    {
        accessor: 'name',
    }
];

class PersonTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            index: this.props.index
        };
    }

    render() {
        return (
            <div>
            <Table
                data={this.state.tableData}
                columns={this.state.index=== 0 ? columns0 : (this.state.index ===1 ? columns1 : columns2)}
                search={(this.props.index === 0) ? filters: (this.props.index === 1 ? filters1: filters2)}
                pageSize={5}
            />
            </div>
        )
    }
}

export default PersonTable;