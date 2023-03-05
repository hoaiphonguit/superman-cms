import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NavigationItem = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
});

const NavigationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    children: [NavigationItem],
});

export default mongoose.model('navigations', NavigationSchema);
