(function () {
    'use strict';

    angular
        .module("learnApp")
        .service('lessonApiService', lessonApiService);


    function lessonApiService($http) {
        var service = {};
        service.postLesson = function (categoryId,lesson){
            return $http({
                url: '/api/lesson/' + categoryId,
                method: 'POST',
                data: lesson
                });
        }

        service.putLesson = function (lesson){
            return $http({
                url: '/api/lesson/' + lesson.id,
                method: 'PUT',
                data: lesson
                });
        }

        service.deleteLesson = function (id){
            return $http({
                url: '/api/lesson/' + id,
                method: 'DELETE',                
                });
        }

        service.getAllLessons = function (categoryId, searchString){
            console.log("searchString="+searchString);
            return $http({
                url: '/api/lesson/' + categoryId,
                method: 'GET',
                params: {searchString: searchString}
                });
        }

        service.getOneLesson = function(categoryid,lessonId){
            return $http({
                url: '/api/lesson/' + categoryid + '/' + lessonId,
                method: 'GET',
                });
        }
        return service;

    }
})();