const mongoose = require('mongoose');

const URI = "Your Database url";

mongoose.connect(URI);
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true});
const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error into coonect to the database'));

db.once('open',function()
{
    console.log("/////Database is connected sucessfully/////");
});





// const connectDB = async () => {
//     await mongoose.connect(URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true
//     });
//     console.log('db connected..!');
//   };
  
//   module.exports = connectDB;
  




