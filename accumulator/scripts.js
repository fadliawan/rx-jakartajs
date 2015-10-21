(function() {

  'use strict';

  var number = document.querySelector('#number');

  var plus = document.querySelector('#btn-plus');
  var minus = document.querySelector('#btn-minus');

  var incrementor = Rx.Observable.fromEvent(plus, 'click');
  var decrementor = Rx.Observable.fromEvent(minus, 'click');

  var source = incrementor
                    .map(1)
                    .merge(decrementor.map(-1))
                    .scan(function(acc, currentValue) {
                      return acc + currentValue;
                    });

  source.subscribe(
    // Success
    function(data) {
      number.value = data;
    },
    // Failure
    function(error) {
      console.log(error);
    },
    // Complete
    function() {
      console.log('Completed!');
    }
  );

})();