import mongoose from "mongoose";
const likeSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: [true, "Post is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
  }
);

const likeModel = mongoose.model("like",likeSchema)
export default likeModel ;