import React from 'react';
import validate from "./validators/device-validator";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class DeviceDelete extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                idDevice: {
                    value: '',
                    placeholder: 'Id device',
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

    deleteDevice(idDevice) {
        return API_USERS.deleteDevice(idDevice, (result, status, error) => {
            if (result !== null && status === 200 ){
                console.log("Deleted succes" + result);
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
        const idDevice = this.state.formControls.idDevice.value;
        console.log(idDevice);
        this.deleteDevice(idDevice);
    }

    render() {
        return (
            <div>

                <FormGroup id='idDevice'>
                    <Label for='idDeviceField'> Device id </Label>
                    <Input name='idDevice' id='idDeviceField' placeholder={this.state.formControls.idDevice.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.idDevice.value}
                           touched={this.state.formControls.idDevice.touched? 1 : 0}
                           valid={this.state.formControls.idDevice.valid}
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

export default DeviceDelete;