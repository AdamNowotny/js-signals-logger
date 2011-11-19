require.config({
		baseUrl: 'spec',
		paths: {
			src: '../src',
			signals: '../lib/js-signals/signals'
		}
	});

define([
	'signalLoggerSpec'
], function () {
	return {
		runSpecs: function () {
			jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
			jasmine.getEnv().execute();
		}
	};
});