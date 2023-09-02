const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
const port = 5000;

// Create a single instance of the Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wer',
  password: 'Divyansh1234',
  port: 5432,
});

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Route for GET API
app.get('/api/emp', (req, res) => {
  pool.query('SELECT * FROM emp', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(result.rows);
    }
  });
});

// Route for POST API
app.post('/api/emp', (req, res) => {
  const { id1, salary, department } = req.body;

  const query = 'INSERT INTO emp (id1, salary, department) VALUES ($1, $2, $3)';
  const data = [id1, salary, department];

  pool.query(query, data, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      pool.query('SELECT * FROM emp', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          res.json(result.rows);
        }
      });
    }
  });
});
app.delete('/api/emp/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM emp WHERE id1 = $1';
  const data = [id];

  pool.query(query, data, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      pool.query('SELECT * FROM emp', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          res.json(result.rows);
        }
      });
    }
  });
});

app.put('/api/emp/:id', (req, res) => {
  const id = req.params.id;
  const { salary, department } = req.body;

  const query = 'UPDATE emp SET salary = $1, department = $2 WHERE id1 = $3';
  const data = [salary, department, id];

  pool.query(query, data, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      pool.query('SELECT * FROM emp', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          res.json(result.rows);
        }
      });
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
