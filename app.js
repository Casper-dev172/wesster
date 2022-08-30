const amazonScraper = require('amazon-buddy');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

var fs = require('fs');


var sleep = require('sleep');
app.listen(port);

console.log('http://localhost:' + port);


let books = [];




app.use(express.json());
app.post('/api', (req, res)=>{
    const search = req.body;

    var productsss = null;

    (async () => {
      try {

          
          sleep.sleep(50);
          const products = await amazonScraper.products({ keyword: `${search.search}`, number: 600, country: 'TR' });
          productsss = products
  
          let data = JSON.stringify(products);
          fs.writeFile("books.txt", data, (err) => {
              if (err)
                console.log(err);
              else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(fs.readFileSync("books.txt", "utf8"));
              }
            });

            
  
          
         
  
          let text = "";
  
          for (let i = 0; i < products.totalProducts; i++) {
              console.log(products.result[i++].price.current_price)
          }

          


          
  
  
         
      } catch (error) {
          console.log(error);
      }
    })();
      
   
    console.log(search.search);
    app.get('/',(req, res)=>{
      res.send(JSON.stringify(productsss));


      
      
      
    });
})
  

