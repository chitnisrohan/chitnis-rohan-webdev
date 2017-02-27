(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser,
            "createUser" : createUser,
            "findUserByUsername" : findUserByUsername
        };
        return api;

        function createUser(newUser) {
            var user = {_id: (new Date()).getTime().toString(),
                username: newUser.username,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email};
            return $http.post("/api/user", user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }
    }
})();