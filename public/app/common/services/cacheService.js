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
      });
      return cache[cacheId];
    },
    get: function(cacheId){
      return cache[cacheId];
    },
    apply: function(cacheId, newData){
      if (!cache[cacheId])
        cache[cacheId]=newData;
      else{
        newData.$promise.then(function(result){
          applyCacheToResource(cache[cacheId], result);
        });
      }
      return newData;
    }
  };
});