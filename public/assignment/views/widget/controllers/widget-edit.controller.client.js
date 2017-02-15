(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        var widgetId = $routeParams['wgid'];

        vm.getWidgetById = getWidgetById;
        vm.goToPageList = goToPageList;
        vm.goToWidgetChooser = goToWidgetChooser;
        vm.editWidget = editWidget;
        vm.goToProfile = goToProfile;
        vm.deleteWidget = deleteWidget;
        vm.goToWidgetList = goToWidgetList;

        function init() {
            getWidgetById();
        }
        init();

        function goToWidgetList() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget");
        }
        
        function deleteWidget(widget) {
            var deletedWidget = WidgetService.deleteWidget(widget._id);
            if(deletedWidget == null) {
                vm.error = "widget could not be deleted";
            } else {
                $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget");
            }
        }
        

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

        function editWidget(widgetToBeEdited) {
            var newWidget;
            if(vm.widget.widgetType === "HEADER") {
                newWidget = {"text": widgetToBeEdited.text, "size": widgetToBeEdited.size};
            } else {
                newWidget = {"width": widgetToBeEdited.width, "url": widgetToBeEdited.url};
            }

            var updatedWidget = WidgetService.updateWidget(widgetId, newWidget);

            if(updatedWidget == null) {
                vm.error = "widget could not be updated";
            } else {
                $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget");
            }
        }

        function getWidgetById() {
            var widget = WidgetService.findWidgetById(widgetId);
            if(widget === null) {
                vm.error = "could not find widget";
            }
            else {
                vm.widget = widget;
            }
        }

        function goToWidgetChooser() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget/new");
        }

        function goToPageList() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId);
        }


        }
})();