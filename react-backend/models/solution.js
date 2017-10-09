const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
    studentID: {
        // type: Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        required: [true, 'studentID is required']
    },
    taskID: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: [true, 'taskID is required']
    },
    fileName: {
        type: String,
        required: [true, 'fileName is required']
    },
    approvedForLecturer: {
        type: Boolean,
        default: false
    }
    }, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('Solution', SolutionSchema);
