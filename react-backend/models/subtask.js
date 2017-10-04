const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubtaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    taskID: {
        type: Schema.Types.ObjectId,
        required: [true, 'taskID is required']
    },
    number: {
        type: Number,
        required: [true, 'number is required']
    },
    weighting: {
        type: Number,
        default: 0,
        min: [0,'weighting must be between 0 and 100'],
        max: [100,'weighting must be between 0 and 100'],
    },
    type: {
        type: String,
        required: [true, 'type is required']
    },
    taskText: {
        type: String,
        required: [true, 'taskText is required']
    },
    hintText: {
        type: String,
        required: [true, 'hintText is required']
    },
    codeSkeletonPath: {
        type: String,
        default: ''
    },
    corrigibleCodePath: {
        type: String,
        default: ''
    },
    testsetsID: {
        type: Array,
        required: [true, 'testsetsID is required']
    },
    sampleSolutionPath: {
        type: String,
        default: ''
    },
    withStudentsTestdata: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {createdAt: 'submissionTime'}
});

module.exports = mongoose.model('Subtask', SubtaskSchema);
