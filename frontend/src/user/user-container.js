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
import UserForm from "./components/user-form";
import UserUpdate from './components/user-update';

import * as API_USERS from "./api/user-api"
import UserTable from "./components/user-table";
import UserDelete from './components/user-delete';
import { withRouter } from 'react-router-dom';



class UserContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.toggleFormUpdate=this.toggleFormUpdate.bind(this);
        this.toggleFormDelete=this.toggleFormDelete.bind(this);
        this.reloadUpdate=this.reloadUpdate.bind(this);
        this.reloadDelete=this.reloadDelete.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            selectedUpdate:null,
            selectedDelete:null,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchPersons();
    }

    fetchPersons() {
        return API_USERS.getUsers((result, status, err) => {

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
    toggleFormUpdate(){
        this.setState({selectedUpdate: !this.selectedUpdate,});
    }

    toggleFormDelete(){
        this.setState({selectedDelete: !this.selectedDelete,});
    }


    reload() {
        this.setState({
            isLoaded: false,
            selectedUpdate:false
        });
        this.toggleForm();
        this.fetchPersons();
    }

    reloadDelete() {
        this.setState({
            isLoaded: false,
        });
        this.toggleFormDelete();
        this.fetchPersons();
    }

    reloadUpdate() {
        this.setState({
            isLoaded: false,
        });
        this.toggleFormUpdate();
        this.fetchPersons();
    }

    render() {
        if(localStorage.getItem("role")==="ADMIN"){
        return (
            <div>
                <CardHeader>
                    <strong> User Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="danger" onClick={this.toggleForm}>Add User </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '10', offset: 1}}>
                        <Button color="danger">Get User </Button>
                            {this.state.isLoaded && <UserTable tableData = {this.state.tableData}/>}
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
                            <Button color="danger" onClick={this.toggleFormDelete}>Delete user</Button>
                        </Col>
                    </Row>
                    <br/>
                </Card>

                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="danger" onClick={this.toggleFormUpdate}>Update user</Button>
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
                    <ModalHeader toggle={this.toggleForm}> Add user: </ModalHeader>
                    <ModalBody>
                        <UserForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedDelete} toggle={this.toggleFormDelete}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormDelete}> Delete user: </ModalHeader>
                    <ModalBody>
                        <UserDelete reloadHandler={this.reloadDelete}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleFormUpdate}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdate}> Update user: </ModalHeader>
                    <ModalBody>
                        <UserUpdate reloadHandler={this.reloadUpdate}/>
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


export default withRouter(UserContainer);
