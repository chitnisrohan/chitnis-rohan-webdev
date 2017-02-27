(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.deleteUser = deleteUser;
        vm.websiteList = websiteList;
        vm.update = update;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user = user;
                });
        }
        init();

        function update(newUser) {
            var user = UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if(user == null) {
                        vm.error = "unable to update user";
                    } else {
                        vm.message = "user successfully updated"
                    }
                });
        }

        function websiteList(userId) {
            $location.url("/user/" +userId+ "/website/");
        }

        function deleteUser(newUser) {
            var user = UserService.deleteUser(userId)
                .success(function (user) {
                    if(user == null) {
                        vm.error = "unable to delete user";
                    } else {
                        $location.url("/login/");
                    }
                });
        }
    }

})();