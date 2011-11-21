js-signal-logger
================
`SignalLogger` reduces the amount of repetitive code you have to write to unit test components using [JS-Signals](http://millermedeiros.github.com/js-signals/).
It counts how many times specified signals have been dispatched.
Filtering allows checking if correct parameters have been passed for signal dispatch.

API / Features
--------------

### Configuration
Pass an object specifying the name and the signal.
Name is used to create `SignalInfo` object for each signal and attach it to the logger as new fields.

```js
var logger = new SignalLogger({ finished: obj.finished });
```

### Count
Returns the amount of times the watched signal has been dispatched.

```js
logger.finished.count
```

### Filtering
Only count signals that match condition.

```js
logger.finished.setFilter(function (param1, param2, ...) {
	return true; // always count this signal (default)
} );
```

Usage
-----
Check the spec folder for [RequireJS]{http://requirejs.org/} configuration.

### Basic usage

```js
it('should count signals', function () {
	var obj = {	finished: new signals.Signal() };
	var logger = new SignalLogger({ finished: obj.finished });

	obj.finished.dispatch();

	expect(logger.finished.count).toBe(1);
});
```

### Filtering
Method passed to `setFilter` should return false if signal should be ignored.

```js
it('should count filtered signals', function () {
	var obj = {	finished: new signals.Signal() };
	var logger = new SignalLogger({ finished: obj.finished });
	logger.finished.setFilter(function (dispatchArgs) {
		return dispatchArgs === 1; // only count signals dispatched with 1
	});

	obj.finished.dispatch(1);
	obj.finished.dispatch(5);
	obj.finished.dispatch(1);

	expect(logger.finished.count).toBe(2);
});
```