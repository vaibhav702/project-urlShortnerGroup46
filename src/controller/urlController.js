const urlModel=require("../model/urlModel");
const shortId= require("shortid")
const validator=require("../validator/validator")
var validUrl = require('valid-url');
const redis = require("redis");

const { promisify } = require("util");
//or
// const util = require('util')
// const promisify = util.promisify



// The node.js "util" module provides some functions to print formatted strings as well
// as some 'utility' functions that are helpful for debugging purposes. Use require('util') 
// to access these functions. Following functions are in the module 'util'

// The util. promisify() method basically takes a function as an input that follows the common 
// Node. js callback style, i.e., with a (err, value) and returns a version of the same that
// returns a promise instead of a callback



//Connect to redis
const redisClient = redis.createClient(
  11588,  // port number
  "redis-11588.c212.ap-south-1-1.ec2.cloud.redislabs.com",  // link sring
  { no_ready_check: true }  // 
);
redisClient.auth("6W26UpQbpdlmIq12YAQU8vSxeWVkc6cS", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});


// Redis credentials
// Link : redis-16368.c15.us-east-1-2.ec2.cloud.redislabs.com
// Port Number : 16368 Password : Y52LH5DG1XbiVCkNC2G65MvOFswvQCRQ

//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);
const SET_EXP   = promisify(redisClient.expire).bind(redisClient)







const createUrl = async (req, res) =>{

    try {
      if(!Object.keys(req.body).length){
        return res.status(400).send({status:false, message:"request body is empty please provide longUrl"})
      }
        const longUrl = req.body.longUrl;
       

        if(!validator.isValid(longUrl)){
          return res.status(400).send({status:false, message:"longUrl is not present please provide longUrl"})
        }
        if(!validUrl.isUri(longUrl)){
          return res.status(400).send({status:false, message:"invalid url please provide valid url"})
        }
      console.log(longUrl)
    const base = "http://localhost:3000";//our server base code
    const urlCode = shortId.generate().toLowerCase();
  
   
      console.log(urlCode)

        let url = await urlModel.findOne({ longUrl });
        if (url) {
          return res.status(200).json(url);
        } else {

          const generateUrl = ()=>{
          return`${base}/${urlCode}`;

          }
          const shortUrl = generateUrl()

          const duplicateUrl = await urlModel.findOne({shortUrl})

          if(duplicateUrl){
            shortUrl = generateUrl()
            //return res.send({status: 409, message:"please again hit this API to generate shortUrl"})
          }
  
          newUrl = {
            longUrl,
            shortUrl,
            urlCode,
            // date: new Date(),
          };
      //if url short is created already so we are going to find it and give that url to user
         const dbUrl = await urlModel.create(newUrl);
          return res.status(201).send({status:true, data:dbUrl});
  
        }
    
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}


const getUrl= async (req,res)=>{
   
   try {
    const urlCode=req.params.urlCode;

    if(!validator.isValid(urlCode)){
      return res.status(400).send({status:false, message:"longUrl is not present please provide longUrl"})
    }


   const redis_string_UrlDoc =  await GET_ASYNC(`${req.params.urlCode}`)
   console.log(redis_string_UrlDoc)
    const redis_UrlDoc = JSON.parse(redis_string_UrlDoc)
   if(redis_UrlDoc){
     console.log("responce from redis")
    return res.status(303).redirect(redis_UrlDoc.longUrl)
 }

    const urlDocument=await urlModel.findOne({urlCode:urlCode}).select({_id:0,urlCode:1, longUrl:1})
    if(urlDocument == null){
       return res.status(404).send({status:false,msg:"url Document not Found"})
    }
    await SET_ASYNC(`${urlCode}`, JSON.stringify(urlDocument))
    await SET_EXP(`${urlCode}`, 60)
    const longUrl=urlDocument.longUrl
    return res.status(302).redirect(longUrl)

   } catch (error) {
    return res.status(500).send({status:false,message:error.message})
   }

}


module.exports.createUrl=createUrl;
module.exports.getUrl=getUrl;
