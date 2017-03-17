module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/test');

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel : websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    pageModel.setModel(model);
    userModel.setModel(model);
    websiteModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};