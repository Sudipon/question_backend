const schema_mongoose = require('mongoose');

const AnswerSchema = schema_mongoose.Schema(
    {
        empanswer: { type: String },
        img_path: { type: String },
        empquestion: { type: String },
        qid: { type: String },
        empemail: { type: String },
        eid: { type: String },
        regdatetime: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
);

module.exports = schema_mongoose.model('ans_schema_collections', AnswerSchema);