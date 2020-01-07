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

router.put('/api/v1/construction-sites/:id', async (req, res) => {
  const { id } = req.params;
  const { name, coords } = req.body;
  console.log(req.body);
  await pool.query('UPDATE construction_sites SET coords =$3, name = $1  WHERE id =$2',
    [name, id, coords],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un chantier");
      } else {
        res.sendStatus(200);
      }
    });
});
router.delete('/api/v1/construction-sites/:id', async (req, res) => {
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

module.exports = router;
