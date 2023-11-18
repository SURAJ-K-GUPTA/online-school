const mongoose = require("mongoose");

const  dbConnect=async()=>{
    try {
        await mongoose.connect("mongodb+srv://vignamInternSuraj:FPAj8iBEfp8UAvj5@vignamcluster.iotehtj.mongodb.net/?retryWrites=true&w=majority");
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("DB Connection failed", error.message);
    }
};

dbConnect();
