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

import * as API_USERS from "./api/measurement-api"
import MeasurementTable from "./components/measurement-table";
import MeasurementUpdate from './components/measurement-update';
import MeasurementDelete from './components/measurement-delete';
import MeasurementForm from './components/measurement-form';
import { withRouter } from 'react-router-dom';



class MeasurementContainer extends React.Component {

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
        return API_USERS.getMeasurement((result, status, err) => {

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
        return (
            <div>
                <CardHeader>
                    <strong> Measurement </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="danger" onClick={this.toggleForm}>Add measurement </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '11', offset: 1}}>
                        <Button color="danger">Get measurement </Button>
                            {this.state.isLoaded && <MeasurementTable tableData = {this.state.tableData}/>}
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
                            <Button color="danger" onClick={this.toggleFormDelete}>Delete measurement</Button>
                        </Col>
                    </Row>
                    <br/>
                </Card>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="danger" onClick={this.toggleFormUpdate}>Update measurement</Button>
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
                    <ModalHeader toggle={this.toggleForm}> Add measurement: </ModalHeader>
                    <ModalBody>
                        <MeasurementForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedDelete} toggle={this.toggleFormDelete}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormDelete}> Delete measurement: </ModalHeader>
                    <ModalBody>
                        <MeasurementDelete reloadHandler={this.reloadDelete}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleFormUpdate}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdate}> Update measurement: </ModalHeader>
                    <ModalBody>
                        <MeasurementUpdate reloadHandler={this.reloadUpdate}/>
                    </ModalBody>
                </Modal>
            </div>
        )

    }
}


export default withRouter(MeasurementContainer);
