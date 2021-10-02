import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = (props) => {
    const {token} = useSelector(state => state.auth)
    return token ? (
        <Route path={props.path} exact={props.exact} component={props.component} />
    ) : (
        <Redirect to="/admin/login" />
    )
}

export default PrivateRoute;