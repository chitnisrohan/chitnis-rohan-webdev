module.exports = function() {
    var mongoose = require("mongoose");
    //var WebsiteSchema = require("../website/website.schema.server")();

    var PageSchema = mongoose.Schema({
        _website: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        name: String,
        description: String,
        title: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "pageDB"});

    return PageSchema;

};