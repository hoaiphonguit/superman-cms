import * as mongoose from 'mongoose';
import { CommonSchema } from '../constant/CommonSchema';
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    ...CommonSchema,
});

export default mongoose.model('photos', PhotoSchema);
