module.exports = function (app) {

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
        var checkuser = users.find(function (user) {
            return user.username == newUser.username;
        });
        if(checkuser == null) {
            var user = {_id: (new Date()).getTime().toString(),
                username: newUser.username,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email};
            users.push(user);
            res.json(user);
        } else {
            res.send('Username already taken. Please choose another Username');
            //res.sendStatus(404).send('Username already taken. Please choose another Username');
        }
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                users.splice(u,1);
                res.json(user);
                break;
            }
        }
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        var user = users.find(function (user) {
            return user._id == userId;
        });
        user.firstName = newUser.firstName;
        user.lastName = newUser.lastName;
        user.email = newUser.email;
        res.json(user);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (user) {
            return user._id == userId;
        });
        res.json(user);
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
        var user = users.find(function (user) {
            return user.username == username;
        });
        res.json(user);
    }

    function findUserByCredential(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function (user) {
            return user.password == password && user.username == username;
        });
        res.json(user);
    }

};