const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config')
require('./routes/PinCollection.route')(app);

app.listen(8000, () => {
    console.log("listeniong on port 8000")
})