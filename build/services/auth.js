const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");
const { Pool } = require("pg");
const pool = new Pool({
  user: "brandnday",
  host: "localhost",
  database: "adb1",
  password: "iwillliveandlove",
  port: 5433
});
const options = {
  usernameField: "username",
  passwordField: "password"
};

const comparePass = (userPassword, databasePassword) => {
  return bcrypt.compareSync(userPassword, databasePassword);
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {

  pool.query(`select id, username from users where id=${id}`, async (err, res) => {
    if (err) {
      return done(err);
    }
    if (!res) {
      return done(null, false);
    }
    if (password !== res.rows[0].password) {
      return done(null, false);
    } else {
      await pool.end();
      return done(null, false);
    }
  });
});
//# sourceMappingURL=auth.js.map