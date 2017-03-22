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

        vm.addWidget = addWidget;
        vm.goToWidgetList = goToWidgetList;
        vm.goToProfile = goToProfile;
        vm.goToFlikrSearchPage = goToFlikrSearchPage;

        function init() {
            vm.mode = "new";
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pageId = pageId;
        }
        init();

        function goToFlikrSearchPage() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget/new/flickerImage");
        }

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

        function goToWidgetList() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget");
        }
        
        function addWidget(widget) {
            var newWidget;
            if(vm.widgetType === 'HEADER') {
                newWidget = {"text": widget.text, "size": widget.size, "widgetType" : vm.widgetType};
            } else if (vm.widgetType === 'HTML') {
                newWidget = {"text": widget.text, "widgetType" : vm.widgetType};
            } else if (vm.widgetType === 'TEXT') {
                newWidget = {"text": widget.text, "rows" : widget.rows,
                    "placeholder" : widget.placeholder, "formatted" : widget.formatted,
                "widgetType": vm.widgetType};
            } else {
                newWidget = {"url": widget.url, "width": widget.width, "widgetType" : vm.widgetType};
            }

            WidgetService
                .createWidget(pageId,newWidget)
                .success(function (newWidget) {
                    if(newWidget == null) {
                        vm.error = "error adding widget";
                    } else {
                        $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget/");
                    }
                });
        }

    }
})();

