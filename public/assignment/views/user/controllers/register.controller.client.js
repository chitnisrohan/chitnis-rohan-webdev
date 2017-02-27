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
                        if (user == null) {
                            vm.error = "unable to register user";
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