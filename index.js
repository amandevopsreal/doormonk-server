const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt-nodejs")
const bodyparser = require("body-parser");
const knex = require("knex");
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyparser.json());
app.use(cors());

const db = require('./DBConfig');








app.get('/', (req, res) => {
    res.json("everything is working fine")

})

app.post("/signin", (req, res) => {

    db.select('email', 'hash').from("login").where("email", "=", req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select("*").from("users").where("email", "=", req.body.email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json("unable to get user"))
            }
            else {
                res.status(400).json("wrong credentials");
            }
        })
        .catch(err => res.status(400).json("wrong credentials"))




})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json("Incorrect registration format.");
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        })
            .into("login")
            .returning("*")
            .then(loginEmail => {

                return trx("users")
                    .returning("*")
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date()
                    })
                    .then(users => {
                        res.json(users[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)

    })
        .catch(err => {
            res.status(400).json('unable to register');
        })
});

app.get("/:id", (req, res) => {
    const { id } = req.params;
    db.select("*").from("users").where({
        id: id
    })
        .then(users => {
            if (users.length) {
                res.json(users[0]);
            }
            else {
                res.status(400).json("no such user found");
            }
        })
        .catch(err => res.status(400).json("error user"))
})

app.listen(3000, () => {
    console.log("app is running on port 3000");
}); 