const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    solutionID: {
        type: Schema.Types.ObjectId,
        ref: 'Solution',
        required: [true, 'solutionID is required']
    },
    //ToDo: nice to have
    // questionsID: {
    //     type: Array,
    //     default: []
    // },
    staticAutomaticFeedback: {
        type: Array,
        required: [true, 'staticAutomaticFeedback is required']
    },
    dynamicAutomaticFeedback: {
        type: Array,
        default: []
    },
    lecturerFeedback: {
        type: Array,
        default: []
    },
    systemGrade: {
        type: Number,
        default: 0
    },
    systemGradeReasons: {
        type: Array,
        default: []
    },
    lecturerGrade: {
        type: Number,
        default: 0
    },
    lecturerGradeReasons: {
        type: Array,
        default: []
    }
    }, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
