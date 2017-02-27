module.exports = function (app) {

    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        var newWebsite = {_id: (new Date()).getTime().toString(), name: website.name,
            developerId: userId,
            description: website.description};
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites){
            var wsite = websites[w];
            if(wsite._id === websiteId){
                websites.splice(w,1);
                res.json(wsite);
                break;
            }
        }
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (website) {
            return website._id == websiteId;
        });
        res.json(website);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        var website = websites.find(function (website) {
            return website._id == websiteId;
        });
        website.name = newWebsite.name;
        website.description = newWebsite.description;
        res.json(website);
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        var websiteList = [];
        websites.find(function (website) {
            if (website.developerId === userId) {
                websiteList.push(website);
            }
        });
        res.json(websiteList);
    }


};