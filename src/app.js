import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './home/home';
import NavigationBar from './person/admin'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import Client from "./person/client";

class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>

            <Router>
                <div>
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/person'
                            render={() => <NavigationBar/>}
                        />
                        <Route
                            exact
                            path='/client'
                            render={() => <Client/>}
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
