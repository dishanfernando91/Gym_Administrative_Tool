const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// --------- routes ...........
const membersRouter = require('./routes/members');
const packageRouter = require('./routes/packages');

app.use('/members', membersRouter);
app.use('/packages', packageRouter);
//----------------------------
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
