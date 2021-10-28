const schema_mongoose = require('mongoose');

const QuestionSchema = schema_mongoose.Schema(
    {
    authorname: {type: String},
    authoremail: {type: String},
    empquestion: { type: String },
    empcatagory: {type : String},
	regdatetime: { type: Date, default: Date.now }
    }, 
    {
       timestamps: true
    }
    );

module.exports = schema_mongoose.model('que_schema_collections', QuestionSchema);