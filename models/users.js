import mongoose from "mongoose";
import pkg from 'validator';
const { isEmail } = pkg;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model("Users", userSchema);
export default Users;