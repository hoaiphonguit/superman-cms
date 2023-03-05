import { POST_STATUS } from '../constant/Post';
import * as mongoose from 'mongoose';
import { CommonSchema } from '../constant/CommonSchema';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        enum: POST_STATUS,
        required: true,
        default: 0,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    publishDate: {
        type: Date,
    },
    ...CommonSchema,
});

export default mongoose.model('posts', PostSchema);
