const mongoose = require('mongoose')

//class schema
const classSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        subjects: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subject"
        }],
    },
    {
        timestamps: true,
    }

)

const Class = mongoose.model("Class",classSchema);
module.exports= Class