import * as mongoose from 'mongoose';
import { CommonSchema } from '../constant/CommonSchema';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    baned: {
        type: Boolean,
        default: false,
    },
    ...CommonSchema,
});

export default mongoose.model('users', UserSchema);
