var express = require('express');
var app = express();
const cors = require('cors');



const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(cors())


//routes
app.use(require("./routes/jobRoutes"));

app.listen(3001, function() {
    console.log('Example app listening on port 3001!');
});
