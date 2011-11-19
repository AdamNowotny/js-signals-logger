define(['src/SignalLogger', 'signals'], function (SignalLogger, signals) {
	
	describe('SignalLogger', function () {

		it('should fail if configuration not specified', function () {
			expect(function () {
				return new SignalLogger();
			}).toThrow({ name: 'ArgumentError' });
		});

		it('should count signals', function () {
			var obj1 = { finished: new signals.Signal() };
			var obj2 = { finished: new signals.Signal() };
			var logger = new SignalLogger({
				finished1: obj1.finished,
				finished2: obj2.finished
			});

			obj1.finished.dispatch();
			obj2.finished.dispatch();
			obj1.finished.dispatch();

			expect(logger.finished1.count).toBe(2);
			expect(logger.finished2.count).toBe(1);
		});

		it('should count filtered signals', function () {
			var obj = { finished: new signals.Signal() };
			var logger = new SignalLogger({ finished: obj.finished });
			logger.finished.setFilter(function (signalArgs) {
				return signalArgs === 1;
			});

			obj.finished.dispatch(1);
			obj.finished.dispatch(2);
			obj.finished.dispatch(1);

			expect(logger.finished.count).toBe(2);
		});
		
	});
	
});
