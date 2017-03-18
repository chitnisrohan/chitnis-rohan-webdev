module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        deleteAllWidgetsForThisPage: deleteAllWidgetsForThisPage,
        reorderWidget: reorderWidget
    };
    return api;
    
    function reorderWidget(pageId, initial, final) {
        var deferred = Q.defer();
        findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    WidgetModel
                        .findOne({"order": initial}, function (err, widget) {
                            if(widget && initial > final) {
                                for (var o = initial-1; o >= final; o--) {
                                    WidgetModel
                                        .update({"order":o},{$set : {"order": o+1}},
                                            function (err, widget) {
                                                if(err) {
                                                    deferred.abort(err);
                                                } else {
                                                   deferred.resolve(widgets);
                                                }
                                            });
                                }
                                WidgetModel
                                    .update({_id: widget._id},{$set :{"order": final}},
                                        function (err, status) {
                                            if(err) {
                                                deferred.abort(err);
                                            } else {
                                                deferred.resolve(widget);
                                            }
                                        });
                            } else if (widget && initial < final) {
                                for (var o = initial; o <= final; o++) {
                                    WidgetModel
                                        .update({"order":o},{$set : {"order": o-1}},
                                            function (err, widget) {
                                                if(err) {
                                                    deferred.abort(err);
                                                } else {
                                                    deferred.resolve(widgets);
                                                }
                                            });
                                }
                                WidgetModel
                                    .update({_id: widget._id},{$set :{"order": final}},
                                        function (err, status) {
                                            if(err) {
                                                deferred.abort(err);
                                            } else {
                                                deferred.resolve(widget);
                                            }
                                        });
                            } else {
                                deferred.reject(err);
                            }
                        });
                }, function (err) {
                    deferred.abort(err);
                }
            );
        return deferred.promise;
    }

    function deleteAllWidgetsForThisPage(widgets) {
        var deferred = Q.defer();
        var widgetList = [];
            for (var i = 0; i < widgets.length; i++) {
                widgetList.push(widgets[i]);
            }
            for (var w in widgetList) {
                WidgetModel
                    .remove({_id: widgets[w]}, function (err, widget) {
                        if (err) {
                            deferred.abort(err);
                        } else {
                            deferred.resolve(widget);
                        }
                    });
            }
        deferred.resolve(widgets);
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = Q.defer();
        console.log(widgetId);
        WidgetModel
            .findOne({_id : widgetId}, function (err, widget) {
                if (err) {
                    deferred.abort(err);
                } else {
                    console.log(widget._page);
                    WidgetModel
                        .find({"_page":widget._page}, function (err, widgets) {
                            if (err) {
                                deferred.abort(err);
                            } else {
                                console.log(widgets);
                                for(var o = widget.order ; o <= widgets.length - 1 ; o++) {
                                    WidgetModel
                                        .update({"order": o+1},{$set : {"order":o}},
                                            function (err, widget) {
                                                if(err) {
                                                    deferred.abort(err);
                                                } else {
                                                    WidgetModel
                                                        .remove({_id: widgetId}, function (err, widget) {
                                                            if (err) {
                                                                deferred.abort(err);
                                                            } else {
                                                                deferred.resolve(widget);
                                                            }
                                                        });
                                                }
                                            });
                                }
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = Q.defer();
        WidgetModel
            .update({_id: widgetId},
                {$set : {name : widget.name,
                    text : widget.text,
                    placeholder : widget.placeholder,
                    description: widget.description,
                    url: widget.url,
                    width: widget.width,
                    height: widget.height,
                    rows: widget.rows,
                    size: widget.size,
                    class: widget.class,
                    icon: widget.icon,
                    deletable: widget.deletable,
                    formatted: widget.formatted
                }},
                function (err, widget) {
                    if(err) {
                        deferred.abort();
                    } else {
                        deferred.resolve(widget);
                    }
            });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = Q.defer();
        WidgetModel
            .find({_page : pageId}, function (err, widgets) {
               if(err) {
                   deferred.abort(err);
               } else {
                   deferred.resolve(widgets);
               }
            }).sort({"order":1});
        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = Q.defer();
        WidgetModel
            .findOne({_id : widgetId}, function (err, widget) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, widget){
        var deferred = Q.defer();
        findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                            WidgetModel
                                .create(widget, function (err, widget) {
                                    if (err) {
                                        deferred.abort(err);
                                    } else {
                                        WidgetModel
                                            .update({_id: widget._id}, {_page: pageId}, function (err, widget) {
                                                if (err) {
                                                    deferred.abort(err);
                                                } else {

                                                }
                                            });
                                        deferred.resolve(widget);
                                    }
                                });
                }, function (err) {
                    deferred.abort(err);
                }
            );
        return deferred.promise;
    }
};