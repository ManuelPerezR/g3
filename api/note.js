const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.route('/api/notes')

  .get((req, res) => {
    Note.find((err, notes) => {
      res.json(notes);
      console.log(notes);
    })
  })

  .post((req, res) => {
    const note = new Note({
      title: req.body.title,
      text: req.body.text
    });
    console.log(req.body)
    note.save((err, note) =>{
      res.json(note);
    })
  });

router.route('/api/notes/:id')

  .get((req, res) => {
    Note.find({ id: req.params.id }, (err, note) => {
      res.json(note);
    });
  })

  .put((req, res) => {
    console.log(req.body);
    Note.findByIdAndUpdate(req.params.id, req.body).exec((err, note) => {
      if (err) return next(err);
      if (!note) return res.status(404).json({ msg: 'Nota no encontrada!' });
      res.status(200).json(note);
    });
  })

  .delete((req, res) => {
    Note.findByIdAndRemove(req.params.id, (err) => {
      res.json({ msg: 'Nota Borrada!' });
    })
  });

module.exports = router;
