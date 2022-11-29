import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_USERS from "./admin-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Alert, Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AlertTitle} from "@mui/material";
import {CloseButton} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";
const userData = {
    device: {
        id1:'',
        value: '',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },

    user: {
        id1:'',
        value: 'select',
        valid: true,
        touched: false,
        validationRules: {
            isRequired: true
        }
    },
}


class MappingForm extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.state = {
            isLoaded: false,
            user:[],
            device:[],
            success:false,
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls:userData,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    onDataChange=(value, action) => {
        const name = action.name;
        const updatedControls = this.state.formControls;
        const updatedFormElement = updatedControls[name];
        updatedFormElement.value = value.label;
        updatedFormElement.id1 = value.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = true;
        let formIsValid = true;
        updatedControls[name] = updatedFormElement;
            for (let updatedFormElementName in updatedControls) {
                formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
            }
        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    }


//------------------------------------------[ submit ]-----------------------------------------------------------------------

    handleSubmit() {
            let data = {deviceId: this.state.formControls.device.id1, userId: this.state.formControls.user.id1, description: this.state.formControls.device.value, name: this.state.formControls.user.value,};
         console.log(data);
        return API_USERS.updateUserId(data,(result, status, error) => {
            this.setState(({
                success:true,
            }));
            if ((status !== 200 && status !== 201)) {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    getData1() {
        API_USERS.getData(0,(result, status, err)  => {
                if (result !== null && status === 200) {
                    API_USERS.getData(1,(result, status, err)  => {
                            if (result !== null && status === 200) {
                                let d=[];
                                for(let i=0; i<result.length;i++)
                                    d.push({ label: result[i].description, value:result[i].id});
                                this.setState({device: d})
                            } else {
                                this.setState(({
                                    errorStatus: status,
                                    error: err
                                }));}});
                    let d=[];
                    for(let i=0; i<result.length;i++)
                        d.push({ label: result[i].name, value:result[i].id});
                    this.setState({
                        isLoaded: true,
                        user: d,
                    })
                } else {
                    this.setState(({
                        errorStatus: status,
                        error: err
                    }));}});}
//--------------------------------------------------[ load ]-----------------------------------------------------------------
    reload() {
        this.setState({
            isLoaded: false
        });
        this.getData1();
    }

    componentDidMount() {
        this.getData1();
    }

    render() {
        return (
            <div>
                {(this.state.isLoaded) && <div>
                    <FormGroup id='device'>
                        <Label for='deviceField'> DEVICE:</Label>
                        <Select name="device" options={this.state.device} id="deviceField" onChange={this.onDataChange}/>
                    </FormGroup>
                    <FormGroup id='user'>
                        <Label for='userField'> USER:</Label>
                        <Select name="user" options={this.state.user} id="userField"onChange={this.onDataChange}/>
                    </FormGroup>
                </div>}
                <Row>
                    <Col sm={{size: '4', offset: 5}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid}
                                onClick={this.handleSubmit}> Submit </Button>
                    </Col>
                </Row>
                {this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>}
                {this.state.success === true && <Alert status='error'>
                    <AlertTitle mr={2}>Operation performed successfully!</AlertTitle>
                    <CloseButton position='absolute' right='8px' top='8px'/>
                </Alert>}
            </div>
        ) ;
    }

}

export default MappingForm;
