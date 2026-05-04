const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');


//routes
const todosRouter = require('./routes/todos.js');
const authRouter = require("./routes/auth.js");

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'comichi wassup',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.authenticate('session'));

app.use('/todos', todosRouter);

app.use('/api', authRouter);

app.listen(port, () => {
console.log(`listening on port: ${port}`)
});