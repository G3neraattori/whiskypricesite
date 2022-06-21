const http = require('http');
const https = require('https');
const fs = require('fs');
const xlsx = require('xlsx');
const Datedata = require("./models/history");
const History = require('./models/historysubschema')
const mongoose = require('mongoose')
const cfg = require('./configs/dbconfig')
const date = new Date();

/*mongoose.connect(cfg.database);
mongoose.connection.on('connected', () =>{
    console.log(cfg.database)
});*/

//TODO do this once a day at set time interval.
const getFile = async() =>{
    const url = "https://www.alko.fi/INTERSHOP/static/WFS/Alko-OnlineShop-Site/-/Alko-OnlineShop/fi_FI/Alkon%20Hinnasto%20Tekstitiedostona/alkon-hinnasto-tekstitiedostona.xlsx";
    const file = fs.createWriteStream('./temp/data.xlsx')
    //TODO maybe make this not insecure...
    const request = https.get(url, {insecureHTTPParser: true}, function (res){
        res.pipe(file)
        file.on('finish', ()=>{
            file.close()
            setTimeout(() => {parseXlsxToDB(); console.log('done')}, 5000);
            console.log('Finished')
            return true;
        });
    }).on('error', (e) =>{
        console.log(e)
    });
    return false;
}


function parseXlsxToDB() {
    const file = xlsx.readFile('./temp/data.xlsx');
    const worksheet = file.Sheets[file.SheetNames[0]];
    /*let datedata = new Datedata({
        date: date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear(),
        products:[History]

    })*/
    const datedata = new Datedata();
    datedata.date = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
    datedata.save()
        .then((result) => {
            console.log("Parsing ok")
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
            history.bottleSize = worksheet['D' + z].v
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
//parseXlsxToDB();

//unused
function normalSearch(){

    const test1 = Datedata.find({productName: "Jameson"})
    test1.select('productName bottleSize pricePerLiter');
    //console.log(test1)
    test1.exec(function (err, person) {
        if (err) throw (err);

        console.log(person);
    });
}
//normalSearch()
/*
function populateSearchFunction(){
    Datedata.find()
        .populate({
            path: 'products',
            model: History,
            match: { productName: 'Jameson', bottleSize: '0,7 l'},
        })
        .exec(function (err, x){
           if (err) throw err;
           console.log(x[0])
        });
}
*/
//populateSearchFunction()
//console.log(mongoose.connection.collections)



//generateFakeData()

module.exports = {
    generateDayData: async () => {
        await getFile().then(function (val){
            /*if(val){
                setTimeout(() => {parseXlsxToDB(); console.log('done')}, 5000);

            }*/
            return true;
        })
        return false;

    },

    //this will create you random data. The dates might be wrong though cause unlike the real data collection, this doesn't
    //take any actual day data but just the day it was used on (as int) + 1
    //Also doesn't change the price per liter realistically
    generateFakeData() {

        console.log("GENERATING FAKE DATA. THIS WILL TAKE A WHILE!!!!")
        const file = xlsx.readFile('./temp/data.xlsx');
        const worksheet = file.Sheets[file.SheetNames[0]];
        /*let datedata = new Datedata({
            date: date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear(),
            products:[History]

        })*/
        for(let i = 0; i < 10; i++){
            const datedata = new Datedata();
            datedata.date = date.getDate() + i + '.' + date.getMonth() + '.' + date.getFullYear()
            datedata.save()
                .then((result) => {
                    console.log("generation round ok")
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
                    history.bottleSize = worksheet['D' + z].v
                    history.price = (parseFloat(worksheet['E' + z].v) + Math.floor(Math.random() * 10)).toString()
                    history.pricePerLiter = worksheet['F' + z].v
                    history.productType = productTypeS
                    history.save()
                        .then((result) => {
                            Datedata.findOne({ date: date.getDate() + i + '.' + date.getMonth() + '.' + date.getFullYear() }, (err, datedata) => {
                                if (datedata) {
                                    datedata.products.push(history);
                                    datedata.save();
                                }
                            });
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                }
            }
        }

    }

}
