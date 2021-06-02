var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
const register = function (req, res) {
    console.log("Registering user");
    var username = req.body.username;
    var name = req.body.name || null;
    var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create({
        username: username, name: name, password: password
    }, function (err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log("User created", user);
            res.status(200).json(user);
        }
    });
};

const login = function (req, res) {
    console.log("Logging in user");
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username }).exec(function (err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        }
        if (user) {
            console.log("user found", user);
            if (bcrypt.compareSync(password, user.password)) {
                var token = jwt.sign({ username: user.username }, "cs572", { expiresIn: 3600 });
                res.status(200).json({ success: true, token: token });
            } else {
                res.status(400).json({ "message": "user/password wrong" });
            }
        } else {
            console.log("user not found", user);
            res.status(400).json("Unauthorized");
        }
    });
};


const authenticate = function (req, res, next) {
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split("  ")[1];
        jwt.verify(token, "cs572", function (err, decoded) {
            if (err) {
                console.log(err);
                res.status(401).json("Unauthorized");
            } else {
                req.user = decoded.username; next();
            }
        });
    } else {
        res.status(403).json("No  token provided");
    }
}



module.exports = {
    register: register,
    login: login,
    authenticate: authenticate
}

