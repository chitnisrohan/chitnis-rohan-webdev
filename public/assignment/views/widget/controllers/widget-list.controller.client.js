(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $location, $sce) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];

        vm.getYoutubeURL = getYoutubeURL;
        vm.goToPageList = goToPageList;
        vm.goToWidgetChooser = goToWidgetChooser;
        vm.goToEditWidget = goToEditWidget;
        vm.goToProfile = goToProfile;
        vm.getTrustedHtml = getTrustedHtml;
        vm.rearrangeList = rearrangeList;

        function init() {
            vm.widgetTypeList = [];
            vm.widgetTextList = [];
            WidgetService
                .findWidgetsByPageId(pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
            for(var w in vm.widgets) {
                var widget = vm.widgets[w];
                vm.widgetTypeList.push(widget.widgetType);
                vm.widgetTextList.push(widget.text);
            }
        }
        init();

        function rearrangeList(updatedIndex){
            var promise=WidgetService.rearrangeList(pageId, updatedIndex);
            promise.error(function (){
                    vm.error="Unable to update WidgetList";
                }
            );
        }

        function getTrustedHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

        function goToEditWidget(widgetId) {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget/"+ widgetId);
        }
        
        function getYoutubeURL(widgetURL) {
            var splitURL = widgetURL.split("/");
            var videoCode = splitURL[splitURL.length-1];
            var url = "https://www.youtube.com/embed/"+videoCode;
            return $sce.trustAsResourceUrl(url);
        }

        function goToWidgetChooser() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/" + pageId + "/widget/new");
        }

        function goToPageList() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/");
        }
    }
})();