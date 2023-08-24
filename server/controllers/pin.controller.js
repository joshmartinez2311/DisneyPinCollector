const Pin = require('../models/pin.model');
const PinCollection = require('../models/pinCollection.model');

module.exports.createPin = (req, res) => {
    console.log("Inside PinController.createPin");
    const pinCollectionId = req.params.pinCollectionId;

    if (!pinCollectionId) {
        return res.status(400).json({ error: 'PinCollectionId is required.' });
    }

    const pinData = {
        name: req.body.name,
        movie: req.body.movie,
        description: req.body.description,
        condition: req.body.condition,
        isDuplicate: req.body.isDuplicate === 'true', // Because this is a checkbox value
        pinCollection: pinCollectionId,
        images: req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        }))
    };

    // First, ensure the PinCollection exists
    PinCollection.findById(pinCollectionId)
        .then(pinCollection => {
            if (!pinCollection) {
                throw new Error('PinCollection not found.');
            }
            return Pin.create(pinData);
        })
        .then(pin => {
            res.json(pin);
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(400).json(err);
            } else {
                res.status(500).json({ error: err.message });
            }
        });
    };

    exports.getPinsByPinCollectionId = (req, res) => {
         Pin.find({ pinCollection: req.params.id })
        .then(pins => {
            res.json(pins);
            })
            .catch(err => {
            res.status(500).json(err);
            });
    };
//find all pins
module.exports.getAllPins = (req, res) => {
    Pin.find({})
        .then(pins => {
            console.log(pins);
            res.json(pins)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
}

// get one pin by id
module.exports.getPinById = (req, res) => {
    Pin.findOne({_id: req.params.id})
    .then(pin => res.json(pin))
    .catch(err => res.json(err))
}

//updtae pin
module.exports.updatePin = (req, res) => {
    // Handle the uploaded images, if any
    const updatedData = { ...req.body };

    if (req.files && req.files.length) {
        const uploadedImages = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype,
        }));
        updatedData.images = uploadedImages;
    }

    Pin.findOneAndUpdate({_id: req.params.id}, updatedData, {new:true})
        .then(updatedPin => res.json(updatedPin))
        .catch(err => res.json(err));
};

// delete pin 
module.exports.deletePin = (req, res) => {
    Pin.deleteOne({_id: req.params.id})
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json(err))
}