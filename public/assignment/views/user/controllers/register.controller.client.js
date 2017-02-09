(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;
        // vm.user = user;

        vm.registerUser = registerUser;

        function registerUser(newUser){
            var user = UserService.createUser(newUser);
            if(user == null) {
                vm.error = "unable to register user";
            } else {
                $location.url("/profile/"+user._id);
            }
        }
    }

})();