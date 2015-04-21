if (Meteor.isServer) {
  Tinytest.add('Drop old test data', function(test) {
    return Throttle.remove({});
  });

  Tinytest.add('Throttle.checkThenSet, test throttle 2 checks in 10 sec', function(test) {
    function throttle10() {
      return Throttle.checkThenSet('server-check-10sec', 2, 10000);
    }
    test.isTrue(throttle10());
    test.isTrue(throttle10());
    test.isFalse(throttle10());
    test.isFalse(throttle10());
    test.isFalse(throttle10());
    // now sleep for 12 seconds
    Meteor._sleepForMs(12000);
    test.isTrue(throttle10());
    test.isTrue(throttle10());
    test.isFalse(throttle10());
    return test.isFalse(throttle10());
  });
}

if (Meteor.isClient) {
  Tinytest.addAsync("client throttle method (2, 10sec) #1 must be true", function(test, next) {
    Meteor.call('throttle', 'client-check-10sec', 2, 10000, function(err, res) {
      test.isUndefined(err);
      test.isTrue(res);
      next();
    });
  });
  Tinytest.addAsync("client throttle method (2, 10sec) #2 must be true", function(test, next) {
    Meteor.call('throttle', 'client-check-10sec', 2, 10000, function(err, res) {
      test.isUndefined(err);
      test.isTrue(res);
      next();
    });
  });
  Tinytest.addAsync("client throttle method (2, 10sec) #3 must be false", function(test, next) {
    Meteor.call('throttle', 'client-check-10sec', 2, 10000, function(err, res) {
      test.isUndefined(err);
      test.isFalse(res);
      next();
    });
  });

  Tinytest.addAsync("client throttle method (2, 10sec) #4 after 11sec must be true", function(test, next) {
    _.delay(function() {
      Meteor.call('throttle', 'client-check-10sec', 2, 10000, function(err, res) {
        test.isUndefined(err);
        test.isTrue(res);
        next();
      });
    }, 11000);    
  });
}
