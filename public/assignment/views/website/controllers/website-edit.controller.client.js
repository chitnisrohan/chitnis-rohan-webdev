(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        vm.website = WebsiteService.findWebsiteById(websiteId);
        var website_list = WebsiteService.findWebsitesByUser(userId);
        vm.websiteList = website_list;

    }
})();


