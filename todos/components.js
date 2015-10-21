"use strict";

(function () {

  var TodoList = React.createClass({
    displayName: "TodoList",

    render: function render() {
      var list = this.props.todos.length ? this.props.todos.map(function (todo) {
        return React.createElement(
          "li",
          { className: "list-group-item" },
          todo,
          " ",
          React.createElement(
            "button",
            { className: "btn badge" },
            "x"
          )
        );
      }) : React.createElement(
        "li",
        { className: "list-group-item disabled" },
        "No items at the moment."
      );

      return React.createElement(
        "ul",
        { className: "list-group" },
        list
      );
    }
  });

  function renderTodo(elemID, todos) {
    React.render(React.createElement(TodoList, { todos: todos }), document.querySelector(elemID));
  }

  window.renderTodo = renderTodo;
})();

