/**
 * Created by yangyang on 9/5/16.
 */
(function () {
    angular
        .module("todoapp")
        .controller("todoListController", todoListController)
        .controller("newTodoController", newTodoController)
        .controller("editTodoController", editTodoController);

    function todoListController(todoService) {
        var vm = this;
        vm.deleteTodoById = deleteTodoById;

        function init() {
            todoService
                .findAllTodos()
                .then(
                    function (response) {
                        var todos = response.data;
                        if (todos) {
                            vm.todos = todos;
                        }
                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }

        init();

        function deleteTodoById(id) {
            console.log(id);
            todoService
                .deleteTodoById(id)
                .then(
                    function (response) {
                        if (response) {
                            init();
                        }
                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }
    }

    function newTodoController(todoService, $location) {
        var vm = this;
        vm.addNewTodo = addNewTodo;

        function addNewTodo(todo) {
            console.log(todo);
            if (todo) {
                todoService
                    .addNewTodo(todo)
                    .then(
                        function (response) {
                            if (response.data) {
                                $location.url("/todo");
                            }
                            ;
                        },
                        function (error) {
                            vm.error = "something went wrong!";
                        }
                    )
            }
        }
    }

    function editTodoController(todoService, $routeParams, $location) {
        var vm = this;
        vm.updateTodo = updateTodo;

        var id = $routeParams.todo_id;

        function init() {
            todoService
                .findTodoById(id)
                .then(
                    function (response) {
                        var todo = response.data;
                        if (todo) {
                            vm.todo = todo[0];
                        }
                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }

        init();

        function updateTodo(todo) {
            todoService
                .updateTodoById(id, todo)
                .then(
                    function (response) {
                        if (response) {
                            $location.url("/todo");
                        }
                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }
    }
})();