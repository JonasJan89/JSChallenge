const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    subtasksID: {
        type: Array,
        required: [true, 'subtasksID is required']
    },
    solutionsID: {
        type: Array,
        default: []
    },
    title: {
        type: String,
        required: [true, 'title is required']
    },
    //toDo: Add tasktype task or exam
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    processingTime: {
        type: Number,
        default: 0
    },
    interval: {
        type: Number,
        default: 0
    },
    delayAllowed: {
        type: Boolean,
        default: true
    },
    disciplingDelay: {
        type: Boolean,
        default: false
    },
    delayPointDeduction: {
        type: Number,
        default: 0
    },
    submissionCount: {
        type: Number,
        default: 0
    },
    submissionPointDeduction: {
        type: Number,
        default: 0
    },
    gradeable: {
        Type: Boolean,
        default: false
    },
    // outlook: {
    //     Type: String,
    //     required: [true, 'outlook is required']
    // }
}, {
    timestamps: {createdAt: 'submissionTime'}
});

module.exports = mongoose.model('Task', TaskSchema);
