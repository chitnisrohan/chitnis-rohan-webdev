(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.goToWebsite = goToWebsite;
        vm.editWebsite = editWebsite;
        vm.createWebsite = createWebsite;

        function createWebsite() {
            $location.url("/user/"+ userId +"/website/new");
        }

        var website_list = WebsiteService.findWebsitesByUser(userId);


        function editWebsite(websiteId) {
            $location.url("/user/"+ userId +"/website/" + websiteId);
        }

        function goToWebsite(websiteId) {
            var website = WebsiteService.findWebsiteById(websiteId);
            console.log(website.name);
            vm.website = website;
        }

        vm.websiteList = website_list;
    }
})();


