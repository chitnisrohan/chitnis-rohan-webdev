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
                var user = UserService
                    .createUser(newUser)
                    .success(function (user) {
                        if (user === 'Username already taken. Please choose another Username') {
                            vm.error = user;
                        } else {
                            $location.url("/user/" + user._id);
                        }
                    });
            } else {
                    vm.error = "passwords do not match";
            }
        }
    }

})();