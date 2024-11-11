import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
    },
    senha: {
        type: String,
        required: true,
    },
    achievements: {
        type: [String],
        default: [],
    },
},
{timestamps: true});

export default mongoose.model("User", UserSchema);
