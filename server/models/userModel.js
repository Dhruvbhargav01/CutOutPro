import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    creditBalance: {
        type: Number,
        default: 8
    }
});

// “If the user model already exists in Mongoose, use it. Otherwise, create it with userSchema.”
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;