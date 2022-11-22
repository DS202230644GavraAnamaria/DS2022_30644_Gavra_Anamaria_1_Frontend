import React from 'react'

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
import * as API_USERS from "./api/person-api"
import PersonTable from "./components/person-table";

class Client extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        let id;
        API_USERS.getData(0,(result, status, err)  => {
                if (result !== null && status === 200) {
                    for (let i = 0; i < result.length; i++)
                        if (result[i].name === localStorage.getItem("userName")) {
                            id = result[i].id;
                            break;
                        }
                }else {
                    this.setState(({
                        errorStatus: status,
                        error: err
                    }));}});
        API_USERS.getData(1,(result, status, err)  => {
                if (result !== null && status === 200) {
                    let d=[];
                    for(let i=0; i<result.length;i++)
                        if(result[i].user_id===id)
                            d.push(result[i]);
                    this.setState({
                        isLoaded: true,
                        tableData:d,
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
        this.fetchData();
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
                        </Col>
                    </Row>
                </Card>
            </div>
        )

    }
}


export default Client;
