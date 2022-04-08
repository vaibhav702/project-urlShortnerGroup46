const mongoose = require("mongoose");


const urlSchema = new mongoose.Schema({

  // { urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url},
  //  shortUrl: {mandatory, unique} }
   urlCode:{ type:String, required:true, unique:true, lowercase:true, trim:true},
   longUrl:{type:String, required:true, trim:true, unique:true,},
   shortUrl:{type:String, required:true, unique:true}  
   

})

module.exports = mongoose.model("UrlShortner", urlSchema)



// caches are used to store temporary fiels , and that fiels are stored into cpu cache, 
// basically it's an small part of RAM but more close to Operating SYstem
// this is small chunk (part) of memory on computer where some data is stored that is frequentlu used 
// or recently used  
// By using cashing browser save some part of website to load it faster when we visit the same website
// next time 

//so basically how it will perform faster execution it stores the accurate address of that website
//so next time when the request get send to server at that time it will also send accurate address 
//of that site so when serever get this request at this time i will not check whre the data is stored 
// at that time server will also have accurate address so server will immidiatly send responce 

//we can store short url in our cache and increase user experiance

// uses =>

// 1=> we avoid DB calls so we can save time
// 2=> reduce loading time
// 3=> better user experience