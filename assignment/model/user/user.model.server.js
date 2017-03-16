module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var Q = require("q");

    var api = {
        createUser: createUser,
        addWebsiteToUser:addWebsiteToUser,
        removeWebsiteFromUser : removeWebsiteFromUser,
        findUserByUsername : findUserByUsername,
        // findUserByGoogleId: findUserByGoogleId,
         findUserById: findUserById,
         findUserByCredentials: findUserByCredentials,
        // findWebsitesForUser: findWebsitesForUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel
    };
    return api;
    
    function removeWebsiteFromUser(websiteId, userId) {
        var deferred = Q.defer();
        UserModel
            .update(
                {_id : userId}, {$pull : {websites : websiteId}},
                function (err, user) {
                    if(err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(user);
                    }
                }
            );
        return deferred.promise;
    }

    function addWebsiteToUser(userId, websiteId) {
        var deferred = Q.defer();
        UserModel
            .find({"_id": userId}, function (err, user) {
                if(err) {
                    deferred.abort(err);
                } else {
                    UserModel
                        .update({"_id":userId},
                            {$push:{websites : websiteId}},
                            function (err, user) {
                                if(err) {
                                    deferred.abort(err);
                                } else {
                                    deferred.resolve(user);
                                }
                            });
                }
            });
        return deferred.promise;
    }

    function setModel(_model) {
        model = _model;
    }

    function updateUser(userId, newUser) {
        var deferred = Q.defer();
        UserModel
            .find({"_id": userId}, function (err, user) {
                if(err) {
                    deferred.abort(err);
                } else {
                    UserModel
                        .update({"_id":user._id},{$set:{firstName: newUser.firstName,
                                        lastName: newUser.lastName,
                                        email: newUser.email}},
                            function (err, user) {
                                if(err) {
                                    deferred.abort(err);
                                } else {
                                    deferred.resolve(user);
                                }
                        });
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = Q.defer();
        UserModel
            .find({"username": username}, function (err, user) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
    
    function findUserById(userId) {
        var deferred = Q.defer();
        UserModel
            .findOne({_id: userId}, function (err, user) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = Q.defer();
        UserModel
            .find({"username": username, "password": password}, function (err, user) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
    
    function createUser(user) {
        var deferred = Q.defer();
        UserModel
            .create(user, function (err, user) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = Q.defer();
        UserModel
            .remove({"_id":userId}, function (err, status) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

};