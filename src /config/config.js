const mongoose = require("mongoose");
const dbSrv = "mongodb://127.0.0.1:27017/Project_2";
mongoose.set('strictQuery', false);
db = mongoose.connect(
    dbSrv,{ useNewUrlParser: true ,useUnifiedTopology: true},
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Database connected");
        }
    }
);
module.exports = { db };
