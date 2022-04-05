const urlModel=require("../model/urlModel");
const shortId= require("shortid")
const validator=require("../validator/validator")
var validUrl = require('valid-url');




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
  
    // if (!validator.validateUrl(longUrl)) {
      console.log(urlCode)

        let url = await urlModel.findOne({ longUrl });
        if (url) {
          return res.status(200).json(url);
        } else {
          const shortUrl = `${base}/${urlCode}`;
  
          newUrl = {
            longUrl,
            shortUrl,
            urlCode,
            // date: new Date(),
          };
      //if url short is created already so we are going to find it and give that url to user
         const dbUrl = await urlModel.create(newUrl);
          return res.status(200).send({status:true, data: newUrl, dburl:dbUrl});
  
        }
    // }else{
    //     return res.status(400).send({status:false,msg:"Not a Valid Url "})
    // }
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}


const getUrl= async (req,res)=>{
   
   try {
    const urlCode=req.params.urlCode;
    const urlDocument=await urlModel.findOne({urlCode:urlCode})
    if(!urlDocument){
       res.status(404).send({status:true,msg:"url Document not Found"})
    }
    const longUrl=urlDocument.longUrl
    return res.status(302).redirect(longUrl)

   } catch (error) {
    return res.status(500).send({status:false,message:error.message})
   }

}


module.exports.createUrl=createUrl;
module.exports.getUrl=getUrl;