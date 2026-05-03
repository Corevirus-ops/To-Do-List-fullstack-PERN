const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const todosRouter = require('./routes/todos.js');

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/todos', todosRouter);

app.listen(port, () => {
console.log(`listening on port: ${port}`)
});