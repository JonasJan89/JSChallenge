const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    solutionID: {
        type: Schema.Types.ObjectId,
        ref: 'Solution',
        required: [true, 'solutionID is required']
    },
    staticAutomaticFeedback: {
        type: Array,
        //required: [true, 'staticAutomaticFeedback is required']
    },
    dynamicAutomaticFeedback: {
        type: Array,
        default: []
    }
    }, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
