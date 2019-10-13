// Core
import React, { PureComponent } from 'react';
import moment from "moment";
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    static propTypes = {
        message: PropTypes.string.isRequired,
        // created: PropTypes.number.isRequired, // number? date?
    };

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
        created = this.props.created,
    }) => ({
        id,
        completed,
        favorite,
        message,
        created, // moment().format('D MMMM h:mm a')  // local?
    });

    render () {
        const { message, created } = this.props;

        return (
            <section>
                <li className = { Styles.task } >
                    <p>{message}</p>
                    <time>{moment.unix(created).format('D MMMM h:mm a')}</time>
                </li>
            </section>);
    }
}
