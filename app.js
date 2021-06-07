const express = require('express');
const bodyparser =require('body-parser');
const mongoose = require('mongoose')
const bcrypt =  require('bcryptjs')

const {userSignup , userLogin } = require('./controllers/usersControllers')

const app = express();

app.use(bodyparser.json())
app.use((req,res,next)=>{

    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',  
                                    'Accept,Content-Type,X-Requested-With,Origin,Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');

    next()
})


app.post('/signup',userSignup)
app.post('/login',userLogin)

mongoose
.connect('mongodb://localhost:27017/testingmongo',{ useNewUrlParser: true} )
.then(()=>{
    app.listen(5000);
    console.log('mongodb connected')}
)
.catch(
    (err)=>{
        console.log(err)
    }
)
