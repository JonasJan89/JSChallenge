const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestsetSchema = new Schema({
    unittestPath: {
        type: String,
        required: [true, 'unittestPath is required']
    },
    testdata: {
        type: Array,
        required: [true, 'testdata is required']
    }
}, {
    timestamps: {createdAt: 'submissionTime'}
});

module.exports = mongoose.model('Testset', TestsetSchema);
