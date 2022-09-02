const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose"); //including mongoose package
mongoose.connect("mongodb://localhost/contactDance");
const port = 8000;

// Define Schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  address: String,
  desc: String,
});

// Defining Model
const Contact = mongoose.model("Contact", contactSchema);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  const contactData = new Contact(req.body);
  contactData.save().then(() => {
    res.send("This information has been saved to database.");
  }).catch(() => {
    res.status(400).send("This information was not saved to the database");
  });
  // res.status(200).render("contact.pug");
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
