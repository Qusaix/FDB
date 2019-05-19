const express = require('express');
const app = express();
const PORT = 3001;
const bodyparser = require('body-parser')
const mysql = require('mysql');
const path = require('path');
const pino = require('express-pino-logger');
const Core = require('cors');
app.use(Core());
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// to creare the connection
const connection = mysql.createConnection({
    host : 'localhost',
    user:'root',
    password:"1111",
   database: 'restaurants'
});
// app.use(pino)

// Create DB
app.get("/CRDATA",(req,res)=>{
  let sql = 'CREATE DATABASE if not exists restaurants'
  connection.query(sql,(err,result)=>{
    if(err){
      throw err
    };
    console.log(result);
    res.send("The Database was created successfully")
    console.log("Data Base Created")
    connection.end();

  });
});
//create table inside DB
app.get("/CRTable",(req,res)=>{

  let CreateTable = `CREATE TABLE if not exists restaurants(
   id int primary key AUTO_INCREMENT,
   Name VARCHAR(255),
   address VARCHAR(255),
   Food VARCHAR(500),
   Phonenumber int
   )`
    connection.query(CreateTable,(err,result)=>{
      if(err) throw err;
      console.log(result);
      console.log("Table Was Created On Successfully")
      res.send("Table Was Created")
    })
  });

  app.get("/price",(req,res)=>{
    res.send("Done")
  })

   // Create User Inside The Databasce /* TEST FOR ADMIN ACCOUNT*/
  app.get("/CN",(req,res)=>{
  let newRestaurant = {
    Name:'mac',
    address:"Amman",
    Food:"hamburger",
    Phonenumber:'07757231'
  };
  const added = 'INSERT INTO restaurants SET ?'
  connection.query(added,newRestaurant,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send("User Was Added")

  })
})

// Search Into the database   and appear all the data
app.get("/getUsers",(req,res)=>{
  let serchItem = 'SELECT * FROM restaurants';
 connection.query(serchItem,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send("This all the users")

  });
});

// Search Into the database and appear all the data
app.get("/getoneUser",(req,res)=>{
  let serchItem = 'SELECT * FROM restaurants WHERE Name'
  connection.query(serchItem,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send("this the User")

  });
});






// The connection made
connection.connect((err)=>{
  if(err){
    console.log("There is a error :",err);
  }
  console.log("The Conection made Successfully");
});


// THE SERVER
app.use(express.static('public'))

app.get('/',(req, res) => res.sendFile(path.join(__dirname,"../../public",'index.html')));



//app.get('/',(res,req) => res.sendfile('index.html'));


app.listen(PORT, () => console.log("The Server is working on "+PORT));