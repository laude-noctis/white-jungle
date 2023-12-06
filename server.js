const express = require('express');
const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const generateShortId = () => {
    const fullId = uuidv4();
    const shortId = fullId.substr(0, 4);
    return shortId;
};

const shortId = generateShortId();

const port = 3001;

const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// reads the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const notes = JSON.parse(data);
        res.json(notes);
    });
});

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const notes = JSON.parse(data);
        
        const newNotes = {
            id: shortId,
            title: req.body.title,
            text: req.body.text,
        };
        
        notes.push(newNotes);

        fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf8', (err) => {
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

app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
  
    fs.readFile('Develop/db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      let notes = JSON.parse(data);
      const noteIndex = notes.findIndex(note => note.id === noteId);
  
      if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
  
        fs.writeFile('Develop/db/db.json', JSON.stringify(notes), 'utf8', (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          res.json(notes);
        });
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});