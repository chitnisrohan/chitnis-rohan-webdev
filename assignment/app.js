module.exports = function (app) {

    require('./services/user.service.server.js')(app);
    require('./services/website.service.server.js')(app);
    require('./services/pages.service.server.js')(app);


};