(function() {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];

        vm.goToPageList = goToPageList;
        vm.goToProfile = goToProfile;
        vm.goToNewPage = goToNewPage;
        vm.editPage = editPage;
        vm.goToEditPage = goToEditPage;
        vm.deletePage = deletePage;
        vm.goToWidgetList = goToWidgetList;

        function init() {
            vm.pageList = PageService.findPageByWebsiteId(websiteId);
            vm.page = PageService.findPageById(pageId);
        }
        init();

        function goToWidgetList(pageid) {
            $location.url("/user/"+ userId +"/website/"+ websiteId + "/page/"+ pageid + "/widget");
        }

        function deletePage() {
            var deletedPage = PageService.deletePage(pageId);
            if (deletedPage == null) {
                vm.error = "Page cannot be deleted";
            } else {
                goToPageList();
            }
        }

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

        function goToNewPage() {
            $location.url("/user/"+ userId +"/website/" + websiteId + "/page/new");
        }

        function goToPageList() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/");
        }

        function goToEditPage(pageId) {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId);
        }

        function editPage(page) {
            var pageToEdit = {"name": page.name, "description": page.description};
            pageToEdit = PageService.updatePage(pageId,pageToEdit);
            if(pageToEdit == null) {
                vm.error = "Page cannot be edited";
            } else {
                goToPageList();
            }
        }
    }
})();

