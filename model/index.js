const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Coc", { useNewUrlParser: true, useUnifiedTopology: true } , (e,db) =>{
    if(e) {
        console.log('Error - ',e.stack);
    }
    else {
        console.log('Successful Connection to database');
    }
});

module.exports = {
    Base: require("./base"),
    Clan: require("./clan"),
    RegisteredClan: require("./registeredClan"),
    VerifiedClan: require("./verifiedClan")
}