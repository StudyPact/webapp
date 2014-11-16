angular.module('studypact')
  .filter('numberFixedLen', function() {
    return function(a, b) {
      return (1e4 + Math.floor(a) + "").slice(-b)
    }
  });