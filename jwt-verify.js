const jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{

    if(req.method === 'OPTIONS') return next()
    
    let token
    try{
        token = req.headers.authorization
       // console.log(token)
        if(!token){
            throw new Error('authentication failed in token verification')
        }
        const tokenInfo = jwt.verify(token,"secretkey")
        console.log(tokenInfo)
        req.userData = {email:tokenInfo.email}
        next();
    }
    catch(err){
        return res.json({error:"auth failed"})
    }
}