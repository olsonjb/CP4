const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/conf-notes', {
    useNewUrlParser: true
});


const noteSchema = new mongoose.Schema({
    title: String,
    note: String,
    speaker: String,
    session: String,
});
const Note = mongoose.model('Note', noteSchema);

app.post('/api/notes', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        note: req.body.note,
        speaker: req.body.speaker,
        session: req.body.session,
    });
    try {
        await note.save();
        res.send(note);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/notes/:id', async (req, res) => {
    try {
        var foundNote = await Note.findOne({
            _id: req.params.id
        });
        foundNote.title = req.body.title;
        foundNote.note = req.body.note;
        foundNote.speaker = req.body.speaker;
        foundNote.session = req.body.session;
        await foundNote.save();
        res.send(foundNote);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/notes', async (req, res) => {
    try {
        let notes = await Note.find();
        res.send(notes);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/notes/:id', async (req, res) => {
    try {
        await Note.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Speakers
const speakerSchema = new mongoose.Schema({
    name: String,
    calling: String,
    nationality: String,
    bio: String,
});
const Speaker = mongoose.model('Speaker', noteSchema);

app.post('/api/speakers', async (req, res) => {
    const speaker = new Speaker({
        name: req.body.name,
        calling: req.body.calling,
        nationality: req.body.nationality,
        bio: req.body.bio,
    });
    try {
        await speaker.save();
        res.send(speaker);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/speakers/:id', async (req, res) => {
    try {
        var foundSpeaker = await Speaker.findOne({
            _id: req.params.id
        });
        foundSpeaker.name = req.body.name;
        foundSpeaker.calling = req.body.calling;
        foundSpeaker.nationality = req.body.nationality;
        foundSpeaker.bio = req.body.bio;
        await foundSpeaker.save();
        res.send(foundSpeaker);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/speakers', async (req, res) => {
    try {
        let speakers = await Speaker.find();
        res.send(speakers);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/speakers/:id', async (req, res) => {
    try {
        await Speaker.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));