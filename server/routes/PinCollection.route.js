const express = require('express');
const { uploadSingle, uploadMultiple } = require('../middleware/multerConfig'); 
const PinCollectionController = require('../controllers/pinCollection.controller');
const PinController = require('../controllers/pin.controller');

module.exports = (app) => {
    // PinCollection routes
app.post('/api/pinCollection', uploadSingle, PinCollectionController.createPinCollection);
app.get('/api/pinCollection', PinCollectionController.getAllPinCollection);
app.get('/api/pinCollection/:id/pins', PinController.getPinsByPinCollectionId); // <-- This comes before the next one
app.get('/api/pinCollection/:id', PinCollectionController.getPinCollectionById);
app.put('/api/pinCollection/:id', PinCollectionController.updatePinCollection);
app.delete('/api/pinCollection/:id', PinCollectionController.deletePinCollection);

// Pin routes
app.post('/api/pinCollection/:pinCollectionId/pin', (req, res, next) => {
    console.log(req.body);  // Logs the text fields
    console.log(req.files); // This would be undefined at this point, but just for clarity
    next();
}, uploadMultiple, PinController.createPin);
app.get('/api/pin', PinController.getAllPins);
app.get('/api/pin/:id', PinController.getPinById);
app.put('/api/pin/:id', uploadMultiple, PinController.updatePin);
app.delete('/api/pin/:id', PinController.deletePin);

}


