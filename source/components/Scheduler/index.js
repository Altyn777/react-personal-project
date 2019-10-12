// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import Spinner from "../Spinner";
import Checkbox from "../../theme/assets/Checkbox";
import Task from "../Task";

export default class Scheduler extends Component {
    render () {
        return (
            <section className = { Styles.scheduler }>
                <Spinner />
                <main>
                    <header>
                        <h1>Планировщик:</h1>
                        <input placeholder = 'Поиск' />
                    </header>
                    <input type = 'submit' value = 'Create Task' />
                    <section>
                        <form>
                            <input
                                name = 'newTask'
                                placeholer = 'Новая задача'
                                type = 'text'
                            />
                            <button>Создать</button>
                        </form>
                        <ul>
                            <Task
                                completed
                                favorite
                                id
                                key
                                message = 'Task'
                            />
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
