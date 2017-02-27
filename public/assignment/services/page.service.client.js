(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService() {

        var api = {
            "createPage":createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var newPage = {_id: (new Date()).getTime().toString(), name: page.name,    websiteId: websiteId,
                description: page.description};
            pages.push(newPage);
            return angular.copy(newPage);
        }

        function findPageByWebsiteId(websiteId) {
            var pageList = [];
            for (p in pages){
                var page = pages[p];
                if(page.websiteId === websiteId){
                    pageList.push(page);
                }
            }
            if(pageList.size < 1){
                return null;
            }
            else{
                return angular.copy(pageList);
            }
        }

        function findPageById(pageId) {
            for (p in pages) {
                var page = pages[p];
                if(page._id === pageId) {
                    return angular.copy(page);
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (p in pages) {
                var newPage = pages[p];
                if(newPage._id === pageId) {
                    newPage.name = page.name;
                    newPage.description = page.description;
                    return angular.copy(newPage);
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for (p in pages) {
                var page = pages[p];
                if(page._id === pageId) {
                    pages.splice(p,1);
                    return angular.copy(page);
                }
            }
            return null;
        }

    }

})();
