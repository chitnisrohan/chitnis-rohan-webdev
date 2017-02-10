(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];

        vm.goToPageList = goToPageList;
        vm.goToWidgetChooser = goToWidgetChooser;

        function init() {
            vm.widgetTypeList = [];
            vm.widgetTextList = [];
            vm.widgets = WidgetService.findWidgetsByPageId(pageId);
            for(var w in vm.widgets) {
                var widget = vm.widgets[w];
                vm.widgetTypeList.push(widget.widgetType);
                vm.widgetTextList.push(widget.text);
            }
        }
        init();

        function goToWidgetChooser() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget/new");
        }

        function goToPageList() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/"+ pageId);
        }
    }
})();