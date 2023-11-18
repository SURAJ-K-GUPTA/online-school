const mongoose = require('mongoose')

//subject schema
const subjectSchema = new mongoose.Schema({
    id: Number,
    name: String,
    classId: Number,
    topics: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Topic"
    }],
},
{
    timestamps: true,
})

const Subject = mongoose.model("Subject",subjectSchema);
module.exports= Subject