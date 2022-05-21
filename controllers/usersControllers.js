const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.json({ error: "invalid data" });

    let identifyUser;
    try {
        //checking if email already exists
        identifyUser = await userModel.findOne({ email: email });
    } catch (err) {
        return res.json({ error: "something went wrong" });
    }

    if (identifyUser) return res.json({ error: "email already exists" });

    const user = new userModel({
        name,
        email,
        password,
    });

    try {
        await user.save();
    } catch (err) {
        return res.json({ error: "something went wrong" });
    }

    //generating jwt token
    let token;
    try {
        token = jwt.sign({ email: email }, "secretkey", { expiresIn: "24hrs" });
    } catch (err) {
        const error = new httpError("try again later", 400);
        return next(error);
    }

    res.status(201).json({ email: email, token: token });
};

const userLogin = async (req, res, next) => {
    let { email, password } = req.body;

    if (!email || !password) return res.json({ error: "invalid data" });

    let identifyUser;

    console.log(email);

    try {
        identifyUser = await userModel.findOne({
            email: email,
            password: password,
        });
    } catch (err) {
        return res.status(500).json({ error: "something went wrong" });
    }

    if (identifyUser) {
        //generate token other stuffs
        let token;
        try {
            token = jwt.sign({ email: identifyUser.email, isAdmin: false }, "secretkey", {
                expiresIn: "24hrs",
            });
        } catch (err) {
            const error = new httpError("try again later", 400);
            return next(error);
        }

        return res.status(200).json({ email: identifyUser.email, token: token });
    }

    res.status(400).json({ error: "invalid credentials" });
};

module.exports = {
    userSignup,
    userLogin,
};
