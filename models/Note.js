var mongoose = require("mongoose");

// This saves a reference to the Schema constructor:
var Schema = mongoose.Schema;

// This creates a new NoteSchema objec (similar to a Sequelize model) using the Schema constructor:
var NoteSchema = new Schema({
    // Here, `title` is of type String:
    title: String,
    // Here, `body` is of type String:
    body: String
});

// This creates the model from the above schema using Mongoose's model method:
var Note = mongoose.model("Note", NoteSchema);

// This exports the Note model:
module.exports = Note;