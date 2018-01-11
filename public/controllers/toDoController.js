var toDoListApp = angular.module('toDoListApp', []);

//In LA!

toDoListApp.controller('AppCtrl', ['$scope', '$http', 
    function($scope, $http) {

    console.log("message from controller");

        var refresh = function(){


                $http.get('/toDoList').then(function(response){

                console.log("Got data that i requested!");

                $scope.toDoList = response.data;
                $scope.item = {};

            });


        };

        refresh();

        //Adding Contact to database
        $scope.addItem = function(item){

        	item.status = 'Not Finished'

            console.log("Added a New item to the database!");
            $http.post('/toDoList', $scope.item).success(function(response){

                console.log(response);
            
                refresh();

            });

        };

        //Removing contact by id from database 
        $scope.remove = function(id){

            console.log("This id: " + id + " was removed");
            $http.delete("/toDoList/" + id).success(function(response){

                refresh();

            });

        }

        $scope.edit = function(id){

            $http.get('/toDoList/' + id).success(function(response){

                $scope.item = response;
            });

        };

        $scope.update = function(){
            console.log("You have just updated an item!");
            $http.put('/toDoList/' + $scope.item._id, $scope.item).success(function(response){
                refresh();

            });
        };

        $scope.deselect = function(){
            $scope.item = {};
        };


        $scope.updateStatus = function(item){

        	item.status = 'Finished!';

            console.log("Your task is now: " + item.status);
            $http.put('/toDoList/' + item._id, item).success(function(response){

                refresh();

            });
        };


        $scope.undoStatusUpdate = function(item){

        	item.status = 'Not Finished';

            console.log("Your task is now: " + item.status);
            $http.put('/toDoList/' + item._id, item).success(function(response){

                refresh();

            });
        };



}]);