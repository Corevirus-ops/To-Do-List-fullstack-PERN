const {Router} = require('express');
const db = require('../db/tododb.js');
const router = Router();

router.get('/', async (req, res) => {
try {
    const todos = await db.query('SELECT * FROM todo');
    res.json(todos.rows);
} catch (err) {
    console.error(err);
    res.json(err);
}
});

router.post('/', async (req, res) => {
try {
    const {description, completed} = req.body;
const newTodo = await db.query('INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *',
    [description, completed || false]);
    res.json(newTodo.rows[0]);
} catch (err) {
    console.error(err);
    res.json(err);
}
});

router.put('/:id', async (req, res) => {
try {
    const {id} = req.params;
    const {description, completed} = req.body;
    const updatedTodo = await db.query('UPDATE todo SET description = $1, completed = $2 WHERE id = $3 RETURNING *',
    [description, completed, id]);
        res.json(updatedTodo.rows[0]);
} catch (err) {
    console.error(err);
    res.json(err);
}
});

router.delete('/:id', async (req, res) => {
try {
    const {id} = req.params;
    const deletedTodo = await db.query('DELETE FROM todo WHERE id = $1 RETURNING *', [id]);
    res.json(deletedTodo.rowCount);


} catch (err) {
    console.error(err);
    res.json(err);
}
});

module.exports = router;