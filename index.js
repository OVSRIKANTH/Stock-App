const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;

//API key       pk_b1989f0ccbc941d2baa3c85ab23caa8d 
// create call api function
function call_api(finishedAPI){
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_b1989f0ccbc941d2baa3c85ab23caa8d',{json: true}, (err, res, body)=>{
        if(err){return console.log(err);}
        //console.log(res);
        if(res.statusCode === 200){
           // console.log(body);
           finishedAPI(body) ; 
        }
    });

}


//Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebar routes
app.get('/', function (req, res) {
    call_api( (doneAPI)=> res.render('home',{stock:doneAPI}))                                                                                       // const api =  call_api()
                                                                                               // res.render('home',{stock:api});
});

app.get('/about', function (req, res) {
    //res.render('about');
    call_api( (doneAPI)=> res.render('about',{stock:doneAPI}))
});

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, console.log("server listening at "+PORT))

