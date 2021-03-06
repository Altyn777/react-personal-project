// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Components
import Scheduler from "../../components/Scheduler";

export class App extends Component {
    render () {
        return (
            <Scheduler />
        );
    }
}

export default hot(module)(App);
