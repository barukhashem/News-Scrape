var mongoose = require("mongoose");

// This saves a reference to the Schema constructor:
var Schema = mongoose.Schema;

// This creates a new UserSchema object (similar to a Sequelize model) using the Schema constructor:
var ArticleSchema = new Schema({
    // Here, `title` is required and of type String:
    title: {
        type: String,
        required: true
    },
    // Here, `link` is required and of type String:
    link: {
        type: String,
        required: true
    },
    // Here, `note` is an object that stores a Note id:
    // The ref property links the ObjectId to the Note model (which allows populating the Article with an associated Note):
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// This creates the model from the schema above using Mongoose's model method:
var Article = mongoose.model("Article", ArticleSchema);

// This exports the Article model:
module.exports = Article;