const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const cors        = require('cors');
const dbconf      = require('./config/dbconfig.js')
const mongoose    = require('mongoose');
const port        = 5000;

mongoose.connect(dbconf.url,function(){
    console.log("connected to DB")
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use( require( './routes/index.js' ) ) ;




app.listen(port, () => {
    console.log('We are live on ' + port);
});
