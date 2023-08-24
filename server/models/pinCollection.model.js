const mongoose = require('mongoose');

const PinCollectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coverImage: {
        data: Buffer,
        contentType: String
    },
    pins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pin'
    }]
}, {
    timestamps: true
});

const PinCollection = mongoose.model('PinCollection', PinCollectionSchema);

module.exports = PinCollection;



