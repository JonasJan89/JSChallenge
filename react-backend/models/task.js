const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    fileName: {
        type: String,
        default: null
    },
    taskText: {
        type: String,
        required: [true, 'teskText is required']
    }
}, {
    timestamps: {createdAt: 'submissionTime'}
});

module.exports = mongoose.model('Task', TaskSchema);
