import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Time stamp',
        accessor: 'timestamp',
    },
    {
        Header: 'Energy consumption',
        accessor: 'energyConsumption',
    },
];

const filters = [
    {
        accessor: '',
    }
];

class MeasurementTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default MeasurementTable;