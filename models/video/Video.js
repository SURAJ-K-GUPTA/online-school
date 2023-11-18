const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    id: Number,
    subTopicId: Number,
    links: [{id:Number,link:String}],
  },
  {
    timestamps: true,
});


  const Video = mongoose.model("Video",videoSchema)

  module.exports = Video