import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import LecturerView from "../../components/LecturerView/index";

export default class LecturerRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path='/lecturer' component={LecturerView}/>
            </Switch>
        );
    }
}
