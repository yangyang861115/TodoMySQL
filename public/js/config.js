/**
 * Created by yangyang on 9/5/16.
 */
(function(){
    angular
        .module("todoapp")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.html"
            })
            .when("/todo", {
                templateUrl: "views/todo-list.html",
                controller: "todoListController",
                controllerAs: "model"
            })
            .when("/todo/new", {
                templateUrl: "views/todo-new.html",
                controller: "newTodoController",
                controllerAs: "model"
            })
            .when("/todo/:todo_id", {
                templateUrl: "views/todo-edit.html",
                controller: "editTodoController",
                controllerAs: "model"
            });
    }
})();