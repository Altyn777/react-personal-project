// Core
import React, { PureComponent } from 'react';
import moment from "moment";

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    render () {
        return (
            <section>
                <li className = { Styles.task } >
                    <p>Задача: {this.props.message}</p>
                    <time>{moment().format('D MMMM h:mm a')}</time>
                </li>
            </section>);
    }
}
