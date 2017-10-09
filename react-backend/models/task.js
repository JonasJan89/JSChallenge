const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    taskText: {
        type: String,
        required: [true, 'teskText is required']
    },

    withFile: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: {createdAt: 'submissionTime'}
});

module.exports = mongoose.model('Task', TaskSchema);
