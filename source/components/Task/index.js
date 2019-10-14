// Core
import React, { Component } from 'react';
import moment from "moment";
import { string, number, bool, func } from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import Checkbox from "../../theme/assets/Checkbox";
import Star from "../../theme/assets/Star";
import Edit from "../../theme/assets/Edit";
import Remove from "../../theme/assets/Remove";

export default class Task extends Component {
    static propTypes = {
        _deleteTask:   func.isRequired,
        // created: PropTypes.number.isRequired, // number? date?
        _favoriteTask: func.isRequired,
        favorite:      bool.isRequired,
        id:            string.isRequired,
        message:       string.isRequired,
    };

    constructor () {
        super();
        this._favoriteTask = this._favoriteTask.bind(this);
        this._deleteTask = this._deleteTask.bind(this);
    }

    _deleteTask () {
        const { _deleteTask, id } = this.props;

        _deleteTask(id);
    }

    _favoriteTask () {
        const { _favoriteTask, id, favorite } = this.props;

        _favoriteTask(id, favorite);
    }

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
        const { message, created, favorite, _favoriteTask, id, _deleteTask } = this.props;

        console.log(this.props);

        return (
            <li className = { Styles.task } >
                <div className = { Styles.content }>
                    <Checkbox
                        className = { Styles.toggleTaskCompletedState }
                        color2 = 'white'
                    />
                    <span>{message}</span>
                    <input
                        type = 'text'
                        value = { message }
                        onChange
                    />
                    <time>{ created.format('D MMMM h:mm a') }</time>
                </div>
                <div className = { Styles.actions }>
                    <Star
                        onClick = { this._favoriteTask }
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = 'yellow'
                        color2 = 'grey'
                        id = { id }
                    />
                    <Edit className = { Styles.updateTaskMessageOnClick } />
                    <Remove onClick = { this._deleteTask } />
                </div>
            </li>
        );
    }
}
