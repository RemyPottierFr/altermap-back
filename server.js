require('dotenv').config();
const express = require('express');

const app = express();
const constructionSites = require('./routes/constructionSites');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;


app.use('/api/v1/construction-sites', constructionSites);

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${port}`);
});