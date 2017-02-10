(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.goToWebsite = goToWebsite;
        vm.goToEditWebsite = goToEditWebsite;
        vm.goToNewWebsite = goToNewWebsite;
        vm.goToProfile = goToProfile;

        function init() {
            vm.websiteList = WebsiteService.findWebsitesByUser(userId);
        }
        init();

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

        function goToNewWebsite() {
            $location.url("/user/"+ userId +"/website/new");
        }

        function goToEditWebsite(websiteId) {
            $location.url("/user/"+ userId +"/website/" + websiteId);
        }

        function goToWebsite(websiteId) {
            $location.url("/user/"+ userId +"/website/" + websiteId + "/page");
        }
    }
})();


