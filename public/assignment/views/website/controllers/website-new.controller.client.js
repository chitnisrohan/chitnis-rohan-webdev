(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.createWebsite = createWebsite;
        vm.goToProfile = goToProfile;
        vm.goToWebsiteList = goToWebsiteList;
        vm.goToEditWebsite = goToEditWebsite;
        vm.goToWebsite = goToWebsite;

        function init() {
            vm.websiteList = WebsiteService.findWebsitesByUser(userId);
        }
        init();

        function goToWebsite(websiteId) {
            // var website = WebsiteService.findWebsiteById(websiteId);
            $location.url("/user/"+ userId +"/website/" + websiteId + "/page");
            // vm.website = website;
        }

        function goToEditWebsite(websiteId) {
            $location.url("/user/"+ userId +"/website/" + websiteId);
        }

        function goToWebsiteList() {
            $location.url("/user/"+ userId +"/website/");
        }

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

        function createWebsite(website) {
            var newWebsite = {"name": website.name, "description": website.description};
            newWebsite = WebsiteService.createWebsite(userId,newWebsite);
            if(newWebsite == null){
                vm.error = "Website cannot be added";
            }else{
                goToWebsiteList();
            }
        }
    }
})();

