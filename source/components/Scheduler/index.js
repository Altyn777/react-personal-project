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

import { getUniqueID } from "../../instruments/helpers";

export default class Scheduler extends Component {
    static propTypes = {
        _createTask: PropTypes.func,
    };

    constructor () {
        super();

        this._createTask = this._createTask.bind(this);
        this._fieldTextChange = this._fieldTextChange.bind(this);
        this._submitTask = this._submitTask.bind(this);
    }

    state = {
        tasks: [{ id: '123', message: 'second', created: 1526825076849 },
            { id: '163', message: '1', created: 1526663339999 }],
        isSpinning: false,
        nameGiver:  '',
        searchText: '',
    };

    _createTask (nameGiver) {
        const task = {
            id:      getUniqueID(),
            created: moment().utc(),
            message: nameGiver,
        };

        this.setState(({ tasks }) => ({
            tasks: [task, ...tasks],
        }));
    }

    _fieldTextChange (event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    _submitTask (event) {
        event.preventDefault();
        const { nameGiver } = this.state;

        console.log(nameGiver);
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
            return <Task key = { task.id } { ...task } />;
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
