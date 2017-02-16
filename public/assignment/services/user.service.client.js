(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice", email:"alice@abc.com",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob", email:"bob@abc.com",     firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly", email:"charly@abc.com",  firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", email:"jannunzi@abc.com", firstName: "Jose",   lastName: "Annunzi" }
        ];
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
            users.push(user);
            return angular.copy(user);
        }

        function deleteUser(userId) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users.splice(u,1);
                    return angular.copy(user);
                }
            }
            return null;
        }

        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    users[u].email = newUser.email;
                    return angular.copy(user);
                }
            }
            return null;
        }
        function findUserById(userId) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                if( users[u].username == username) {
                    return angular.copy(users[u]);
                }
            }
            return null;
        }
    }
})();