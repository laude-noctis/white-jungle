const express = require("express");
const fs = require("fs");
const path = require("path");

const { v4: uuidv4 } = require('uuid');
const generateShortId = () => {
    const fullId = uuidv4();
    const shortId = fullId.substr(0, 4);
    return shortId;
};
const shortId = generateShortId();

const port = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// reads the db.json file and return all saved notes as JSON
app.get("/api/notes", (req, res) => { 
});

app.post('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const notes = JSON.parse(data);
        
        const newNotes = {
            id: shortId,
            title: req.body.title,
            description: req.body.description,
        };
        
        fs.writeFile('db.json', JSON.stringify(tasks), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            
            res.json(newNotes);
        });
    });
});

// return the notes.html file
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// return the index.html file
app.get ("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});