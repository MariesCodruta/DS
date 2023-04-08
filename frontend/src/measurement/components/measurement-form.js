import React from 'react';
import validate from "./validators/measurement-validator";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/measurement-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class MeasurementForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                timestamp: {
                    value: '',
                    placeholder: 'Time stamp',
                    valid: false,
                    touched: false,
                },
                energyConsumption: {
                    value: '',
                    placeholder: 'Energy consumption',
                    valid: false,
                    touched: false,
                },
                // id: {
                //     value: '',
                //     placeholder: 'id',
                //     valid: false,
                //     touched: false,
                // },
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

    registerMeasurement(measurement) {
        return API_USERS.insertMeasurement(measurement, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted measurement with id: " + result);
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
        let measurement = {
            timestamp: this.state.formControls.timestamp.value,
            energyConsumption: this.state.formControls.energyConsumption.value,
            idDevice:this.state.formControls.idDevice,
        };

        console.log(measurement);
        this.registerMeasurement(measurement);
    }

    render() {
        return (
            <div>

                <FormGroup id='timestamp'>
                    <Label for='timestampField'> Time stamp: </Label>
                    <Input name='timestamp' id='timestampField' placeholder={this.state.formControls.timestamp.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.timestamp.value}
                           touched={this.state.formControls.timestamp.touched? 1 : 0}
                           valid={this.state.formControls.timestamp.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='energyConsumption'>
                    <Label for='energyConsumptionField'> Energy consumption: </Label>
                    <Input name='energyConsumption' id='energyConsumptionField' placeholder={this.state.formControls.energyConsumption.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.energyConsumption.value}
                           touched={this.state.formControls.energyConsumption.touched? 1 : 0}
                           valid={this.state.formControls.energyConsumption.valid}
                           required
                    />
                </FormGroup>
                {/* <FormGroup id='id'>
                    <Label for='idField'> Id device: </Label>
                    <Input name='id' id='idField' placeholder={this.state.formControls.id.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.id.value}
                           touched={this.state.formControls.id.touched? 1 : 0}
                           valid={this.state.formControls.id.valid}
                           required
                    />
                </FormGroup> */}

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

export default MeasurementForm;
