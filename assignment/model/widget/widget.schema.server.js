module.exports = function() {
    var mongoose = require("mongoose");
    //var WebsiteSchema = require("../website/website.schema.server")();

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref:'PageModel'},
        widgetType: {
            type: String,
            enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']
        },
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: String,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now},
        order : Number
    }, {collection: "widgetDB"});

    return WidgetSchema;

};