import React from 'react';
import { useSelector } from 'react-redux';

import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';
import HomeScreen from '../components/HomeScreen';
import LoginScreen from '../components/LoginScreen';


import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
    
    const {isLoggedIn} = useSelector(state => state.auth);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact isAuthenticated={isLoggedIn} path="/login" component={LoginScreen}/>
                    <PrivateRoute  path="/" isAuthenticated={isLoggedIn} component={ HomeScreen }/>
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;
