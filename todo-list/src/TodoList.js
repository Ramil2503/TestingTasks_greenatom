import React, { Component } from 'react';
import { observer } from 'mobx-react';
import todoStore from './TodoStore';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleCompleteTodo = this.handleCompleteTodo.bind(this);
    this.handleDeleteFirst = this.handleDeleteFirst.bind(this);
    this.handleDeleteLast = this.handleDeleteLast.bind(this);
    this.handleHighlightEven = this.handleHighlightEven.bind(this);
    this.handleHighlightOdd = this.handleHighlightOdd.bind(this);
  }

  handleAddTodo() {
    const todoItem = prompt('Enter a new todo item:');
    todoStore.addTodoItem(todoItem);
  }

  handleRemoveTodo(index) {
    todoStore.removeTodoItem(index);
  }

  handleCompleteTodo(index) {
    todoStore.completeTodoItem(index);
  }

  handleDeleteFirst() {
    todoStore.deleteFirstItem();
  }

  handleDeleteLast() {
    todoStore.deleteLastItem();
  }

  handleHighlightEven() {
    todoStore.highlightEvenItems();
  }

  handleHighlightOdd() {
    todoStore.highlightOddItems();
  }

  render() {
    const { todos } = todoStore;

    return (
      <div>
        <button onClick={this.handleAddTodo}>Add Todo</button>
        <button onClick={this.handleDeleteFirst}>Delete First</button>
        <button onClick={this.handleDeleteLast}>Delete Last</button>
        <button onClick={this.handleHighlightEven}>Highlight Even</button>
        <button onClick={this.handleHighlightOdd}>Highlight Odd</button>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                backgroundColor: todo.highlighted ? 'yellow' : 'transparent',
              }}
            >
              {todo.text}
              <button onClick={() => this.handleRemoveTodo(index)}>Remove</button>
              <button onClick={() => this.handleCompleteTodo(index)}>Complete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default observer(TodoList);
