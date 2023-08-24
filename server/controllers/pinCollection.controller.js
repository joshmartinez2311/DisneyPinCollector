const PinCollection = require('../models/pinCollection.model');
const Pin = require('../models/pin.model');
module.exports.createPinCollection = (req, res) => {
    // Log request body and file for debugging
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Extract form data and create the pin collection
    const pinCollectionData = {
        name: req.body.name,
        coverImage: req.file ? {
            data: req.file.buffer, // Store image data from memory
            contentType: req.file.mimetype, // Store content type
        } : null // Store null if no image was uploaded
    };

    PinCollection.create(pinCollectionData)
        .then(pinCollection => res.json(pinCollection))
        .catch(err => {
            if (err.name === 'ValidationError') {
                return res.status(400).json(err);
            } else {
                return res.status(500).json(err);
            }
        });
};

module.exports.getAllPinCollection = (req, res) => {
    PinCollection.find({})
        .populate('pins') // Populate the 'pins' field with actual pin data
        .then(pinCollections => res.json(pinCollections))
        .catch(err => res.json(err));
}

module.exports.getPinCollectionById = (req, res) => {
    PinCollection.findOne({ _id: req.params.id })
        .populate('pins') // Populate the 'pins' field with actual pin data
        .then(pinCollection => res.json(pinCollection))
        .catch(err => res.json(err));
}

module.exports.updatePinCollection = (req, res) => {
    const pinCollectionId = req.params.id;
    
     // Define an array of conditions
     const conditions = ['New', 'Used'];
 
     // Use Promise.all to create pins for all conditions and then update the pin collection
     Promise.all(conditions.map(condition => {
         return Pin.create({
             name: 'Pin Name',
             movie: 'Movie Name',
             description: 'pin decription',
             condition: condition,
             images: 'pin images',
             isDuplicate: false
         });
     }))
     .then(newPins => {
         // Find the pin collection by ID
         return PinCollection.findById(pinCollectionId)
             .then(pinCollection => {
                 if (!pinCollection) {
                     return res.status(404).json({ message: 'Pin collection not found' });
                 }
 
                 // Push the new pins' IDs to the pins array of the pin collection
                 newPins.forEach(newPin => {
                     pinCollection.pins.push(newPin._id);
                 });
                 return pinCollection.save();
             });
     })
     .then(updatedPinCollection => res.json(updatedPinCollection))
     .catch(err => res.status(500).json(err));
 };
 

module.exports.deletePinCollection = (req, res) => {
    PinCollection.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err));
}