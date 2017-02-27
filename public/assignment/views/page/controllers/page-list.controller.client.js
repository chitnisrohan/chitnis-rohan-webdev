(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        vm.goToWebsiteList = goToWebsiteList;
        vm.goToNewPage = goToNewPage;
        vm.goToPageEdit = goToPageEdit;
        vm.goToProfile = goToProfile;
        vm.goToWidgetList = goToWidgetList;

        function init() {
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pageList = pages;
                });
        }
        init();

        function goToWidgetList(pageid) {
            $location.url("/user/"+ userId +"/website/"+ websiteId + "/page/"+ pageid + "/widget");
        }

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

        function goToWebsiteList() {
            $location.url("/user/"+ userId +"/website/");
        }

        function goToPageEdit(pageId) {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/"+ pageId);
        }

        function goToNewPage() {
            $location.url("/user/"+ userId +"/website/"+websiteId+"/page/new");
        }
    }
})();