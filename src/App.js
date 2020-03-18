import React from 'react';
import './App.css';
import Login from './Login';
import Posts from './Posts';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (!localStorage.getItem('isLoggedIn') ? <Component {...props} /> : <Redirect to="/" />)}
        />
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (localStorage.getItem('isLoggedIn') ? <Component {...props} /> : <Redirect to="/" />)}
        />
    );
};

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <div className="App">
                    <AuthRoute exact path="/" component={Login} />
                    <PrivateRoute path="/posts" component={Posts} />
                </div>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
