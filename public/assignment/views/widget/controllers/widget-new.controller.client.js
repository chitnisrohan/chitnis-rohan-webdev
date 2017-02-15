(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, WidgetService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        vm.widgetType = $routeParams['wgtype'].toString();

        function init() {
            vm.mode = "new";
        }
        init();

        vm.addWidget = addWidget;
        vm.goToWidgetList = goToWidgetList;

        function goToWidgetList() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget");
        }
        
        function addWidget(widget) {
            var newWidget;
            if(vm.widgetType === 'HEADER') {
                newWidget = {"text": widget.text, "size": widget.size, "widgetType" : vm.widgetType};
            } else {
                newWidget = {"url": widget.url, "width": widget.width, "widgetType" : vm.widgetType};
            }

            newWidget = WidgetService.createWidget(pageId,newWidget);
            if(newWidget == null) {
                console.log("error");
            } else {
                $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget/");
            }
        }

    }
})();

