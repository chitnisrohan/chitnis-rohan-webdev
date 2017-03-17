module.exports = function (app, model) {

    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;

        model
            .websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function (website) {
                    model
                        .userModel
                        .addWebsiteToUser(userId, website._id)
                        .then(
                            function (user) {
                                res.send(website);
                            },
                            function (err) {
                                res.sendStatus(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    model
                        .pageModel
                        .deleteAllPagesForThisWebsite(website.pages)
                        .then(
                            function () {
                                model
                                    .userModel
                                    .removeWebsiteFromUser(websiteId, website._user[0])
                                    .then(
                                        function (website) {
                                            model
                                                .websiteModel
                                                .deleteWebsite(websiteId)
                                                .then(
                                                    function (website) {
                                                        res.json(website);
                                                    },
                                                    function (err) {
                                                        res.sendStatus(400).send(err);
                                                    }
                                                );
                                        },
                                        function (err) {
                                            res.sendStatus(400).send(err);
                                        }
                                    );
                            },
                            function (err) {
                                res.sendStatus(400).send(err);
                            }
                        );
                },
                        function (err) {
                            res.sendStatus(400).send(err);
                        });


    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        model
            .websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function (website) {
                    res.json(website);
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;

        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websiteList) {
                    res.json(websiteList);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }


};