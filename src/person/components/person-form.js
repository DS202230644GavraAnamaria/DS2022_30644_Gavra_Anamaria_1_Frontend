import React from 'react';
import validate from "./validators/person-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/person-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Alert, Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AlertTitle} from "@mui/material";
import {CloseButton} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";
const userData = {
    name: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    password: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
            minLength: 3,
            isRequired: true
        }
    },
    role: {
        value: 'CLIENT',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true
        }
    },
    user: {
        value: 'select',
        valid: true,
        touched: false,
        validationRules: {
            isRequired: true
        }
    },
}

const rol = [
    { label: "CLIENT", value:"CLIENT" },
    { label: "ADMIN", value: "ADMIN" }
];
let userFields

class PersonForm extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.state = {
            tab:0,
            oper:0,
            isLoaded: false,
            data:[],
            success:false,
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls:userData,
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


        onDataChange=(value, action) => {
            const name = action.name;
            const updatedControls = this.state.formControls;
            const updatedFormElement = updatedControls[name];
            updatedFormElement.value = value.value;
            updatedFormElement.touched = true;
            updatedFormElement.valid = true;
            let formIsValid = true;
            updatedControls[name] = updatedFormElement;
            if(this.props.oper!==2)
            for (let updatedFormElementName in updatedControls) {
                formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
            }
            this.setState({
                formControls: updatedControls,
                formIsValid: formIsValid
            });

        }


//------------------------------------------[ submit ]-----------------------------------------------------------------------

    registerUser() {
            let data;
        if(this.props.tab===0)
            data = {name: this.state.formControls.name.value, password: this.state.formControls.password.value, role: this.state.formControls.role.value,};
        else
            data={description: this.state.formControls.name.value, address: this.state.formControls.password.value, maxEnergy: this.state.formControls.role.value,user_id:null,};
        console.log(data);
        return API_USERS.postData(this.props.tab, data,(result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                this.setState(({
                    success:true,
                }));
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    deleteUser() {
        console.log(this.state.formControls.user.value);
        return API_USERS.deleteByName(this.state.tab, this.state.formControls.user.value, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                this.setState(({
                    success:true,
                }));
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    updateUser() {
        let data;
        if(this.props.tab===0)
            data = {user:this.state.formControls.user.value, name: this.state.formControls.name.value, password: this.state.formControls.password.value, role: this.state.formControls.role.value,};
        else
            data={device:this.state.formControls.user.value,description: this.state.formControls.name.value, address: this.state.formControls.password.value, maxEnergy: this.state.formControls.role.value,user_id:null,};
        console.log(data);
        return API_USERS.updateData(this.props.tab, data,(result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                this.setState(({
                    success:true,
                }));
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
       if(this.props.oper===0) this.registerUser();
       if(this.props.oper===2) this.deleteUser();
       if(this.props.oper===1) this.updateUser();
    }

    getData1() {
        API_USERS.getData(this.props.tab,(result, status, err)  => {
                if (result !== null && status === 200) {
                    let d=[];
                    for(let i=0; i<result.length;i++) {
                        let r = this.props.tab===0? result[i].name:result[i].description;
                        d.push({ label: r, value:r});
                    }
                    this.setState({
                        isLoaded: true,
                        data: d,
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
        {(this.props.tab === 1)? (userFields =["Device:", "Description:", "Address:", "Max energy/h:"]) :(userFields =["User:", "Name:", "Password:", "Rol:"])}
        this.getData1();
    }

    render() {
        return (
            <div>
                {(this.props.oper!==0 && this.state.isLoaded) && <div>
                    <FormGroup id='user'>
                <Label for='userField'> {userFields[0]}</Label>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Select name="user" options={this.state.data} id="userField"
                                  //  defaultValue={"CLIENT"}
                            onChange={this.onDataChange}/>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </FormGroup>
                </div>}
                {(this.props.oper!==2 && this.state.isLoaded)  && <div>
                    <FormGroup id='name'>
                        <Label for='nameField'> {userFields[1]} </Label>
                        <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.name.value}
                               touched={this.state.formControls.name.touched ? 1 : 0}
                               valid={this.state.formControls.name.valid}
                               required/>
                        {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                            <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                    </FormGroup>

                    <FormGroup id='password'>
                        <Label for='passwordField'>  {userFields[2]}  </Label>
                        <Input name='password' id='passwordField'
                               onChange={this.handleChange}
                               defaultValue={this.state.formControls.password.value}
                               touched={this.state.formControls.password.touched ? 1 : 0}
                               valid={this.state.formControls.password.valid}
                               required/>
                    </FormGroup>

                    <FormGroup id='role'>
                        <Label for='roleField'>  {userFields[3]} </Label>
                        {this.props.tab ===0 && <Select name="role" options={rol} id="roleField" defaultValue={"CLIENT"} onChange={this.onDataChange}/>}
                        {this.props.tab ===1 && <Input name='role' id='roleField' onChange={this.handleChange} touched={this.state.formControls.role.touched ? 1 : 0} valid={this.state.formControls.role.valid} required/>}
                    </FormGroup>
                </div>
                }
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

export default PersonForm;
