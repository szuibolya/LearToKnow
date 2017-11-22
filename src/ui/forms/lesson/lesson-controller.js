(function () {
    'use strict';

    angular
        .module("learnApp")
        .controller('lessonController', lessonController);

    function lessonController($scope,$rootScope) {
        var vm = this;
        $rootScope.isAdd = false;
        vm.initController = function(){
             $scope.lessons = getDummyLessonsList();
        }
        vm.initController();

    }

})();