const express = require("express");
const app = express();
const port = 3001;

const users = [{ name: "Alber", id: 1 }, { name: "Juan", id: 2 }];

app.get("/", (req, res) => {
    console.log("Request:", req);
    res.send("Hey!");
    //res.json(users);
});

app.get("/users", (req, res) => {
    console.log("Request:", req);
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const userID = req.params.id;
    const user = users.find(user => user.id == userID);
    res.json(user);
});

app.get("/dado/:caras", (req, res) => {
    const numFaces = req.params.caras;
    let faces = numFaces - 1;
    let number = Math.round(Math.random() * faces + 1);
    let time = new Date();
    let result = {
        result: number,
        time: time.toLocaleDateString("en-US")
    };

    res.json(result);
});

app.listen(port, () => {
    console.log("Express running on port 3001.");
});
