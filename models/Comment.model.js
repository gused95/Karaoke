const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const commentSchema = new Schema(
  {
    comment: String,
    guestId: { type: Schema.Types.ObjectId, ref: 'Guest' },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
