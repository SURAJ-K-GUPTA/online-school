const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    id: Number,
    subTopicId: Number,
    statement: String,
    options: [
      {
        id: Number,
        text: String,
      },
    ],
    correctAnswer: Number,
    explanation: String,
  },
  {
    timestamps: true,
});

  const Question = mongoose.model("Question",questionSchema)
 module.exports = Question
  