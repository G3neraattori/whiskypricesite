const http = require('http');
const https = require('https');
const fs = require('fs');
const xlsx = require('xlsx');
const Datedata = require("./models/history");
const History = require('./models/historysubschema')
const mongoose = require('mongoose')
const cfg = require('./configs/alkodbconfig')
const date = new Date();

mongoose.connect(cfg.database);
mongoose.connection.on('connected', () =>{
    console.log(cfg.database)
});

//TODO do this once a day at set time interval.
const getFile = async() =>{
    const url = "https://www.alko.fi/INTERSHOP/static/WFS/Alko-OnlineShop-Site/-/Alko-OnlineShop/fi_FI/Alkon%20Hinnasto%20Tekstitiedostona/alkon-hinnasto-tekstitiedostona.xlsx";
    const file = fs.createWriteStream('./client/temp/data.xlsx')
    //TODO maybe make this not insecure...
    const request = https.get(url, {insecureHTTPParser: true}, function (res){
        res.pipe(file)
        file.on('finish', ()=>{
            file.close()
        });
    }).on('error', (e) =>{
        console.log(e)
    });
}


function parseXlsxToDB() {
    const file = xlsx.readFile('./client/temp/data.xlsx');
    const worksheet = file.Sheets[file.SheetNames[0]];
    /*let datedata = new Datedata({
        date: date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear(),
        products:[History]

    })*/
    const datedata = new Datedata();
    datedata.date = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
    datedata.save()
        .then((result) => {
            console.log("ok")
        })
        .catch((error) => {
            console.log(error);
        });

    for (let z in worksheet) {
        if(z.toString()[0] === 'I' && worksheet[z].v.toString() === ('viskit')){
            let productTypeS = worksheet[z].v
            z = z.substring(1);
            /*let history = new History({
                productName: worksheet['B' + z].v,
                price: worksheet['E' + z].v,
                pricePerLiter: worksheet['F' + z].v,
                productType: productTypeS

            })*/
            const history = new History();
            history.productName = worksheet['B' + z].v
            history.price = worksheet['E' + z].v
            history.pricePerLiter = worksheet['F' + z].v
            history.productType = productTypeS
            history.save()
                .then((result) => {
                    Datedata.findOne({ date: date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() }, (err, datedata) => {
                        if (datedata) {
                            datedata.products.push(history);
                            datedata.save();
                        }
                    });
                })
                .catch((error) => {
                    console.log(error)
                });
            //datedata.products.push(history);
        }
    }
    //datedata.save()
    //console.log(datedata)
}

parseXlsxToDB()


