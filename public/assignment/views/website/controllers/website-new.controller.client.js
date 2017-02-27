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
            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (websiteList) {
                    vm.websiteList = websiteList;
                });
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
            WebsiteService
                .createWebsite(userId,newWebsite)
                .success(function (newWebsite) {
                    if(newWebsite == null){
                        vm.error = "Website cannot be added";
                    }else{
                        goToWebsiteList();
                    }
                });
        }
    }
})();

