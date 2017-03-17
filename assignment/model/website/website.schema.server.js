module.exports = function() {
    var mongoose = require("mongoose");
    //var WebsiteSchema = require("../website/website.schema.server")();

    var WebsiteSchema = mongoose.Schema({
        _user: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref:'PageModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "websiteDB"});

    return WebsiteSchema;

};