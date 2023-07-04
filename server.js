const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt-nodejs")
const bodyparser = require("body-parser");
const knex = require("knex");

app.use(bodyparser.json());
app.use(cors());

const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "Akmm4167@",
        database: "doormonk"
    }
});





app.get('/', (req, res) => {
    res.json("everything is fine");
})

app.post("/signin", (req, res) => {

    db.select('email','hash').from("login").where("email","=",req.body.email)
    .then(data=>{
        const isValid=bcrypt.compareSync(req.body.password,data[0].hash);
        if(isValid)
        {
            return db.select("*").from("users").where("email","=",req.body.email)
            .then(user=>{
                res.json(user[0]);
            })
            .catch(err=>res.status(400).json("unable to get user"))
        }
        else
        {
            res.status(400).json("wrong credentials");
        }
    })
    .catch(err=>res.status(400).json("wrong credentials"))




})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
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