module.exports = function() {
    var mongoose = require("mongoose");
    //var WebsiteSchema = require("../website/website.schema.server")();

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        dateCreated: {type: Date, default: Date.now}
        // google: {
        //     id: String,
        //     token: String,
        //     email: String
        // },
        // role: {type: String, default: "STUDENT", enum: ['ADMIN', 'STUDENT', 'FACULTY']},
        // websites: [WebsiteSchema],
    }, {collection: "userDB"});

    return UserSchema;

};