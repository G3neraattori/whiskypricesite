const http = require('http');
const https = require('https');
const fs = require('fs');
const xlsx = require('xlsx');
const Datedata = require("./models/history");
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
    let parsedData = [];
    const worksheet = file.Sheets[file.SheetNames[0]];

    let datedata = new Datedata({
        date: date.getDate(),
        products:[]

    })
    for (let z in worksheet) {

        if(z.toString()[0] === 'I' && worksheet[z].v.toString() === ('viskit')){
            let productTypeS = worksheet[z].v
            z = z.substring(1);
            let product = {
                productName: worksheet['B' + z].v,
                price: worksheet['E' + z].v,
                pricePerLiter: worksheet['F' + z].v,
                productType: productTypeS

            }
            datedata.products.push(product);
        }
    }
    datedata.save()
    console.log(datedata)
}

parseXlsxToDB()


