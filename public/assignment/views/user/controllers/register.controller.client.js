(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;
        // vm.user = user;

        vm.registerUser = registerUser;

        // newUser.username != null &&
        // newUser.firstName != null &&
        // newUser.lastName != null &&
        // newUser.password != null &&
        // newUser.verify.password != null

        function registerUser(newUser) {
            if (newUser.password === newUser.verify.password) {
                UserService
                    .findUserByUsername(newUser.username)
                    .success(function (user) {
                        console.log(user);
                        vm.error = 'Username already exists'
                    }) 
                    .error(function () {
                        UserService
                            .createUser(newUser)
                            .success(function (user) {
                                $location.url("/user/" + user._id);
                            });
                    });
            } else {
                    vm.error = "passwords do not match";
            }
        }
    }

})();