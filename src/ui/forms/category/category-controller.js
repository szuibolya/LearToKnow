(function () {
    'use strict';

    angular
        .module("learnApp")
        .controller('categoryController', categoryController);

    function categoryController($scope,$rootScope,apiService) {
        var catCtrl = this;
        $rootScope.isAdd = false;
        $rootScope.isEdit = false;
        $rootScope.iserror = false;
        catCtrl.backgroundColors = getBackgroundColorOptions();
        catCtrl.foregroundColors = getForegroundColorOptions();

        catCtrl.initController = function(){
            catCtrl.editCategory = new Category();
            //catCtrl.categories = getDummyCategoryList();
            apiService.getAllCategories($rootScope.searchString)
            .then(function(result){
                    catCtrl.categories = result.data;
                }
            )
            .catch(function(result){
                writeError(result.data,"Retrieving of Categories failed");
            });
        }

        catCtrl.initController();

        catCtrl.onEdit = function(category){
            $rootScope.isEdit = true;
            $rootScope.functionTitle = "Edit Category";
            catCtrl.editCategory = category;
            $rootScope.selBackgroundColorClass = getBackgroundColorClassName(catCtrl.editCategory.style.cardBackGroundColor);
            $rootScope.selForegroundColorClass = getForegroundColorClassName(catCtrl.editCategory.style.cardForeGroundColor);
            console.log($rootScope.selBackgrounColorClass);
            console.log(catCtrl.editCategory.style.cardBackGroundColor);
        }

        catCtrl.changeColor = function(){
            catCtrl.editCategory.style.cardBackGroundColorClass = getBackgroundColorClassName(catCtrl.editCategory.style.cardBackGroundColor);
            catCtrl.editCategory.style.cardForeGroundColorClass = getForegroundColorClassName(catCtrl.editCategory.style.cardForeGroundColor);
        }

        catCtrl.submit = function(form){
            form.$setDirty();
            if(!form.$valid) return;
            catCtrl.editCategory.style = new Style();
                      
            apiService.postCategory(catCtrl.editCategory)
            .then(function (result) {
                console.log("ok");
                $rootScope.isAdd = false;
                $rootScope.iserror = false;
                catCtrl.initController();
            })
            .catch(function(result){
                writeError(result.data,"Saving of Category failed");
                return;
            });
            form.$setPristine();
            catCtrl.editCategory = {};
        }

        catCtrl.submitEdition = function(form){
            console.log(catCtrl.editCategory);
            form.$setDirty();
            if(!form.$valid) return;
                      
            apiService.putCategory(catCtrl.editCategory)
            .then(function (result) {
                console.log("ok");
                $rootScope.isEdit = false;
                $rootScope.iserror = false;
                catCtrl.initController();
            })
            .catch(function(result){
                writeError(result.data,"Saving of Category failed");
                return;
            });
            form.$setPristine();
            catCtrl.editCategory = {};
        }

        function writeError(errorMsg, operation){
            var errmsgdiv = $('#error-msg');
            errmsgdiv.html(errorMsg);
            console.log(operation+" error message: "+errorMsg);
            $rootScope.iserror = true;
        }
        
    }

})();