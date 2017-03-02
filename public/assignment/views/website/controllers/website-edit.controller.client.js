(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        vm.editWebsite = editWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.goToProfile = goToProfile;
        vm.goToWebsiteList = goToWebsiteList;
        vm.goToEditWebsite = goToEditWebsite;
        vm.createWebsite = createWebsite;
        vm.goToWebsite = goToWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(websiteId)
                .success(function (website) {
                    vm.website = website;
                });
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

        function createWebsite() {
            $location.url("/user/"+ userId +"/website/new");
        }

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(websiteId)
                .success(function (deletedWebsite) {
                    if(deletedWebsite == null){
                        vm.error = "Website cannot be deleted";
                    }else{
                        $location.url("/user/"+ userId +"/website/");
                    }
                });
        }

        function editWebsite() {
            var website = {name: vm.website.name,    developerId: userId,
                description: vm.website.description};
            WebsiteService
                .updateWebsite(websiteId,website)
                .success(function (updatedWebsite) {
                    if(updatedWebsite == null){
                        vm.error = "Website cannot be updated";
                    }else{
                        $location.url("/user/"+ userId +"/website/");
                    }
                });
        }
    }
})();


