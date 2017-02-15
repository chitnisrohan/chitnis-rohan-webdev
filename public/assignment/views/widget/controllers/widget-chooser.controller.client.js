(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, WidgetService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];

        vm.goToProfile = goToProfile;
        vm.goToWidgetList = goToWidgetList;
        vm.goToWidgetNew = goToWidgetNew;
        
        function goToWidgetNew(widgetType) {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId +
                "/widget/create/" + widgetType);
        }

        function goToWidgetList() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget");
        }

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

    }
})();


