const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/site", {useNewUrlParser: true}).then(
  () => {console.log("successfully connected to the database")},
  (err) => {console.error(error)}
);


const siteSchema = new mongoose.Schema({
  original_url: {type: String, trim: true, unique: true},
  short_url: {type: Number, min: 1, max: 5000, unique: true}
});


module.exports = mongoose.model("Site", siteSchema)
