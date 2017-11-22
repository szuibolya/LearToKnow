(function () {
    'use strict';

    angular
        .module("learnApp")
        .factory('apiService', apiService);


    function apiService($http) {
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

        service.getAllCategories = function (searchString){
            return $http({
                url: '/api/category',
                method: 'GET',
                params: {searchString: searchString}
                });
        }
        return service;

    }
})();