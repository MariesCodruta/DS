import React from 'react';
import validate from "./validators/login-validator";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/LogIn-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import {withRouter} from 'react-router-dom'


class LogInForm extends React.Component {

    constructor(){
        // super(props);
        // this.toggleForm = this.toggleForm.bind(this);
        // this.reloadHandler = this.props.reloadHandler;
        	    super();
        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                username: {
                    value: '',
                    placeholder: 'Username',
                    valid: false,
                    touched: false,
                    validationRules:{
                        minLength:3,
                        isRequired:true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Password',
                    valid: false,
                    touched: false,
                }
            },
            succesLogin:{
                role:"",
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    login(user) {
        return API_USERS.LogInReq(user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                const val = JSON.stringify(result);
                this.setState({
                    succesLogin:val
                })
                console.log(this.state.succesLogin);
                localStorage.setItem("role",result.role);

                if(localStorage.getItem("role")==="ADMIN"){
                    this.props.history.push("/");
                }
                if(localStorage.getItem("role")==="CLIENT"){
                    this.props.history.push("/");
                }
            }
                else {
                    this.setState(({
                        errorStatus: status,
                        error: error
                    }));
                }
    
            });
        }

    handleSubmit() {
        let log = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
        };

        console.log(log);
        this.login(log);
    }

    render() {
        return (
            <div>
                <FormGroup id='username'>
                <Col sm={{size: '3', offset: 1}}>
                    <Label for='usernameField'> Username: </Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                    <div className={"error-message"}> * Username must have 3 characters</div>}
                    </Col>
                </FormGroup>   
                <FormGroup id='password'>
                <Col sm={{size: '3', offset: 1}}>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           type = "password"
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                    <div className={"error-message row"}> * Password must have a valid format </div>}
                    </Col>
                </FormGroup>     

                    <Row>
                        <Col sm={{size: '4', offset: 2}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                        </Col>
                    </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default withRouter(LogInForm);
