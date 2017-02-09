(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.deleteUser = deleteUser;
        vm.websiteList = websiteList;


        vm.update = function (newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };

        function websiteList(userId) {
            $location.url("/user/" +userId+ "/website/");
        }

        function deleteUser(newUser) {
            var user = UserService.deleteUser(userId);
            if(user == null) {
                vm.error = "unable to delete user";
            } else {
                $location.url("/login/");
            }
        }
        var user = UserService.findUserById(userId);
        vm.user = user;

        console.log(user);
    }

})();