const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('build'))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// --------- routes ...........
const membersRouter = require('./routes/members');
const packagesRouter = require('./routes/packages');
const paymentsRouter = require('./routes/payments');

app.use('/members', membersRouter);
app.use('/packages', packagesRouter);
app.use('/payments', paymentsRouter);
//----------------------------
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
