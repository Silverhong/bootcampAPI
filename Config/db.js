// const mongoose = require("mongoose");
// const connectDB = async () => {
//   const conn = await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   });
//   console.log("MongoDB Connected" + conn.connection.host);
// };
// module.exports = connectDB;

const sequelize = require('sequelize')



const db = new sequelize('lawenforcement','root','hong12345',{
  host:'localhost',
  port:3306
  ,dialect:'mysql'
});

db.authenticate().then(()=>console.log('Database Connected...')).catch(err=>console.log('Error: '+err))

module.exports = db;