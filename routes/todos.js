const {Router} = require('express');
const db = require('../db/tododb.js');
const router = Router();

router.get('/', async (req, res) => {
try {
    const todos = await db.query('SELECT * FROM todo');
    res.json(todos.rows[0]);
} catch (err) {
    console.error(err);
}
});

router.post('/', async (req, res) => {
try {
    const {description, completed} = req.body;
const newTodo = await db.query('INSERT INTO todo (description, completed) VALUES ($1, $2)',
    [description, completed || false]);
    res.json(newTodo.rows[0]);
} catch (err) {
    console.error(err);
}
});

module.exports = router;