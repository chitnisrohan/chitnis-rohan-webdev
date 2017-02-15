(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets =[
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "Welcome to FIFA 16"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/sports/"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://www.youtube.com/embed/AfeDwkIaHNY" }
        ];

        var api = {
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            var newWidget;
            if(widget.widgetType === "HEADER") {
                newWidget = { "_id": (new Date()).getTime().toString(),
                    "widgetType": widget.widgetType, "pageId": pageId, "size": widget.size, "text": widget.text};
            } else if (widget.widgetType === "HTML") {
                newWidget = { "_id": (new Date()).getTime().toString(),
                    "widgetType": widget.widgetType, "pageId": pageId, "text": widget.text};
            } else {
                newWidget = { "_id": (new Date()).getTime().toString(),
                    "widgetType": widget.widgetType, "pageId": pageId, "width": widget.width, "url": widget.url};
            }
            widgets.push(newWidget);
            return newWidget;
        }

        function findWidgetsByPageId(pageId) {
            var widgetList = [];
            for(var w in widgets) {
                var widget = widgets[w];
                if (widget.pageId === pageId) {
                    widgetList.push(widget);
                }
            }
            if(widgetList.size < 1) {
                return null;
            } else {
                return angular.copy(widgetList);
            }
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                var widget = widgets[w];
                if (widget._id === widgetId) {
                    return angular.copy(widget);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                var widgetToBeUpdated = widgets[w];
                if (widgetToBeUpdated._id === widgetId) {
                    if(widgetToBeUpdated.widgetType === "HEADER") {
                        widgetToBeUpdated.size = widget.size;
                        widgetToBeUpdated.text = widget.text;
                        return angular.copy(widgetToBeUpdated);
                    } else if(widgetToBeUpdated.widgetType === "HTML") {
                        widgetToBeUpdated.text = widget.text;
                        return angular.copy(widgetToBeUpdated);
                    } else {
                        widgetToBeUpdated.width = widget.width;
                        widgetToBeUpdated.url = widget.url;
                        return angular.copy(widgetToBeUpdated);
                    }
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                var widgetToBeDeleted = widgets[w];
                if (widgetToBeDeleted._id === widgetId) {
                    widgets.splice(w,1);
                    return angular.copy(widgetToBeDeleted);
                }
            }
            return null;
        }

    }
})();