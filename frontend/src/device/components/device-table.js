import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'Id',
        accessor: 'idDevice',
    },
    {
        Header: 'Location',
        accessor: 'location',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'MaximEnergyConsumption',
        accessor: 'maximEnergyConsumption',
    }
];

const filters = [
    {
        accessor: '',
    }
];

class DeviceTable extends React.Component {

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

export default DeviceTable;