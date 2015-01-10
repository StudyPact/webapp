var module = angular.module('studypact');

module.filter('numberFixedLen', function() {
  return function(a, b) {
    return (1e4 + Math.floor(a) + "").slice(-b);
  };
});

module.filter('ceil', function() {
  return function(input) {
    return Math.ceil(input);
  };
});

module.filter('floor', function() {
  return function(input) {
    return Math.floor(input);
  };
});


module.filter('mod', function() {
  return function(a, m) {
    return a % m;
  };
});
