const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(
  () => console.log("successfully connected"),
  (e) => console.log(e.message)
);


const siteSchema = new mongoose.Schema({
  original_url: {type: String, trim: true, unique: true},
  short_url: {type: Number, min: 1, max: 5000, unique: true}
});


module.exports = mongoose.model("Site", siteSchema)
