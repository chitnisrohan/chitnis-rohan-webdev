module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        createPage : createPage
    };
    return api;

    function createPage(websiteId, page) {
        var deferred = Q.defer();
        PageModel
            .create(page, function (err, page) {
                if(err) {
                    deferred.abort(err);
                } else {
                    console.log(page);
                    PageModel
                        .update({_id : page._id}, {$set : {_website : websiteId}},
                        function (err, page) {
                            if (err) {
                                deferred.abort(err);
                            } else {
                                deferred.resolve(page);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function setModel(_model) {
        model = _model;
    }

};