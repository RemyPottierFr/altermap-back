require('dotenv').config();

const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORTPG,
});

app.get('/api/v1/construction-sites', (req, res) => {
  pool.query('SELECT * from construction_sites', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(results.rows);
  });
});

app.post('/api/v1/construction-sites', (req, res) => {
  const { name, coords } = req.body;
  pool.query(
    'INSERT INTO construction_sites (name,coords) VALUES ($1, $2)',
    [name, coords],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(results);
    },
  );
});

app.put('/api/v1/construction-sites/', async (req, res) => {
  const idConstructionSite = req.body.id;
  const { name, coords } = req.body;
  await pool.query('UPDATE construction_sites SET coords = $3 name = $1 WHERE id = $2',
    [name, idConstructionSite, coords],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un chantier");
      } else {
        res.sendStatus(200);
      }
    });
});

app.delete('/api/v1/construction-sites/:id', async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  await pool.query('DELETE FROM construction_sites where id= $1',
    [id],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression d'un chantier");
      } else {
        res.sendStatus(200);
      }
      console.log(id);
    });
});
app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${port}`);
});
