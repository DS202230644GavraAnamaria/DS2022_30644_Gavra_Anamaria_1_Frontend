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

class PersonContainer extends React.Component {

    constructor(props) {
        super(props);
       // this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.value = props.value;
        this.state = {
            index:0,
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchData(this.props.index);
    }


    fetchData(index) {
         API_USERS.getData(index,(result, status, err)  => {
             if (result !== null && status === 200) {
                 this.setState({
                     isLoaded: true,
                     tableData: result
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
       this.fetchData(this.props.index);
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> {this.props.index=== 0 ? "User ": (this.props.index ===1 ? "Device " : "Mapping ")}
                        Management </strong>
                </CardHeader>
                <Card>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <PersonTable tableData = {this.state.tableData} index={this.props.index}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

                {/*<Modal isOpen={this.state.selected} toggle={this.toggleForm}*/}
                {/*       className={this.props.className} size="lg">*/}
                {/*    <ModalHeader toggle={this.toggleForm}> Add Person: </ModalHeader>*/}
                {/*    <ModalBody>*/}
                {/*        <PersonForm reloadHandler={this.reload}/>*/}
                {/*    </ModalBody>*/}
                {/*</Modal>*/}
            </div>
        )

    }
}


export default PersonContainer;
