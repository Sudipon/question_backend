const schema_mongoose = require('mongoose');

const ContactSchema = schema_mongoose.Schema(
    {
    empname: { type: String },
    empemail: { type: String },
    empsubject: { type: String },
    empmessage: { type: String },
    
    }, 
    {
       timestamps: true
    }
    );

module.exports = schema_mongoose.model('Contact_schema_collection', ContactSchema);