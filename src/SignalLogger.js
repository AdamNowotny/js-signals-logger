define(['signals'], function () {

	var SignalLogger = function (signalSpec) {
		if (signalSpec == null) throw { name: 'ArgumentError' };
		var that = this;
		initialize();

		function initialize() {
			for (var signalName in signalSpec) {
				var signal = signalSpec[signalName];
				that[signalName] = new SignalInfo(signalName, signal);
			}
		}

	};

	SignalLogger.prototype.reset = function () {
		for (var signalName in this.signalSpec) {
			this[signalName].reset();
		}
	};

	var SignalInfo = function (signalName, signal) {
		this.name = signalName;
		this.signal = signal;
		this.reset();
	};

	SignalInfo.prototype.reset = function () {
		this.count = 0;
		this.filter = trueFilter;
		if (!this.signal.has(onSignal)) {
			this.signal.add(onSignal, this);
		}

		function onSignal(parameters) {
			if (!this.filter(parameters)) {
				return;
			}
			this.count++;
		}

		function trueFilter() {
			return true;
		}
	};

	SignalInfo.prototype.setFilter = function (predicate) {
		this.filter = predicate;
	};

	return SignalLogger;
});