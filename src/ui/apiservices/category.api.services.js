(function () {
    'use strict';

    angular
        .module("learnApp")
        .service('categoryApiService', categoryApiService);


    function categoryApiService($http) {
        console.log("apiservice");
        var service = {};
        service.postCategory = function (category){
            return $http({
                url: '/api/category',
                method: 'POST',
                data: category
                });
        }

        service.putCategory = function (category){
            return $http({
                url: '/api/category/' + category.id,
                method: 'PUT',
                data: category
                });
        }

        service.deleteCategory = function (id){
            return $http({
                url: '/api/category/' + id,
                method: 'DELETE',                
                });
        }

        service.getAllCategories = function (searchString){
            console.log("searchString="+searchString);
            return $http({
                url: '/api/category',
                method: 'GET',
                params: {searchString: searchString}
                });
        }

        service.getOneCategory = function(categoryId){
            return $http({
                url: '/api/category/' + categoryId,
                method: 'GET',
                });
        }
        return service;

    }
})();