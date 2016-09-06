/**
 * Created by yangyang on 9/5/16.
 */
(function(){
    angular
        .module("todoapp")
        .factory("todoService", todoService);

    function todoService($http){
        var api = {
            findAllTodos: findAllTodos,
            findTodoById: findTodoById,
            addNewTodo: addNewTodo,
            updateTodoById: updateTodoById,
            deleteTodoById: deleteTodoById
        };

        return api;

        function findAllTodos(){
            return $http.get("/todo");
        }

        function findTodoById(id){
            return $http.get("/todo/" + id)
        }

        function addNewTodo(todo){
            return $http.post("/todo", todo)
        }

        function updateTodoById(id, todo){
            return $http.put("/todo/" + id, todo)
        }

        function deleteTodoById(id){
            return $http.delete("/todo/" + id)
        }

    }
})();