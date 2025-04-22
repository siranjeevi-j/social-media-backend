const mongoose = require("mongoose");

const StatusEnum = {
  INTERESTED: "interested",
  REJECTED: "rejected",
  APPROVED: "approved",
  BLOCKED: "blocked",
  NOT_INTERESTED: "not_interested",
};

const connectionRequestSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: StatusEnum,
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ from: 1, to: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Check if the fromUserId is same as toUserId
  if (connectionRequest.from.equals(connectionRequest.to)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next();
});

const ConnectRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectRequestModel;
