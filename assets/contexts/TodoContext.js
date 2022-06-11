import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * Context for the todo.
 */
export const TodoContext = createContext();

/**
 * Default class for the todo context.
 */
export default class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: {}
        };
    }

    componentDidMount() {
        this.readTodo();
    }

    // Create
    createTodo(e, newTodo) {
        e.preventDefault();
        axios
            .post('/api/todo/create', newTodo)
            .then(res => {
                if (res.data.message.level === 'success') {
                    this.setState({
                        todos: [...this.state.todos, res.data.todo]
                    });
                }

                this.setState({
                    message: res.data.message
                });
            })
            .catch(err =>
                this.setState({
                    message: err.response.data.message
                })
            );
    }

    // Read
    readTodo() {
        axios
            .get('/api/todo/read')
            .then(res => this.setState({ todos: res.data }))
            .catch(err => console.error(err));
    }

    // Update
    updateTodo(e, editTodo) {
        e.preventDefault();
        axios
            .put(`/api/todo/update/${editTodo.id}`, editTodo)
            .then(res => {
                if (res.data.message.level === 'success') {
                    const todos = [...this.state.todos];
                    const index = todos.findIndex(todo => todo.id === editTodo.id);
                    todos[index] = res.data.todo;
                    this.setState({ todos });
                }

                this.setState({
                    message: res.data.message
                });
            })
            .catch(err =>
                this.setState({
                    message: err.response.data.message
                })
            );
    }

    // Delete
    deleteTodo(deleteTodo) {
        axios
            .delete(`/api/todo/delete/${deleteTodo.id}`)
            .then(res => {
                if (res.data.message.level === 'success') {
                    const todos = [...this.state.todos];
                    const index = todos.findIndex(todo => todo.id === deleteTodo.id);
                    todos.splice(index, 1);
                    this.setState({ todos });
                }
                this.setState({
                    message: res.data.message
                });
            })
            .catch(err =>
                this.setState({
                    message: err.response.data.message
                })
            );
    }

    render() {
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        const providerValue = {
            ...this.state,
            createTodo: this.createTodo.bind(this),
            readTodo: this.readTodo.bind(this),
            updateTodo: this.updateTodo.bind(this),
            deleteTodo: this.deleteTodo.bind(this),
            setMessage: message => this.setState({ message })
        };

        return (
            <TodoContext.Provider value={providerValue}>{this.props.children}</TodoContext.Provider>
        );
    }
}

TodoContextProvider.propTypes = {
    children: PropTypes.array.isRequired
};
