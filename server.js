const express = require('express');
const app =express();
const bodyparser=  require('body-parser')
const serverConfig = require('./configs/serverConfig')
const mongoose = require('mongoose')
const dbConfig = require("./configs/db.config");
const User = require('./models/userSchema')
const bcrypt =require('bcryptjs')
const constants =require('./utils/constants')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));



mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connected to mongodb");
  });
  
  db.once("open", () => {
    console.log("connected to mongodb");
    init();
  });

  
  async function init() {

    try {
      await User.collection.drop();
      
      const users = await User.insertMany([{
        name: "LakshyaS",
        userId: "admin",
        password: bcrypt.hashSync("LakshyaWelcome", 8),
        email: "LakshyaS@gmail.com",
        role: constants.roles.admin,
        userStatus: constants.userStatus.approved,
      },{
        name: "LakshyaA",
        userId: "superAdmin",
        password: bcrypt.hashSync("LakshyaWelcome", 8),
        email: "LakshyaA@gmail.com",
        role: constants.roles.superAdmin,
        userStatus: constants.userStatus.approved,
      }]);
      console.log(users)
    } catch (err) {
      console.log("err in db initialization", err.message);
    }
  }
  
  require("./routes/auth.routes")(app);
  
  require("./routes/user.routes")(app);

app.listen(serverConfig.PORT,()=>{
    console.log("server started at port number " , serverConfig.PORT)
});
