const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      default: "Mi Fiesta",
      required: [true, 'El nombre del evento es requerido.'],
    },
    hostName: {
        type: String,
    },
    eventDate: {
        type: Date,
        required: [true, 'La fecha del evento es requerida.'],
    },
    eventTime: {
        type: String,
    },
    eventImg: {
        type: String, 
    },
    eventColor: {
        type: String,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
