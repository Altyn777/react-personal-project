// Core
import React, { Component } from 'react';

// Components
import Task from "../Task";
import Scheduler from "../Scheduler";

export default class Schedule extends Component {
    render () {
        return (
            <section>
                <Scheduler />
                <Task />
            </section>
        );
    }
}
