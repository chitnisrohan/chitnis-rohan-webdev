module.exports = function (app, model) {

    //var websiteService = require('./services/website.service.server.js')(app, model);

    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    function createUser(req, res) {
        var newUser = req.body;
        model
            .userModel
            .createUser(newUser)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    var websites = [];
                    for (var i = 0 ; i < user.websites.length ; i++) {
                        websites.push(user.websites[i]);
                    }
                    for(var w in websites) {
                        model
                            .websiteModel
                            .findWebsiteById(websites[w])
                            .then(
                                function (website) {
                                    model
                                        .pageModel
                                        .deleteAllPagesForThisWebsite(website.pages)
                                        .then(
                                            function () {
                                                model
                                                    .userModel
                                                    .removeWebsiteFromUser(website._id, website._user[0])
                                                    .then(
                                                        function () {
                                                            console.log(website._id);
                                                            model
                                                                .websiteModel
                                                                .deleteWebsite(website._id)
                                                                .then(
                                                                    function (website) {
                                                                        // res.json(website);
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
                    model
                        .userModel
                        .deleteUser(userId)
                        .then(
                            function (newUser) {
                                res.send(newUser);
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

        // model
        //     .userModel
        //     .deleteUser(userId)
        //     .then(
        //         function (newUser) {
        //             res.send(newUser);
        //         },
        //         function (err) {
        //             res.sendStatus(400).send(err);
        //         }
        //     );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        model
            .userModel
            .updateUser(userId, newUser)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUser(req, res) {
        if(req.query.username && req.query.password) {
            findUserByCredential(req, res);
        } else {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.sendStatus(400);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserByCredential(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
   }

};