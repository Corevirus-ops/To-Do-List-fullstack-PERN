const {Router} = require('express');
const db = require('../db/tododb.js');
const router = Router();

router.get('/', async (req, res) => {
     const userId = req?.user?.id;
    try {
    const todos = await db.query('SELECT * FROM todo WHERE user_id = $1', [userId]);
    res.json(todos.rows);
} catch (err) {
    console.error(err);
    res.status(500).json({err});
}
});

router.post('/', async (req, res) => {
    const userId = req?.user?.id;
try {
    const {description, completed} = req.body;

    if (description.trim().length < 1) {
        return res.json({err: true, msg: 'Description needs to contain something'})
    }
const newTodo = await db.query('INSERT INTO todo (description, completed, user_id) VALUES ($1, $2, $3) RETURNING *',
    [description, completed || false, userId]);
    res.status(201).json(newTodo.rows[0]);
} catch (err) {
    console.error(err);
    res.status(500).json({err});
}
});

router.put('/:id', async (req, res) => {
    const userId = req?.user?.id;
try {
    const {id} = req.params;
    const {description, completed} = req.body;
        if (description.trim().length < 1) {
        return res.json({err: true, msg: 'Description needs to contain something'})
    }
    const updatedTodo = await db.query('UPDATE todo SET description = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
    [description, completed, id, userId]);
        if (updatedTodo.rowCount ==0) {
            return res.json({err: true, msg: `This todo does not exist!: Todo #${id}`})
        }
        res.json(updatedTodo.rows[0]);
} catch (err) {
    console.error(err);
    res.json(err);
}
});

router.delete('/:id', async (req, res) => {
    const userId = req?.user?.id;
try {
    const {id} = req.params;
    const deletedTodo = await db.query('DELETE FROM todo WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    res.status(204).json(deletedTodo.rowCount);

} catch (err) {
    console.error(err);
    res.status(500).json({err});
}
});

module.exports = router;