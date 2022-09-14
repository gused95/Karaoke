const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const songSchema = new Schema(
  {
    videoId: String,
    position: Number,
    guest: { type: Schema.Types.ObjectId, ref: 'Guest' },
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
    title: String,
    img: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Song = model("Song", songSchema);

module.exports = Song;
