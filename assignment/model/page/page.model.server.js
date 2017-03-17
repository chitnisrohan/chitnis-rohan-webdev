module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        createPage : createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage: updatePage,
        deletePage : deletePage
    };
    return api;

    function deletePage(pageId) {
        var deferred = Q.defer();
        PageModel
            .remove({_id:pageId}, function (err, page) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function updatePage(pageId, updatedPage) {
        var deferred = Q.defer();
        PageModel
            .findOne({_id : pageId}, function (err, page) {
                if(err) {
                    deferred.abort(err);
                } else {
                    PageModel
                        .update({_id : page._id},{$set : {name : updatedPage.name,
                            description : updatedPage.description}},
                            function (err, page) {
                                if(err) {
                                    deferred.abort(err);
                                } else {
                                    deferred.resolve(page);
                                }
                        });
                }
            });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = Q.defer();
        PageModel
            .findOne({_id : pageId}, function (err, page) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = Q.defer();
        PageModel
            .find({_website : websiteId},
                function (err, pageList) {
                    if(err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(pageList);
                    }
                });
        return deferred.promise;
    }

    function createPage(websiteId, page) {
        var deferred = Q.defer();
        PageModel
            .create(page, function (err, page) {
                if(err) {
                    deferred.abort(err);
                } else {
                    PageModel
                        .update({_id : page._id}, {$set : {_website : websiteId}},
                        function (err, page) {
                            if (err) {
                                deferred.abort(err);
                            } else {

                            }
                        });
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function setModel(_model) {
        model = _model;
    }

};