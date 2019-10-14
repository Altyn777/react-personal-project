// Core
import React, { Component } from 'react';
import moment from "moment";
import PropTypes from 'prop-types';

// Components
import Task from "../Task";
import Spinner from "../Spinner";

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import Checkbox from "../../theme/assets/Checkbox";

import { getUniqueID, delay } from "../../instruments/helpers";

export default class Scheduler extends Component {
    static propTypes = {
        _createTaskAsync: PropTypes.func,
    };

    constructor () {
        super();

        this._createTaskAsync = this._createTaskAsync.bind(this);
        this._fieldTextChange = this._fieldTextChange.bind(this);
        this._submitTask = this._submitTask.bind(this);
        this._setTasksFetchingState = this._setTasksFetchingState.bind(this);
        this._favoriteTask = this._favoriteTask.bind(this);
        this._removeTaskAsync = this._removeTaskAsync.bind(this);
    }

    state = {
        tasks: [{ id: '123', message: 'Отметить задачу как выполненную', created: moment.unix(1526825076849), favorite: true },
            { id: '163', message: 'редактировать текст задачи', created: moment.unix(1526663339999), favorite: false }],
        isTasksFetching: false,
        newTaskMessage:  '',
        tasksFilter: '',
    };

    _setTasksFetchingState (state) {
        this.setState({
            isTasksFetching: state,
        });
    }

    async _createTaskAsync (newTaskMessage) {
        this._setTasksFetchingState(true);

        const task = {
            id:       getUniqueID(),
            created:  moment().utc(),
            message:  newTaskMessage,
            favorite: false,
        };

        console.log(task.created.toString());

        await delay(1200);

        this.setState(({ tasks }) => ({
            tasks:      [task, ...tasks],
            isTasksFetching: false,
        }));
    }

    async _favoriteTask (id, favorite) { // идентификатор задачи, на которую ставят звездочку
        //const { favorite } = this.props;

        this._setTasksFetchingState(true);

        await delay(600);

        const newTasks = this.state.tasks.map((task) => {
            if (task.id === id) {
                task.favorite = !favorite;

                return {
                    ...task,
                    checked: favorite,
                };
            }

            return task;
        });

        this.setState({
            tasks:      newTasks,
            isTasksFetching: false,
        });
    }

    async _removeTaskAsync (id) {
        this._setTasksFetchingState(true);

        await delay(600);

        const newTasks = this.state.tasks.filter((task) => task.id !== id);

        this.setState({
            tasks:      newTasks,
            isTasksFetching: false,
        });
    }

    _fieldTextChange (event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    _submitTask (event) {
        event.preventDefault();
        const { newTaskMessage } = this.state;

        console.log(this.state);

        if (!newTaskMessage) {
            return null;
        }

        this._createTaskAsync(newTaskMessage);

        this.setState({
            newTaskMessage: '',
        });
    }

    render () {
        const { tasks, isTasksFetching, newTaskMessage, tasksFilter } = this.state;

        const tasksJSX = tasks.map((task) => {
            return (<Task
                key = { task.id }
                { ...task }
                _removeTaskAsync = { this._removeTaskAsync }
                _favoriteTask = { this._favoriteTask }
            />);
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <header>
                        <h1>Планировщик:</h1>
                        <input
                            name = 'tasksFilter'
                            placeholder = 'Поиск'
                            value = { tasksFilter }
                            onChange = { this._fieldTextChange }
                        />
                    </header>
                    <input type = 'submit' value = 'Create Task' />
                    <section>
                        <form onSubmit = { this._submitTask }>
                            <input
                                name = 'newTaskMessage'
                                placeholer = 'Новая задача'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._fieldTextChange }
                            />
                            <button>Создать</button>
                        </form>
                        <ul>
                            {tasksJSX}
                        </ul>
                    </section>
                    <footer>
                        <Checkbox color1 = 'green' color2 = 'white' />
                        <div>Задачи выполнены!</div>
                    </footer>
                </main>
            </section>
        );
    }
}
