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
        // type: Schema.Types.ObjectId,
        // ref: 'Task',
        type: String,
        required: [true, 'taskID is required']
    },
    feedbackID: {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
    },

    //ToDo: nice to have
    // questionsID: {
    //     type: Array,
    //     default: []
    // },

    fileName: {
        type: String,
        required: [true, 'fileName is required']
    },

    //ToDo: nice to have Sonst eigene Route und eigenes Model
    // testdata: {
    //     type: Array,
    //     default: []
    // },
    approvedForLecturer: {
        type: Boolean,
        default: false
    }
    }, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('Solution', SolutionSchema);
