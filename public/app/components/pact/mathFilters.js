var module = angular.module('studypact')

module.filter('numberFixedLen', function() {
    return function(a, b) {
      return (1e4 + Math.floor(a) + "").slice(-b)
    }
  });

module.filter('ceil', function() {
  return function(input) {
    return Math.ceil(input);
  };
});