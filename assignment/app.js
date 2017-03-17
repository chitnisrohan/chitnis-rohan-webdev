module.exports = function (app) {

    var model = require("./model/model.server")();

    require('./services/user.service.server.js')(app, model);
    require('./services/website.service.server.js')(app, model);
    require('./services/page.service.server.js')(app, model);
    require('./services/widget.service.server.js')(app, model);


};