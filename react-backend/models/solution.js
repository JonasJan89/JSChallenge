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
    //todo remove

    text: {
        type: String,
        default: ''
    },

    // feedbackID: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Feedback',
    // },

    //ToDo: nice to have
    // questionsID: {
    //     type: Array,
    //     default: []
    // },

    // codePath: {
    //     type: String,
    //     required: [true, 'codePath is required']
    // },
    // testdata: {
    //     type: Array,
    //     default: []
    // },
    // approvedForLecturer : {
    //     type: Boolean,
    //     required: [true, 'approvedForLecturer is required']
    // }
    }, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('Solution', SolutionSchema);
