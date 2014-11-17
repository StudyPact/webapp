angular.module('studypact').factory('CacheService', function() {

  var cache = {};
  
  var mergeArrayBasedOnIdInPlace = function(array1,array2){
    _.each(array2, function(array2Item){
      var matchedItem = _.findWhere(array1, {_id: array2Item._id});
      if (!matchedItem)
        array1.push(matchedItem);
      else
        angular.extend(matchedItem, array2Item);
    })
    return array1;

  };

  var applyCacheToResource= function(resource, cache) {
    if (!cache)
      return (resource);
    // Check to see what type of value we're dealing with.
    // If it's an array, we want to splice-in the cache;
    // if it's an object, we want to extend the keys.
    if (angular.isArray(resource)) {
      mergeArrayBasedOnIdInPlace(resource,cache)
    } else {
      angular.extend(resource, cache);

    }
    // Return the updated resource (for easy of use).
    return (resource);

  };

  return {
    getAndApply: function(cacheId, newData){
      if (!cache[cacheId]){
        cache[cacheId]=newData;;
        return newData;
      }
      var extendedDataByCache = applyCacheToResource(newData,cache[cacheId]);
      extendedDataByCache.$promise.then(function(result){
        applyCacheToResource(cache[cacheId], result);
      },function(err){
        console.error("HTTP Error:", err);
      })
      return extendedDataByCache;
    }
  };
});