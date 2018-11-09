const express = require("express");
const utils = require("./src/bodyIsEmpty.js");
const app = express();
const port = 3001;

// this allows express to get body info for POST requests
app.use(express.json());

const users = [{ name: "Alber", id: 1 }, { name: "Juan", id: 2 }];
const movies = [
    { name: "Avatar", year: 2009, genre: "fantasy", id: 1 },
    { name: "Interstellar", year: 2014, genre: "science", id: 2 }
];

app.get("/", (req, res) => {
    //console.log("Request:", req);
    res.send("Hey!");
    //res.json(users);
});

app.get("/users", (req, res) => {
    //console.log("Request:", req);
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

app.post("/users", (req, res) => {
    if (utils.bodyIsEmpty(req.body)) {
        res.status(400).send("Oops, you have to pass something as Body");
    } else {
        const newMovie = req.body;
        newMovie.id = Math.round(Math.random() * 1000000 + 1);
        users.push(newMovie);
        res.json(newMovie);
    }
});

// CRUD (Movies)

app.get("/movies", (req, res) => {
    //console.log("Request:", req);
    res.json(movies);
});

app.get("/movies/:id", (req, res) => {
    let movieID = req.params.id;
    let movie = movies.find(movie => movie.id == movieID);
    res.json(movie);
});

app.post("/movies", (req, res) => {
    if (utils.bodyIsEmpty(req.body)) {
        res.status(400).send("Oops, you have to pass something as Body");
    } else {
        const newMovie = req.body;
        newMovie.id = Math.round(Math.random() * 1000000 + 1);
        movies.push(newMovie);
        res.json(newMovie);
    }
});

app.put("/movies/:id", (req, res) => {
    let movieID = req.params.id;
    let MovieToUpdate = movies.find(movie => movie.id == movieID);

    // update movie data here

    res.send(`${MovieToUpdate.name} has been updated.`);
});

app.delete("/movies/:id", (req, res) => {
    let movieID = req.params.id;
    let MovieToDelete = movies.find(movie => movie.id == movieID);

    // remove from movies array here (using lodash)

    res.send(`${MovieToDelete.name} has been deleted.`);
});

// Listen
app.listen(port, () => {
    console.log("Express running on port 3001.");
});
