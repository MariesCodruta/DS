import React from 'react';
import validate from "./validators/device-validator";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class DeviceForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                location: {
                    value: '',
                    placeholder: 'Location',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                description: {
                    value: '',
                    placeholder: 'Description',
                    valid: false,
                    touched: false,
                },
                maximEnergyConsumption : {
                    value: '',
                    placeholder: 'Maxim Energy',
                    valid: false,
                    touched: false,
                },
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

    registerdevice(device) {
        return API_USERS.insertDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted device with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let device = {
            location: this.state.formControls.location.value,
            description: this.state.formControls.description.value,
            maximEnergyConsumption: this.state.formControls.maximEnergyConsumption.value, 
        };

        console.log(device);
        this.registerdevice(device);
    }

    render() {
        return (
            <div>

                <FormGroup id='location'>
                    <Label for='locationField'> Location: </Label>
                    <Input name='location' id='locationField' placeholder={this.state.formControls.location.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.location.value}
                           touched={this.state.formControls.location.touched? 1 : 0}
                           valid={this.state.formControls.location.valid}
                           required
                    />
                    {this.state.formControls.location.touched && !this.state.formControls.location.valid &&
                    <div className={"error-message row"}> * Location must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='description'>
                    <Label for='descriptionField'> Description: </Label>
                    <Input name='description' id='description' placeholder={this.state.formControls.description.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.description.value}
                           touched={this.state.formControls.description.touched? 1 : 0}
                           valid={this.state.formControls.description.valid}
                           required
                    />
                    {this.state.formControls.description.touched && !this.state.formControls.description.valid &&
                    <div className={"error-message row"}> * Description must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='maximEnergyConsumption'>
                    <Label for='maximEnergyConsumptionField'> Maximum energy consumption: </Label>
                    <Input name='maximEnergyConsumption' id='maximEnergyConsumptionField' placeholder={this.state.formControls.maximEnergyConsumption.placeholder}
                           onChange={this.handleChange} type = "number"
                           defaultValue={this.state.formControls.maximEnergyConsumption.value}
                           touched={this.state.formControls.maximEnergyConsumption.touched? 1 : 0}
                           valid={this.state.formControls.maximEnergyConsumption.valid}
                           required
                    />
                </FormGroup>
                    <Row>
                        <Col sm={{size: '4', offset: 5}}>
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

export default DeviceForm;
