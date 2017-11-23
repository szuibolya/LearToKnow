(function () {
    'use strict';

    angular
        .module("learnApp")
        .controller('categoryController', categoryController);

    function categoryController($scope,$rootScope,$stateParams,categoryApiService) {
        var catCtrl = this;
        $rootScope.isAdd = false;
        $rootScope.isEdit = false;
        $rootScope.iserror = false;
        catCtrl.backgroundColors = getBackgroundColorOptions();
        catCtrl.foregroundColors = getForegroundColorOptions();
        
        //when the html page loaded
        catCtrl.initController = function(){
            catCtrl.editCategory = new Category();
            //catCtrl.categories = getDummyCategoryList();
            categoryApiService.getAllCategories($stateParams.searchString)
            .then(function(result){
                    catCtrl.categories = result.data;
                }
            )
            .catch(function(result){
                writeError(result.data,"Retrieving of Categories failed");
            });
        }

        catCtrl.initController();

        //when a user clicks on the edit (pencil icon)
        catCtrl.onEdit = function(category){
            $rootScope.isEdit = true;
            $rootScope.functionTitle = "Edit Category";
            catCtrl.editCategory = category;
            $rootScope.selBackgroundColorClass = getBackgroundColorClassName(catCtrl.editCategory.style.cardBackGroundColor);
            $rootScope.selForegroundColorClass = getForegroundColorClassName(catCtrl.editCategory.style.cardForeGroundColor);
            console.log($rootScope.selBackgrounColorClass);
            console.log(catCtrl.editCategory.style.cardBackGroundColor);       
        }
        //when a user clicks on the del (close icon)
        catCtrl.onDelete = function(category){
            var isremove = window.confirm("Are you sure to remove the "+category.name+" category?");
            if (!isremove) return;
            categoryApiService.deleteCategory(category.id)
            .then(function (result) {
                console.log("delete ok");
                catCtrl.initController();
            })
            .catch(function(result){
                writeError(result.data,"Removing of the category failed");
                return;
            });
        }

        //when a user clicks on Cancel Button (new, edit)
        catCtrl.cancel = function(){
            $rootScope.isAdd = false;
            $rootScope.isEdit = false;
            $rootScope.iserror = false;
            catCtrl.editCategory = new Category();
        }

        //when one of the color selectionbox changes 
        catCtrl.changeColor = function(){
            catCtrl.editCategory.style.cardBackGroundColorClass = getBackgroundColorClassName(catCtrl.editCategory.style.cardBackGroundColor);
            catCtrl.editCategory.style.cardForeGroundColorClass = getForegroundColorClassName(catCtrl.editCategory.style.cardForeGroundColor);
        }

        //when new form has submitted
        catCtrl.submit = function(form){
            form.$setDirty();
            if(!form.$valid) return;
            catCtrl.editCategory.style = new Style();
                      
            categoryApiService.postCategory(catCtrl.editCategory)
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
            catCtrl.editCategory = new Category();
        }

        //when edit form has submitted
        catCtrl.submitEdition = function(form){
            console.log(catCtrl.editCategory);
            form.$setDirty();
            if(!form.$valid) return;
                      
            categoryApiService.putCategory(catCtrl.editCategory)
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
            catCtrl.editCategory = new Category();
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