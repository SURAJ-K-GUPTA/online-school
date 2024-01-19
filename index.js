require('dotenv').config();
const express = require("express");
const cors = require("cors")
const Class = require("./models/class/Class");
const Subject = require("./models/subject/Subject");
const Topic = require("./models/topic/Topic");
const SubTopic = require("./models/subTopic/SubTopic");
const Video = require("./models/video/Video");
const Question = require("./models/question/Question");
require("./config/dbConnect");
const path = require('path')
const app = express();

app.use(cors())

app.use(express.json()); //pass incoming data
app.use(express.urlencoded({ extended: true })); //pass form data
app.use(express.static('build'))


app.get("/classes", async (req, res) => {
  try {
    const api = await Class.find().populate({
      path: "subjects",
      populate: {
        path: "topics",
        populate: {
          path: "subTopics",
          populate: [{ path: "videos" }, { path: "questions" }],
        },
      },
    });
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/classes", async (req, res) => {
  const { id, name } = req.body;
  try {
    const api = await Class.create({
      id,
      name,
    });
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/subjects", async (req, res) => {
  try {
    const api = await Subject.find().populate({
      path: "topics",
      populate: {
        path: "subTopics",
        populate: [{ path: "videos" }, { path: "questions" }],
      },
    });
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/subjects", async (req, res) => {
  const { id, name, classId } = req.body;
  try {
    const classFound = await Class.findOne({ id: classId });
    const api = await Subject.create({
      id,
      name,
      classId,
    });
    classFound.subjects.push(api._id);
    await classFound.save();
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/topics", async (req, res) => {
  try {
    const api = await Topic.find().populate({
      path: "subTopics",
      populate: [{ path: "videos" }, { path: "questions" }],
    });
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/topics", async (req, res) => {
  const { id, name, subjectId, classId } = req.body;
  try {
    const subjectFound = await Subject.findOne({ id: subjectId });
    const api = await Topic.create({
      id,
      name,
      subjectId,
      classId,
    });
    subjectFound.topics.push(api._id);
    await subjectFound.save();
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/subTopics", async (req, res) => {
  try {
    const api = await SubTopic.find().populate([
      { path: "videos" },
      { path: "questions" },
    ]);
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/subTopics", async (req, res) => {
  const { id, name, topicId, subjectId, classId, theory } = req.body;
  try {
    const topicFound = await Topic.findOne({ id: topicId });
    const api = await SubTopic.create({
      id,
      name,
      topicId,
      subjectId,
      classId,
      theory,
    });
    topicFound.subTopics.push(api._id);
    await topicFound.save();
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/questions", async (req, res) => {
  try {
    const api = await Question.find();
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/questions", async (req, res) => {
  const { id, subTopicId, statement, options, correctAnswer, explanation } =
    req.body;
  try {
    const subTopicFound = await SubTopic.findOne({ id: subTopicId });
    const api = await Question.create({
      id,
      subTopicId,
      statement,
      options,
      correctAnswer,
      explanation,
    });
    subTopicFound.questions.push(api._id);
    await subTopicFound.save();
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/videos", async (req, res) => {
  try {
    const api = await Video.find();
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/videos", async (req, res) => {
  const { id, subTopicId, links } = req.body;
  try {
    const subTopicFound = await SubTopic.findOne({ id: subTopicId });
    const api = await Video.create({
      id,
      subTopicId,
      links,
    });
    subTopicFound.videos.push(api._id);
    await subTopicFound.save();
    res.json(api);
  } catch (error) {
    res.json({ error: error.message });
  }
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));

module.exports = app
