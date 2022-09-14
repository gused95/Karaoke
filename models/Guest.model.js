const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const guestSchema = new Schema(
  {
    name: String,
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Guest = model("Guest", guestSchema);

module.exports = Guest;
