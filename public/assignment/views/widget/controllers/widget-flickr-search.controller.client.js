(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService, $location, WidgetService) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        var widgetId = $routeParams['wgid'];
        
        vm.searchPhotos = searchPhotos;
        vm.goToImageNewPage = goToImageNewPage;
        vm.goToProfile = goToProfile;
        vm.selectPhoto = selectPhoto;
        
        function init() {
            
        }
        init();

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {};
            widget.url = url;
            widget.widgetType = "IMAGE";
            widget.width = "100%";
            if(widgetId) {
                WidgetService
                    .updateWidget(widgetId, widget)
                    .then(function () {
                        $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/"+ pageId +"/widget");
                    });
            } else {
                WidgetService
                    .createWidget(pageId, widget)
                    .then(function () {
                        $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/"+ pageId +"/widget");
                    });
            }
        }

        function goToProfile() {
            $location.url("/user/"+ userId);
        }

        function goToImageNewPage() {
            $location.url("/user/"+ userId +"/website/"+ websiteId +"/page/"+ pageId +"/widget/create/IMAGE");
        }

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

    }
})();