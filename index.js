const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const port = process.env.PORT        || 3001;
const db   = process.env.MONGODB_URI || 'mongodb://localhost/reactNotesApp';

mongoose.connect(db).then(() => console.log('DB conectada'));

const app = express();
app.use(cors())
app.use(express.json());

app.use('/', require('./api/note'));

app.use(express.static('public'));

app.listen(port);
