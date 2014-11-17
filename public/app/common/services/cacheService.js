angular.module('studypact').factory('CacheService', function() {

  return {
    applyCacheToResource: function(resource, cache) {
      if (!cache)
        return (resource);
      // Check to see what type of value we're dealing with.
      // If it's an array, we want to splice-in the cache;
      // if it's an object, we want to extend the keys.
      if (angular.isArray(resource)) {
        resource.splice.apply(
          resource, [0, 0].concat(cache)
        );
      } else {
        angular.extend(resource, cache);

      }
      // Return the updated resource (for easy of use).
      return (resource);

    }
  }
});