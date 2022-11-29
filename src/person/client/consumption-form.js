import React from 'react';
import Button from "react-bootstrap/Button";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Alert, Col, Row} from "reactstrap";
import { FormGroup,  Label} from 'reactstrap';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AlertTitle} from "@mui/material";
import {CloseButton} from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import * as API_USERS from "./client-api"
import { LineChart, Line, XAxis, YAxis } from "recharts";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

const data = [{
        year: 2001,
        value: 100},
    {
        year: 2002,
        value: 101},
];

const rand = 300;

const style1={
    width:'100%',
    maxWidth:'700px'
}


class ConsumptionForm extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        //this.reloadHandler = this.props.reloadHandler;
        this.state = {
            isLoaded: false,
            data:[],
            cons:[],
            errorStatus: 0,
            error: null,
            formIsValid: false,
            formControls:{ device: {
                    value: 'Select device',
                    touched: false,
                },
                day: {
                    value: '',
                    touched: false,
                },},
        };
     //   this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    handleChange =(value) => {
        const updatedControls = this.state.formControls;
        const updatedFormElement = updatedControls["day"];
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedControls["day"] = updatedFormElement;
        this.setState({
            formControls: updatedControls,
        });
    };


    onDataChange=(value) => {
        const updatedControls = this.state.formControls;
        const updatedFormElement = updatedControls["device"];
        updatedFormElement.value = value.value;
        updatedFormElement.touched = true;
        updatedControls["device"] = updatedFormElement;
        this.setState({
            formControls: updatedControls,
            formIsValid: true
        });
    }


//------------------------------------------[ submit ]-----------------------------------------------------------------------

    // registerUser() {
    //     let data;
    //     if(this.props.tab===0)
    //         data = {name: this.state.formControls.name.value, password: this.state.formControls.password.value, role: this.state.formControls.role.value,};
    //     else
    //         data={description: this.state.formControls.name.value, address: this.state.formControls.password.value, maxEnergy: this.state.formControls.role.value,user_id:null,};
    //     console.log(data);
    //     return API_USERS.postData(this.props.tab, data,(result, status, error) => {
    //         if (result !== null && (status === 200 || status === 201)) {
    //             this.setState(({
    //                 success:true,
    //             }));
    //             this.reloadHandler();
    //         } else {
    //             this.setState(({
    //                 errorStatus: status,
    //                 error: error
    //             }));
    //         }
    //     });
    // }
    //
    deleteUser() {
        console.log(this.state.formControls.day.value);
        let d=this.state.formControls.day.value;
        let date = d.getFullYear();
        if (d.getMonth<10) date=date+"0";
        date+=(String)(d.getMonth()+1);
        if (d.getDate()<10) date=date+"0";
        date+=d.getDate()+this.state.formControls.device.value;
        console.log(date);
        return API_USERS.getConsByDay(date, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                let d=[];
                console.log(result)
                for(let i=0; i<result.length;i++){
                    let toProcess = new Date(result[i].time);
                    d.push({ label: toProcess.getHours(), value:result[i].value});
                }
                console.log(d);
                this.setState(({
                    success:true,
                    cons:d,
                }));
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }});
    }


    insertCons() {API_USERS.insertCons((result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            this.reloadHandler();
        } else {
            this.setState(({
                errorStatus: status,
                error: error
            }));
        }});}


    handleSubmit() {
        console.log(this.state.formControls.day.value);
        console.log(this.state.formControls.device.value);
        this.deleteUser();

    }

    componentDidMount() {
        let d = [];
        for (let i = 0; i < this.props.data.length; i++) {
            d.push({label: this.props.data[i].description, value: this.props.data[i].description});
        }
        this.setState({
            isLoaded: true,
            data: d,
        })



    }

//--------------------------------------------------[ load ]-----------------------------------------------------------------
    reload() {
        this.setState({
            isLoaded: false
        });
        this.getData1();
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////



    render() {
        return (
            <div>
                    <FormGroup id='device'>
                        <Label for='deviceField'>Device:</Label>
                        <div className="container">
                                    <Select name="device" options={this.state.data} id="deviceField"
                                        //  defaultValue={this.state.data[0]}
                                            onChange={this.onDataChange}/>
                        </div>
                    </FormGroup>
                <div  id='day'>
                    <Calendar  name="day"  onChange={this.handleChange} maxDate={new Date()} value={new Date()} />
                </div>
                <Row>
                    <Col sm={{size: '4', offset: 5}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid}
                                onClick={this.handleSubmit}> Submit </Button>
                    </Col>
                </Row>

                <div style={styles}>

                    <LineChart
                        width={500}
                        height={300}
                        data={this.state.cons}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
                        <XAxis dataKey="label" />
                        <YAxis />
                    </LineChart>
                </div>

                {this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>}
                {this.state.success === true && <Alert status='error'>
                    <AlertTitle mr={2}>Operation performed successfully!</AlertTitle>
                    <CloseButton position='absolute' right='8px' top='8px'/>
                </Alert>}
            </div>
        ) ;}}
export default ConsumptionForm;