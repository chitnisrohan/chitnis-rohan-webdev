module.exports = function (app, model) {

    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice", email:"alice@abc.com",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob", email:"bob@abc.com",     firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly", email:"charly@abc.com",  firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", email:"jannunzi@abc.com", firstName: "Jose",   lastName: "Annunzi" }
    ];

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
            .deleteUser(userId)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
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
                    res.send(user);
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