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
        deletePage : deletePage,
        addWidgetToPage: addWidgetToPage,
        deleteWidgetFromPage: deleteWidgetFromPage,
        deleteAllPagesForThisWebsite: deleteAllPagesForThisWebsite
    };
    return api;

    function deleteAllPagesForThisWebsite(pages) {
        var deferred = Q.defer();
        var pageList = [];
        for(var i = 0; i < pages.length ; i++) {
            pageList.push(pages[i]);
        }

        for(var p in pageList) {
            var pageId = pageList[p];
            PageModel
                .findOne({_id: pageId}, function (err, page) {
                   if (err) {
                       deferred.abort(err);
                   } else {
                       model
                           .widgetModel
                           .deleteAllWidgetsForThisPage(page.widgets)
                           .then(
                               function () {
                                   PageModel
                                       .remove({_id: page._id}, function (err, page) {
                                           if (err) {
                                               deferred.abort(err);
                                           } else {
                                               deferred.resolve(page);
                                           }
                                       });
                                   deferred.resolve(page);
                               },
                               function (err) {
                                   deferred.abort(err);
                               }
                           );
                   }
                });
        }
        deferred.resolve(pages);
        return deferred.promise;
    }

    function deleteWidgetFromPage(pageId, widgetId) {
        var deferred = Q.defer();
        PageModel
            .update({_id: pageId}, {$pull : {widgets: widgetId}},
                function (err, page) {
                    if(err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(page);
                    }
            });
        return deferred.promise;
    }

    function addWidgetToPage(pageId, widgetId) {
        var deferred = Q.defer();
        PageModel
            .update({_id: pageId},{$push: {widgets : widgetId}},
                function (err, page) {
                    if(err) {
                        deferred.abort();
                    } else {
                        deferred.resolve(page);
                    }
            });
        return deferred.promise;
    }

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