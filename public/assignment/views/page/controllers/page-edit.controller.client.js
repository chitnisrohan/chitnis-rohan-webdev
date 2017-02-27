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
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pageList) {
                    vm.pageList = pageList;
                });
            PageService
                .findPageById(pageId)
                .success(function (page) {
                    vm.page = page;
                });
        }
        init();

        function goToWidgetList(pageid) {
            $location.url("/user/"+ userId +"/website/"+ websiteId + "/page/"+ pageid + "/widget");
        }

        function deletePage() {
            PageService
                .deletePage(pageId)
                .success(function (deletedPage) {
                    if (deletedPage == null) {
                        vm.error = "Page cannot be deleted";
                    } else {
                        goToPageList();
                    }
                });
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
            PageService
                .updatePage(pageId,pageToEdit)
                .success(function (pageToEdit) {
                    if(pageToEdit == null) {
                        vm.error = "Page cannot be edited";
                    } else {
                        goToPageList();
                    }
                });
        }
    }
})();

