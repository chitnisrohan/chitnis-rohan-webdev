module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        createWebsiteForUser : createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite,
        addPageToWebsite: addPageToWebsite,
        deletePageFromWebsite : deletePageFromWebsite
    };
    return api;

    function deletePageFromWebsite(websiteId, pageId) {
        var deferred = Q.defer();
        WebsiteModel
            .findOne({_id: websiteId}, function (err, website) {
                if(err) {
                    deferred.abort(err);
                } else {
                    WebsiteModel
                        .update({_id: website._id}, {$pull : {pages: pageId}},
                            function (err, website) {
                                if(err) {
                                    deferred.abort(err);
                                } else {
                                    deferred.resolve(website);
                                }
                        });
                }
            });
        return deferred.promise;
    }

    function addPageToWebsite(websiteId, pageId) {
        var deferred = Q.defer();
        WebsiteModel
            .update({_id : websiteId}, {$push : {pages : pageId}}, function (err, updatedWebsite) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(updatedWebsite);
                }
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = Q.defer();
        WebsiteModel
            .update({_id : websiteId},
                {$set : {name : website.name, description : website.description}},
                function (err, updatedWebsite) {
                    if (err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(updatedWebsite);
                    }
        });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = Q.defer();
        WebsiteModel
            .remove({"_id":websiteId}, function (err, status) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = Q.defer();
        WebsiteModel
            .findOne({_id : websiteId},
                function (err, website) {
                    if(err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(website);
                    }
                });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = Q.defer();
        WebsiteModel
            .find({_user : userId},
                function (err, websiteList) {
                    if(err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(websiteList);
                    }
            });
        return deferred.promise;
    }

    function createWebsiteForUser(userId, website) {
        var deferred = Q.defer();
        WebsiteModel
            .create(website, function (err, website) {
                if(err) {
                    deferred.abort(err);
                } else {
                    WebsiteModel
                        .update({"_id":website._id},{$set : {_user : userId} },
                            function (err, updatedWebsite) {
                                if(err) {
                                    deferred.abort(err);
                                } else {

                                }
                        });
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function setModel(_model) {
        model = _model;
    }


};