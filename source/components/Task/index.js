// Core
import React, { PureComponent } from 'react';
import moment from "moment";
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    static propTypes = {
        message: PropTypes.string.isRequired,
    };

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
        const { message } = this.props;

        return (
            <section>
                <li className = { Styles.task } >
                    <p>{message}</p>
                    <time>{moment().format('D MMMM h:mm a')}</time>
                </li>
            </section>);
    }
}
