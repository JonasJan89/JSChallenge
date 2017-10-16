const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
    taskID: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: [true, 'taskID is required']
    },
    fileName: {
        type: String,
        required: [true, 'fileName is required']
    }
    }, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('Solution', SolutionSchema);
