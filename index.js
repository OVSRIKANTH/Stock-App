const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

//Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebar routes
app.get('/', function (req, res) {
    res.render('home');
});

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, console.log("server listening at "+PORT))
