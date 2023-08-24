const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/DisneyPinCollector", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
    .then(() => console.log("Establish connection to server"))
    .catch(err => console.log("somethign went wrong when connecting to the database"))