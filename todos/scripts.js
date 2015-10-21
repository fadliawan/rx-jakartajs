(function() {

  'use strict';

  var ENTER_KEY = 13;
  var TODO1_LS_KEY = 'tuts.todo1', TODO1_ID = '#todo-1';
  var TODO2_LS_KEY = 'tuts.todo2', TODO2_ID = '#todo-2';
  var TODO12_LS_KEY = 'tuts.todo12', TODO12_ID = '#todo-3';

  /*=== Data ===*/

  var todo1Data = loadTodo(TODO1_LS_KEY);
  var todo2Data = loadTodo(TODO2_LS_KEY);
  var todo12Data = loadTodo(TODO12_LS_KEY);


  /*=== Init ===*/

  renderTodo(TODO1_ID, todo1Data);
  renderTodo(TODO2_ID, todo2Data);
  renderTodo(TODO12_ID, todo12Data);


  /*=== Rx ===*/

  var input1 = document.querySelector('#todo-input-1');
  var input2 = document.querySelector('#todo-input-2');

  var keyups1 = Rx.Observable.fromEvent(input1, 'keyup');
  var keyups2 = Rx.Observable.fromEvent(input2, 'keyup');

  var values1 = getEnterKeyupValues(keyups1, todo1Data);
  var values2 = getEnterKeyupValues(keyups2, todo2Data);
  var values12 = getEnterKeyupValues(keyups1.merge(keyups2), todo12Data);

  values1.subscribe(function(result) {
    renderTodo(TODO1_ID, result);
    saveTodo(TODO1_LS_KEY, result);
  });

  values2.subscribe(function(result) {
    renderTodo(TODO2_ID, result);
    saveTodo(TODO2_LS_KEY, result);
  });

  values12.subscribe(function(result) {
    renderTodo(TODO12_ID, result);
    saveTodo(TODO12_LS_KEY, result);
    input1.value = input2.value = '';
  });

  function getEnterKeyupValues(keyups, initData) {
    return keyups
      .filter(function(event) { return event.keyCode === ENTER_KEY; })
      .map(function(event) { return event.target.value; })
      .scan(function(acc, currentValue, index) {
        return currentValue.length > 0 ? acc.push(currentValue) && acc : acc;
      }, initData);
  }


  /*=== Utils ===*/

  function saveTodo(key, todos) {
    return window.localStorage.setItem(key, JSON.stringify(todos));
  }

  function loadTodo(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
  }


})();