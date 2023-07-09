import { observable, action } from 'mobx';

class TodoStore {
  todos = observable([]);

  addTodoItem = action(function(todoItem) {
    this.todos.push({ text: todoItem, completed: false, highlighted: false });
  });

  removeTodoItem = action(function(index) {
    this.todos.splice(index, 1);
  });

  completeTodoItem = action(function(index) {
    const completedItem = this.todos.splice(index, 1)[0];
    completedItem.completed = true;
    this.todos.push(completedItem);
  });

  deleteFirstItem = action(function() {
    this.todos.splice(0, 1);
  });

  deleteLastItem = action(function() {
    this.todos.splice(this.todos.length - 1, 1);
  });

  highlightEvenItems = action(function() {
    this.todos.forEach((todo, index) => {
      todo.highlighted = index % 2 === 0;
    });
  });

  highlightOddItems = action(function() {
    this.todos.forEach((todo, index) => {
      todo.highlighted = index % 2 !== 0;
    });
  });
}

const store = new TodoStore();
export default store;
