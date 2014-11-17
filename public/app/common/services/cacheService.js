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
    if (angular.isArray(resource)) {
      mergeArrayBasedOnIdInPlace(resource,cache)
    } else {
      angular.extend(resource, cache);

    }
    return (resource);

  };

  return {
    getAndApply: function(cacheId, newData){
      if (!cache[cacheId]){
        cache[cacheId]=newData;
        return newData;
      }
      var extendedDataByCache = applyCacheToResource(newData,cache[cacheId]);
      extendedDataByCache.$promise.then(function(result){
        applyCacheToResource(cache[cacheId], result);
      },function(err){}); //no error handler, because someone else is responsible
      return extendedDataByCache;
    }
  };
});