const urlModel=require("../model/urlModel");
const shortId= require("shortid")
const validator=require("../validator/validator")

const createUrl = async (req, res) =>{

    try {
        const longUrl = req.body.longUrl;
       
        console.log(longUrl)
    const base = "http://localhost:3000";//our server base code
    const urlCode = shortId.generate();
  
    // if (validator.validateUrl(longUrl)) {
      console.log(urlCode)
        let url = await urlModel.findOne({ longUrl });
        if (url) {
          return res.json(url);
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
        // return res.status(400).send({status:false,msg:"Not a Valid Url "})
    // }
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports.createUrl=createUrl;

const getUrl= async (req,res)=>{
   
   try {
    const urlCode=req.params.urlCode;
    const urlDocument=await urlModel.findOne({urlCode:urlCode})
    if(!urlDocument){
       res.status(404).send({status:true,msg:"url Document not Found"})
    }
    const longUrl=urlDocument.longUrl
    return res.redirect(longUrl)

   } catch (error) {
    return res.status(500).send({status:false,message:error.message})
   }

}
module.exports.getUrl=getUrl;