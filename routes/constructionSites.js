const express = require('express');
const pool = require('../conf');

const router = express.Router();

router.get('/', (req, res) => {
  pool.query('SELECT * from construction_sites', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(results.rows);
  });
});

router.post('/', (req, res) => {
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

module.exports = router;
