(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };
        return api;

        function updateWebsite(websiteId, website) {

        }

        function deleteWebsite(websiteId) {

        }

        function findWebsiteById(websiteId) {
            for(var w in websites){
                var website = websites[w];
                if(website._id === websiteId){
                    return website;
                }
            }
            return null;
        }

        function createWebsite(userId, website) {
            var website = {_id: (new Date()).getTime().toString(), name: website.name,    developerId: userId,
                description: website.description};
            websites.push(website);
            return website;
        }

        function findWebsitesByUser(userId) {
            var websiteList = [];
            for(var w in websites) {
                var website = websites[w];
                if( website.developerId === userId ) {
                    websiteList.push(website);
                }
            }
            if(websiteList.size < 1){
                return null;
            }
            else{
                return websiteList;
            }
        }

    }
})();