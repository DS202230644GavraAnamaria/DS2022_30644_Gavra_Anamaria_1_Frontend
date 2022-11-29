import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './home/home';
import Admin from './person/admin/admin'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import Client from "./person/client/client";
class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
            <Router>
                {console.log("+++++++++++++++++++++++"+(localStorage.getItem("role")==="ADMIN"))}
                <div>
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/admin'
                            render={() =>(localStorage.getItem("role")==="ADMIN")? <Admin/>:<Home/>}
                        />
                        <Route
                            exact
                            path='/client'
                            render={() => (localStorage.getItem("role")==="CLIENT")? <Client/>:<Home/>}
                        />
                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
