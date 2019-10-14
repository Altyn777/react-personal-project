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
        _createTask: PropTypes.func,
    };

    constructor () {
        super();

        this._createTask = this._createTask.bind(this);
        this._fieldTextChange = this._fieldTextChange.bind(this);
        this._submitTask = this._submitTask.bind(this);
        this._setSpinningState = this._setSpinningState.bind(this);
        this._favoriteTask = this._favoriteTask.bind(this);
        this._deleteTask = this._deleteTask.bind(this);
    }

    state = {
        tasks: [{ id: '123', message: 'поставить звездочку', created: moment.unix(1526825076849), favorite: true },
            { id: '163', message: 'создать задачу', created: moment.unix(1526663339999), favorite: false }],
        isSpinning: false,
        nameGiver:  '',
        searchText: '',
        favorite:   false,
    };

    _setSpinningState (state) {
        this.setState({
            isSpinning: state,
        });
    }

    async _createTask (nameGiver) {
        this._setSpinningState(true);

        const task = {
            id:       getUniqueID(),
            created:  moment().utc(),
            message:  nameGiver,
            favorite: false,
        };

        console.log(task.created.toString());

        await delay(1200);

        this.setState(({ tasks }) => ({
            tasks:      [task, ...tasks],
            isSpinning: false,
        }));
    }

    async _favoriteTask (id, favorite) { // идентификатор задачи, на которую ставят звездочку
        //const { favorite } = this.props;

        this._setSpinningState(true);

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
            isSpinning: false,
        });
    }

    async _deleteTask (id) {
        this._setSpinningState(true);

        await delay(600);

        const newTasks = this.state.tasks.filter((task) => task.id !== id);

        this.setState({
            tasks:      newTasks,
            isSpinning: false,
        });
    }

    _fieldTextChange (event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    _submitTask (event) {
        event.preventDefault();
        const { nameGiver } = this.state;

        console.log(this.state);

        if (!nameGiver) {
            return null;
        }

        this._createTask(nameGiver);

        this.setState({
            nameGiver: '',
        });
    }

    render () {
        const { tasks, isSpinning, nameGiver, searchText } = this.state;

        const tasksJSX = tasks.map((task) => {
            return <Task key = { task.id } { ...task } _deleteTask = { this._deleteTask } _favoriteTask = { this._favoriteTask } />;
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isSpinning } />
                <main>
                    <header>
                        <h1>Планировщик:</h1>
                        <input
                            name = 'searchText'
                            placeholder = 'Поиск'
                            value = { searchText }
                            onChange = { this._fieldTextChange }
                        />
                    </header>
                    <input type = 'submit' value = 'Create Task' />
                    <section>
                        <form onSubmit = { this._submitTask }>
                            <input
                                name = 'nameGiver'
                                placeholer = 'Новая задача'
                                type = 'text'
                                value = { nameGiver }
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
