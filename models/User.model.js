const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "Nombre es requerido."],
    },
    apellido: {
      type: String,
      required: [true, "Apellido es requerido."],
    },
    correo: {
      type: String,
      required: [true, "Correo es requerido."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor use una direccion de correo valido.'],
    },
    password: {
      type: String,
      required: [true, "Contraseña es requerida."],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
