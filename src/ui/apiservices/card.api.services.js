(function(){
    angular
    .module("learnApp")
    .service('cardApiService',cardApiService);
    function cardApiService($http){
        var service = {}
        service.postCard = function(card){
          return $http(
              {
                  url: '/api/card/',
                  method:'POST',
                  data: card
              }
          );
        }
        
        service.putCard = function(card){
            return $http(
                {
                    url: '/api/card/'+card.id,
                    method:'PUT',
                    data: card
                }
            );
        }

        service.deleteCard = function(id){
            return $http(
                {
                    url: '/api/card/'+id,
                    method:'DELETE',
                }
            );
        }
    
        service.getAllCards = function(categoryId,lessonId){
            return $http(
                {
                    url: '/api/card/'+categoryId + '/'+lessonId,
                    method:'GET',
                    params: {searchString: searchString}
                }
            );
        }
        service.getOneCard = function(id){
            return $http(
                {
                    url: '/api/card/'+id,
                    method:'GET'
                }
            );
        }

        return service;
    }
})();