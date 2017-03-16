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
        // google: {
        //     id: String,
        //     token: String,
        //     email: String
        // },
        // role: {type: String, default: "STUDENT", enum: ['ADMIN', 'STUDENT', 'FACULTY']},
        // websites: [WebsiteSchema],
    }, {collection: "pageDB"});

    return PageSchema;

};