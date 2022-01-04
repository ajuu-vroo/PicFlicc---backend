const { Schema, model } = require("mongoose");

const picSchema = new Schema([
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      caption: {
        type: String,
      },
    },
  ]
);

module.exports = model("Pic", picSchema);
