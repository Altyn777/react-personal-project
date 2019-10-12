// Core
import React, { Component } from 'react';

// Components
import Task from "../Task";
import Scheduler from "../Scheduler";

// Instruments
import Styles from './styles.m.css';

export default class Schedule extends Component {
    render () {
        return (
            <section className = { Styles.schedule }>
                <Scheduler />
                <Task />
            </section>
        );
    }
}
