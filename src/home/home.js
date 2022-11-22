import React, { useState } from "react";
import * as API_USERS from "../person/api/person-api";

import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

export default function home() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    let history = useHistory();



    const loginSubmit = () => {
            let data={uname: email, password: password };
            console.log(data);
           return  API_USERS.login( data,(result, status) => {
                if (result !== null && (status === 200 || status === 201)) {
                    if(result==='ADMIN')
                        history.push("/person");
                    else {
                        localStorage.setItem("userName", email);
                            history.push("/client" );
                    }
                } else {
                    Swal.fire(
                        'Invalid credentials!',
                        'Press the button!',
                        'error');
                    history.push("/");
                }
            });
        };

    return (
        <div className="App">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form id="loginform">
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />

                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />

                            </div>

                        </form>
                    </div>
                    <button  className="btn btn-primary" onClick={loginSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

