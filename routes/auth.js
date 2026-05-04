
const express = require("express");
const router = express.Router();
const db = require('../db/tododb');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');

dotenv.config();

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   db.query('SELECT * FROM users WHERE email = $1', [username], async function(err, user) {
//     if (err) {return cb(err)}
//     if (!user.rows[0]) {return cb(null, false, { message: 'Incorrect username or password.' });}
//     const match = await bcrypt.compare(password, user.rows[0].password);
//        if (!match) {return cb(null, false, { message: 'Incorrect username or password.' });}
//        console.log(user.rows[0]);
//        console.log('user logged in')
//      return cb(null, user.rows[0])
//   });
  
// }));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
    cb(null, { id: user.id, username: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});




// router.post('/login', passport.authenticate('local', {
//    successRedirect: `${process.env.NETWORK}:${process.env.CLIENT_PORT}/`,
//    failureRedirect: `${process.env.NETWORK}:${process.env.CLIENT_PORT}/login`
// }));

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
  db.query('SELECT * FROM users WHERE email = $1', [email], async function(err, user) {
    if (err) {return res.status(500)}
    if (!user.rows[0]) {return res.json({err: true, msg: 'Incorrect email or password.' });}
    const match = await bcrypt.compare(password, user.rows[0].password);
       if (!match) {return res.json({err: true, msg: 'Incorrect email or password.' });}
       req.logIn(user.rows[0], function(err) {
           if (err) { throw err }
           res.status(201).json({loggedIn: true});
    });

  });
});

router.post('/new-account', async (req, res) => {
  const {name, email, password } = req.body;
  if (!name || !email || !password) {return res.json({err: true, msg: "All Fields Are Required!!"})}
 
  const checkUser = await db.query('SELECT email FROM users WHERE email = $1', [email]);
  if (checkUser.rowCount > 0) {return res.json({err: true, msg: "User With This Email Already Exists"})}

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await db.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *', [name, email, hashPassword]);

if (!newUser.rows[0]) {return res.status(500).json({err: true, msg: "Something Went Wrong"})}

newUser.rows[0].password = null;
    req.logIn(newUser.rows[0], function(err) {
        if (err) { throw err }
        res.redirect(`${process.env.NETWORK}/${process.env.CLIENT_PORT}/`);
    });

});


router.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(`${process.env.NETWORK}/${process.env.CLIENT_PORT}/login`);
  });
});


module.exports = router;