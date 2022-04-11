const mongoose = require('mongoose');
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

module.exports = mongoose.model('navigations', NavigationSchema);
