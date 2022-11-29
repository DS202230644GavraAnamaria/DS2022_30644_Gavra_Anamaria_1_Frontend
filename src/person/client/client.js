import React from 'react'

import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
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
import * as API_USERS from "./client-api"
import PersonTable from "../components/person-table";
import ConsumptionForm from "./consumption-form";


const buttonStyle={
    position: 'absolute',
    left: '50%',
    backgroundColor:'lightBlue',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
}


class Client extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.state = {
            form:false,
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchData2();
    }

    toggleForm(){
        this.setState({
            form: !this.state.form,
        })
    }

    // fetchData() {
    //     let id;
    //     API_USERS.getData(0,(result, status, err)  => {
    //             if (result !== null && status === 200) {
    //                 for (let i = 0; i < result.length; i++)
    //                     if (result[i].name === localStorage.getItem("userName")) {
    //                         id = result[i].id;
    //                         break;
    //                     }
    //             }else {
    //                 this.setState({
    //                     errorStatus: status,
    //                     error: err
    //                 });}});
    //     API_USERS.getData(1,(result, status, err)  => {
    //             if (result !== null && status === 200) {
    //                 let d=[];
    //                 for(let i=0; i<result.length;i++)
    //                     if(result[i].user_id===id)
    //                         d.push(result[i]);
    //                 this.setState({
    //                     isLoaded: true,
    //                     tableData:d,
    //                 })
    //             } else {
    //                 this.setState(({
    //                     errorStatus: status,
    //                     error: err
    //                 }));
    //             }
    //         }
    //     );
    // }
  fetchData2() {
        API_USERS.getDevicesByUser( localStorage.getItem("userName"),(result, status, err)  => {
                if (result !== null && status === 200) {
                    this.setState({
                        isLoaded: true,
                        tableData:result,
                    })
                } else {
                    this.setState(({
                        errorStatus: status,
                        error: err
                    }));
                }
            }
        );
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.fetchData2();
    }


    render() {
        return (
            <div>
                <CardHeader>
                    <strong> {localStorage.getItem("userName")}'s Devices: </strong>
                </CardHeader>
                <Card>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <PersonTable tableData = {this.state.tableData} index={1}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                            <br/>
                            <br/>
                            <Button style={buttonStyle} onClick={() =>this.toggleForm()}>Daily consumption</Button>
                        </Col>
                    </Row>
                </Card>
                <Modal isOpen={this.state.form} toggle={() =>this.toggleForm()}
                       size="lg">
                    <ModalHeader toggle={() =>this.toggleForm()}> Daily consumption: </ModalHeader>
                    <ModalBody>
                        <ConsumptionForm data={this.state.tableData}/>
                    </ModalBody>
                </Modal>
            </div>
        )

    }
}


export default Client;
