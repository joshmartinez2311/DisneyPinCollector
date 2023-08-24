const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Pin name is required'],
        minlength: [2, 'Pin name must be at least 2 characters long']
    },
    movie: {
        type: String,
        required: [true, 'Movie is required'],
        minlength: [2, 'Movie name must be at least 2 characters long']
    },
    description: {
        type: String,
        // No need for required false, by default it won't be required
    },
    condition: {
        type: String,
        required: [true, 'Pin condition is required'],
        enum: ['New', 'Used'],
    },
    images: {
        type: [{
            data: Buffer,
            contentType: String
        }],
        validate: [val => val.length <= 3, 'A maximum of 3 images can be uploaded'],
    },
    pinCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PinCollection'
    },
    isDuplicate: {
        type: Boolean,
        required: [true, 'IsDuplicate field is required'],
        default: false,
    }
});

module.exports = mongoose.model('Pin', PinSchema);
