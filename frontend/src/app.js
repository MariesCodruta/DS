import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import UserContainer from './user/user-container';
import DeviceContainer from './device/device-container';
import LoginContainer from './login/login-container';
import MeasurementContainer from './measurement/measurement-container';

class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />
                      <Route
                        exact
                        path='/login'
                        render={() => <LoginContainer/>}
                         />
                        {/* <Route
                            exact
                            path='/person'
                            render={() => <PersonContainer/>}
                        /> */}
                        <Route
                            exact
                            path='/user'
                            render={() => <UserContainer/>}
                        />
                         <Route
                            exact
                            path='/device'
                            render={() => <DeviceContainer/>}
                        />
                          <Route
                            exact
                            path='/measurement'
                            render={() => <MeasurementContainer/>}
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
