import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import DeviceForm from "./components/device-form";

import * as API_USERS from "./api/device-api"
import DeviceTable from "./components/device-table";
import DeviceUpdate from './components/device-update';
import DeviceDelete from './components/device-delete';
import { withRouter } from 'react-router-dom';



class DeviceContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleFormDelete=this.toggleFormDelete.bind(this);
        this.toggleFormUpdate=this.toggleFormUpdate.bind(this);
        this.reload = this.reload.bind(this);
        this.reloadUpdate=this.reloadUpdate.bind(this);
        this.reloadDelete=this.reloadDelete.bind(this);
        this.state = {
            selected: false,
            selectedDelete:false,
            selectedUpdate:false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchPersons();
    }

    fetchPersons() {
        return API_USERS.getDevices((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }
    toggleFormDelete() {
        this.setState({selectedDelete: !this.state.selectedDelete});
    }
    toggleFormUpdate() {
        this.setState({selectedUpdate: !this.state.selectedUpdate});
    }


    reload() {
        this.setState({
            isLoaded: false,
        });
        this.toggleForm();
        this.fetchPersons();
    }

    reloadDelete() {
        this.setState({
            isLoaded: false
        });
        this.toggleFormDelete();
        this.fetchPersons();
    }

    reloadUpdate() {
        this.setState({
            isLoaded: false
        });
        this.toggleFormUpdate();
        this.fetchPersons();
    }



    render() {
        if(localStorage.getItem("role")==="ADMIN"){
        return (
            <div>
                <CardHeader>
                    <strong> Device Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="danger" onClick={this.toggleForm}>Add Device </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '11', offset: 1}}>
                        <Button color="danger">Get Device </Button>
                            {this.state.isLoaded && <DeviceTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="danger" onClick={this.toggleFormDelete}>Delete device</Button>
                        </Col>
                    </Row>
                    <br/>
                </Card>
                
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="danger" onClick={this.toggleFormUpdate}>Update device</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>

                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add device: </ModalHeader>
                    <ModalBody>
                        <DeviceForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedDelete} toggle={this.toggleFormDelete}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormDelete}> Delete device: </ModalHeader>
                    <ModalBody>
                        <DeviceDelete reloadHandler={this.reloadDelete}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleFormUpdate}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdate}> Update device: </ModalHeader>
                    <ModalBody>
                        <DeviceUpdate reloadHandler={this.reloadUpdate}/>
                    </ModalBody>
                </Modal>
            </div>
        )

    }
    else{
        return(
            <div>
              <h2 align= "center" > <font color= "red"> You don't have access! </font></h2> 
            </div>
    ) 
    }
}
}
 export default withRouter(DeviceContainer);


