module.exports = function (app, model) {
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        model
            .pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    model
                        .widgetModel
                        .deleteAllWidgetsForThisPage(page.widgets)
                        .then(
                            function () {
                                model
                                    .websiteModel
                                    .deletePageFromWebsite(page._website[0], pageId)
                                    .then(
                                        function (website) {
                                            model
                                                .pageModel
                                                .deletePage(pageId)
                                                .then(
                                                    function (page) {
                                                        res.json(page)
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

                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        model
            .pageModel
            .updatePage(pageId, newPage)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        model
            .pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        model
            .pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    model
                        .websiteModel
                        .addPageToWebsite(websiteId, page._id)
                        .then(
                            function () {
                                res.json(page);
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
};
