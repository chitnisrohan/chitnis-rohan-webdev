(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.createWebsite = createWebsite;

        var website_list = WebsiteService.findWebsitesByUser(userId);
        vm.websiteList = website_list;

        function createWebsite() {
            var website = {_id: (new Date()).getTime().toString(), name: vm.website.name,    developerId: userId,
                description: vm.website.description};
            WebsiteService.createWebsite(userId,website);
        }



    }
})();

