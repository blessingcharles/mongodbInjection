const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { userSignup, userLogin } = require("./controllers/usersControllers");
const verifyJWT = require("./jwt-verify");

const app = express();

app.use(bodyparser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Accept,Content-Type,X-Requested-With,Origin,Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "*");

    next();
});

app.post("/signup", userSignup);
app.post("/login", userLogin);

app.use(verifyJWT);
app.get("/secret" , (req,res)=>{
    return res.json({
        message:"success"
    })
})

mongoose
    .connect(
        "mongodb+srv://hello123:zaqwerm321@cluster0.ngskc.mongodb.net/abacusCTF?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        app.listen(5000);
        console.log("mongodb connected");
    })
    .catch((err) => {
        console.log(err);
    });
