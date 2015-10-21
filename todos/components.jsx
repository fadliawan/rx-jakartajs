(function() {

  var TodoList = React.createClass({
    render: function() {
      var list = this.props.todos.length ?
        this.props.todos.map(function(todo) {
          return (
            <li className="list-group-item">{todo} <button className="btn badge">x</button></li>
          );
        }) :
        <li className="list-group-item disabled">No items at the moment.</li>;

      return (
        <ul className="list-group">
          {list}
        </ul>
      );
    }
  });

  function renderTodo(elemID, todos) {
    React.render(<TodoList todos={todos} />, document.querySelector(elemID));
  }

  window.renderTodo = renderTodo;

})();