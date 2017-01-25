/**
 * Created by chitn on 1/22/2017.
 */
function adjustStyle() {
    var width = 0;
    // get the width.. more cross-browser issues
    if (window.innerHeight) {
        width = window.innerWidth;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        width = document.documentElement.clientWidth;
    } else if (document.body) {
        width = document.body.clientWidth;
    }
    // now we should have it
    if (width < 800) {
        document.getElementById("myCSS").setAttribute("href", "css/narrow.css");
    } else {
        document.getElementById("myCSS").setAttribute("href", "css/style.css");
    }
}

// now call it when the window is resized.
window.onresize = function () {
    adjustStyle();
};