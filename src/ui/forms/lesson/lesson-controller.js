(function () {
    'use strict';

    angular
        .module("learnApp")
        .controller('lessonController', lessonController);

    function lessonController($scope,$rootScope,$stateParams,categoryApiService,lessonApiService) {
        var lessonCtrl = this;
        $rootScope.isAdd = false;
        $rootScope.isEdit = false;
        $rootScope.iserror = false;
        lessonCtrl.backgroundColors = getBackgroundColorOptions();
        lessonCtrl.foregroundColors = getForegroundColorOptions();

        //when html page loaded
        lessonCtrl.initController = function(){
             //$scope.lessons = getDummyLessonsList();
             lessonCtrl.editLesson = new Lesson();

             categoryApiService.getOneCategory($stateParams.id)
             .then(function(result){
                  lessonCtrl.category = result.data;
                }
             )
             .catch(function(result){
                 writeError(result.data,"Retrieving of Categories failed");
             });
             lessonApiService.getAllLessons($stateParams.id,$stateParams.searchString)
             .then(function(result){
                lessonCtrl.lessons = result.data;
                 }
             )
             .catch(function(result){
                 writeError(result.data,"Retrieving of Categories failed :"+result.data);
             });
        }
        lessonCtrl.initController();

        //when a user clicks on the edit (pencil icon)
        lessonCtrl.onEdit = function(lesson){
            $rootScope.isEdit = true;
            $rootScope.functionTitle = "Edit Lesson";
            lessonCtrl.editLesson = lesson;
            $rootScope.selBackgroundColorClass = getBackgroundColorClassName(lessonCtrl.editLesson.style.cardBackGroundColor);
            $rootScope.selForegroundColorClass = getForegroundColorClassName(lessonCtrl.editLesson.style.cardForeGroundColor);
            console.log($rootScope.selBackgrounColorClass);
            console.log(lessonCtrl.editLesson.style.cardBackGroundColor);       
        }
        //when a user clicks on the del (close icon)
        lessonCtrl.onDelete = function(lesson){
            var isremove = window.confirm("Are you sure to remove the "+Lesson.name+" Lesson?");
            if (!isremove) return;
            lessonApiService.deleteLesson(lesson.id)
            .then(function (result) {
                console.log("delete ok");
                lessonCtrl.initController();
            })
            .catch(function(result){
                writeError(result.data,"Removing of the Lesson failed");
                return;
            });
        }

        //when a user clicks on Cancel Button (new, edit)
        lessonCtrl.cancel = function(){
            $rootScope.isAdd = false;
            $rootScope.isEdit = false;
            $rootScope.iserror = false;
            lessonCtrl.editLesson = new Lesson();
        }

        //when one of the color selectionbox changes 
        lessonCtrl.changeColor = function(){
            lessonCtrl.editLesson.style.cardBackGroundColorClass = getBackgroundColorClassName(lessonCtrl.editLesson.style.cardBackGroundColor);
            lessonCtrl.editLesson.style.cardForeGroundColorClass = getForegroundColorClassName(lessonCtrl.editLesson.style.cardForeGroundColor);
        }

        //when new form has submitted
        lessonCtrl.submit = function(form){
            form.$setDirty();
            if(!form.$valid) return;
            lessonCtrl.editLesson.style = new Style();
            lessonCtrl.editLesson.categoryId = lessonCtrl.category.id;
            lessonApiService.postLesson(lessonCtrl.category.id,lessonCtrl.editLesson)
            .then(function (result) {
                console.log("ok");
                $rootScope.isAdd = false;
                $rootScope.iserror = false;
                lessonCtrl.initController();
            })
            .catch(function(result){
                writeError(result.data,"Saving of Lesson failed");
                return;
            });
            form.$setPristine();
            lessonCtrl.editLesson = new Lesson();
        }

        //when edit form has submitted
        lessonCtrl.submitEdition = function(form){
            console.log(lessonCtrl.editLesson);
            form.$setDirty();
            if(!form.$valid) return;
                      
            lessonApiService.putLesson(lessonCtrl.editLesson)
            .then(function (result) {
                console.log("ok");
                $rootScope.isEdit = false;
                $rootScope.iserror = false;
                lessonCtrl.initController();
            })
            .catch(function(result){
                writeError(result.data,"Saving of Lesson failed");
                return;
            });
            form.$setPristine();
            lessonCtrl.editLesson = new Lesson();
        }

        //you shoul call when you want to write an error message  to the footer 
        function writeError(errorMsg, operation){
            var errmsgdiv = $('#error-msg');
            errmsgdiv.html(errorMsg);
            console.log(operation+" error message: "+errorMsg);
            $rootScope.iserror = true;
        }
    }

})();