module.exports = function (app) {
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages){
            var page = pages[p];
            if(page._id === pageId){
                pages.splice(p,1);
                res.json(page);
                break;
            }
        }
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        var page = pages.find(function (page) {
            return page._id == pageId;
        });
        page.name = newPage.name;
        page.description = newPage.description;
        res.json(page);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        var page = pages.find(function (page) {
            return page._id == pageId;
        });
        res.json(page);
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        var pageList = [];
        pages.find(function (page) {
            if (page.websiteId === websiteId) {
                pageList.push(page);
            }
        });
        res.json(pageList);
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        var newPage = {_id: (new Date()).getTime().toString(), name: page.name,    websiteId: websiteId,
            description: page.description};
        pages.push(newPage);
        res.json(newPage);
    }

};
