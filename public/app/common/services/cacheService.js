angular.module('studypact').factory('CacheService', function() {

  var cache = {};
  
  var replaceArray = function(array1,array2){
    array1.length = 0;
    Array.prototype.push.apply(array1, array2);
    return array1;
  };

  var applyCacheToResource= function(resource, cache) {
    if (!cache)
      return (resource);
    if (angular.isArray(resource)) {
      replaceArray(resource,cache)
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
      newData.$promise.then(function(result){
        applyCacheToResource(cache[cacheId], result);
      },function(err){}); //no error handler, because someone else is responsible
      return cache[cacheId];
    }
  };
});