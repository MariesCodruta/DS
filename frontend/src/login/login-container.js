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
import LogInForm from './components/LogIn-form';



class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

 
    // toggleForm() {
    //     this.setState({selected: !this.state.selected});
    // }
    // reload() {
    //     this.setState({
    //         isLoaded: false,
    //     });
    //     this.toggleForm();
    //     this.fetchPersons();
    // }

    render() {
        return (
            <div>
                <LogInForm/>
            </div>
        )

    }
}


export default LoginContainer;
