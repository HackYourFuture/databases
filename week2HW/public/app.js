(function() {
    
    var app = angular.module('app', ['ngRoute', 'angular-jwt']);

   
    app.config(function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
       
        $routeProvider.when('/todo', {
            templateUrl: 'todo.html',
            controller: 'TodoController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
       
        $routeProvider.otherwise('/todo')

    })


    app.controller('TodoController', TodoController);

    function TodoController($http, $window, $location) {
        var vm = this;
        vm.title = "TodoController";

          vm.getAllTodos = function() {
            $http.get('/api/allTodos').then(function(response) {
                vm.todos = response.data;
                //$location.path('/todo');
               //console.log(vm.todos)
            });
        }
        vm.getAllTodos();

       vm.checkboxModel = {
           val: {}
     };
        
        vm.addTodo = function() {
            //console.log(vm.user);
            if(vm.user) {
                //console.log('add')
                $http.post('/api/add', vm.user).then(onSuccess, onError);
            }
            else {
                vm.user = null;
                $location.path('/todo');
            }
        }
        vm.remove = function(id) {
            //console.log(vm.user);
            if(id) {
                //console.log(id)
                 $http.delete('/api/todo/' + id)
                   .then(function(response) {
                       vm.getAllTodos();
                   }, function(err) {
                       console.log(err)
                   })
                }
            else {
               console.log('no id')
            }
        }

 vm.updateDone = function(id) {
            if(id) {
                console.log(id);
                const x = '6';
console.log(vm.checkboxModel.val[id])
            
           
                 $http.put('/api/todo/' + id , {done: vm.checkboxModel.val[id]})
                   .then(function(response) {
                       vm.getAllTodos();
                   }, function(err) {
                       console.log(err)
                   })    
                }
            else  {
               console.log('0')
            }            
        }
        var onSuccess = function(response) {
            vm.user = {};
             vm.getAllTodos();
        }
        var onError = function(error) {
            vm.error = " N ";
            $location.path('/todo');
        }  

    }

}());