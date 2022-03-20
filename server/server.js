const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const port = process.env.PORT || 5000;
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
app.use(cors());
app.use(express.json());
app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);

// get driver connection
const dbo = require('./db/conn');

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
