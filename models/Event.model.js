const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      default: "Mi evento",
    },

    eventDate: {
        type: Date,
    },
    code: {
      type: String,
      unique: true,
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
