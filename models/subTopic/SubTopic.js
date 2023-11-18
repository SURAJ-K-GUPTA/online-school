const mongoose = require('mongoose')

const subTopicSchema = new mongoose.Schema({
    id: Number,
  name: String,
  topicId: Number,
  subjectId: Number,
  classId: Number,
  theory: String,
  videos: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Video"
}],
  questions: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Question"
}],
},
{
    timestamps: true,
})

const SubTopic = mongoose.model("SubTopic",subTopicSchema)

module.exports = SubTopic