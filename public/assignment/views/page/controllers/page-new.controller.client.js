(function() {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        vm.goToPageList = goToPageList;
        vm.createPage = createPage;
        vm.goToEditPage = goToEditPage;
        vm.goToProfile = goToProfile;

        function init() {
            vm.pageList = PageService.findPageByWebsiteId(websiteId);
        }
        init();

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

        function goToEditPage(pageId) {
            $location.url("/user/"+ userId +"/website/" + websiteId + "/page/" + pageId);
        }
        
        function goToPageList() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/");
        }
        
        function createPage(page) {
            var newPage = {"name": page.name, "description": page.description };
            newPage = PageService.createPage(websiteId, newPage);
            if (newPage == null) {
                vm.error = "Page cannot be added";
            } else {
                goToPageList();
            }
        }
    }
})();

