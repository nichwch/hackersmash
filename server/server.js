const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const cors        = require('cors');
const mongoose    = require('mongoose');
const port        = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use( require( './routes/index.js' ) ) ;




app.listen(port, () => {
    console.log('We are live on ' + port);
});
