const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    id: Number,
    name: String,
    subjectId: Number,
    classId: Number,
    subTopics: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubTopic"
    }],
  },
  {
    timestamps: true,
});

  const Topic = mongoose.model("Topic",topicSchema)

  module.exports = Topic