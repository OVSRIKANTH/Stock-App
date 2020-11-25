const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
a=[{"symbol":"GOOG","exchange":"NAS","name":"Alphabet Inc. Class C","date":"2020-11-25","type":"cs","iexId":"IEX_57464A59544A2D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG009S3NB30","cik":"1652044"},{"symbol":"AAPL","exchange":"NAS","name":"Apple Inc.","date":"2020-11-25","type":"cs","iexId":"IEX_4D48333344362D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG000B9XRY4","cik":"320193"},{"symbol":"TSLA","exchange":"NAS","name":"Tesla Inc","date":"2020-11-25","type":"cs","iexId":"IEX_5132594E314E2D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG000N9MNX3","cik":"1318605"},{"symbol":"GOOGL","exchange":"NAS","name":"Alphabet Inc. Class A","date":"2020-11-25","type":"cs","iexId":"IEX_48544D304C4B2D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG009S39JX6","cik":"1652044"},{"symbol":"A","exchange":"NYS","name":"Agilent Technologies Inc.","date":"2020-11-25","type":"cs","iexId":"IEX_46574843354B2D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG000C2V3D6","cik":"1090872"},{"symbol":"AA","exchange":"NYS","name":"Alcoa Corp.","date":"2020-11-25","type":"cs","iexId":"IEX_4238333734532D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG00B3T3HD3","cik":"1675149"},{"symbol":"AAA","exchange":"PSE","name":"AAF First Priority CLO Bond ETF","date":"2020-11-25","type":"et","iexId":"IEX_5030314338392D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG00X5FSP48","cik":null},{"symbol":"AAAU","exchange":"PSE","name":"Perth Mint Physical Gold ETF","date":"2020-11-25","type":"et","iexId":"IEX_474B433136332D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG00LPXX872","cik":null},{"symbol":"AACG","exchange":"NAS","name":"ATA Creativity Global Sponsored ADR","date":"2020-11-25","type":"ad","iexId":"IEX_44595A4C53392D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG000V2S3P6","cik":null},{"symbol":"AACQ","exchange":"NAS","name":"Artius Acquisition Inc. Class A","date":"2020-11-25","type":"cs","iexId":"IEX_5230483539302D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG00VR487K7","cik":null},{"symbol":"AACQU","exchange":"NAS","name":"Artius Acquisition Inc. Units Cons of 1 Shs A + 1/3 Wt 13.07.25","date":"2020-11-25","type":"ut","iexId":"IEX_474656574E422D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG00VQPPKH7","cik":null},{"symbol":"AACQW","exchange":"NAS","name":"Artius Acquisition Inc Warrant 2020-13.07.2025 on Artius Acqn-A","date":"2020-11-25","type":"wt","iexId":"IEX_5750544759342D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG00X4SRY70","cik":null},{"symbol":"AADR","exchange":"PSE","name":"AdvisorShares Dorsey Wright ADR ETF","date":"2020-11-25","type":"et","iexId":"IEX_5253355435362D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG000BDYRW6","cik":null},{"symbol":"AAIC","exchange":"NYS","name":"Arlington Asset Investment Corp. Class A","date":"2020-11-25","type":"cs","iexId":"IEX_5351474631562D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG000BD1373","cik":null},{"symbol":"AAIC-B","exchange":"NYS","name":"Arlington Asset Investment Corp 7 % Cum Red Pfd Registered Series B","date":"2020-11-25","type":"ps","iexId":"IEX_534E425042542D52","region":"US","currency":"USD","isEnabled":true,"figi":null,"cik":null},{"symbol":"AAIC-C","exchange":"NYS","name":"Arlington Asset Investment Corp. Cum Conv Red Pfd Registered Shs Series C","date":"2020-11-25","type":"ps","iexId":"IEX_565946385A512D52","region":"US","currency":"USD","isEnabled":true,"figi":null,"cik":null},{"symbol":"AAL","exchange":"NAS","name":"American Airlines Group Inc.","date":"2020-11-25","type":"cs","iexId":"IEX_4353464A535A2D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG005P7Q881","cik":"6201"},{"symbol":"AAMC","exchange":"ASE","name":"Altisource Asset Management Corp.","date":"2020-11-25","type":"cs","iexId":"IEX_5442323844432D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG003PNL136","cik":"1555074"},{"symbol":"AAME","exchange":"NAS","name":"Atlantic American Corporation","date":"2020-11-25","type":"cs","iexId":"IEX_5737584C53442D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG000B9XB24","cik":"8177"},{"symbol":"AAN","exchange":"NYS","name":"Aarons Holdings Company Inc.","date":"2020-11-25","type":"cs","iexId":"IEX_534D305A30592D52","region":"US","currency":"USD","isEnabled":true,"figi":"BBG00VSH86G4","cik":"706688"}]
const PORT = process.env.PORT || 5000;



//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));



//API key       pk_b1989f0ccbc941d2baa3c85ab23caa8d 
// create call api function
function call_api(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_b1989f0ccbc941d2baa3c85ab23caa8d',{json: true}, (err, res, body)=>{
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

//Set handlebar index routes
app.get('/', function (req, res) {
    call_api( (doneAPI)=> res.render('home',{stock:doneAPI}), 'fb')                                                                                       // const api =  call_api()
                                                                                               // res.render('home',{stock:api});
});

//Set handlebar index POST routes
app.post('/', function (req, res) {
    posted_stuff= req.body.stock_ticker;
    call_api( (doneAPI)=> res.render('home',{stock:doneAPI}), posted_stuff)                                                                                       // const api =  call_api()
                                                                                        
});

app.get('/about', function (req, res) {
    //res.render('about');
    call_api( (doneAPI)=> res.render('about',{stock:doneAPI, companies:a}),'goog')
});

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, console.log("server listening at "+PORT))

