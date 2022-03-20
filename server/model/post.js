const mongoose = require('mongoose');
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
  },
  status: {
    type: String,
    enum: ['TO_LEARN', 'LEARNING', 'FINISH'],
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
});

module.exports =  mongoose.model('posts', PostSchema);
