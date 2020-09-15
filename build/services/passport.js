require("babel-polyfill");
const passport = require("passport");
//const config = require('../config');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt-nodejs");
const LocalStrategy = require("passport-local");
const { pgPool } = require("./database");
const localOptions = { usernameField: "username" };

const comparePass = (userPassword, databasePassword) => {
  return bcrypt.compareSync(userPassword, databasePassword);
};

const localLogin = new LocalStrategy(localOptions, async (username, password, done) => {
  const resauth = await pgPool.query(`select id,username,password from truser where username = $1`, [username]);
  if (!resauth.rows.length > 0) {
    return done(null, false);
  }
  if (!comparePass(password, resauth.rows[0].password)) {
    return done(null, false);
  }

  return done(null, resauth.rows[0]);
});

const privKey = "qwerasdfqwerqwer12341sfasdfasdgcvbxclgsjldkfjasdf";
// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authoken"),
  secretOrKey: privKey
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async function (payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  const { id, username } = payload.user;
  const resauth = await pgPool.query(`select username from truser where id=$1 and username = $2`, [id, username]);
  if (!resauth.rows.length > 0) {
    return done(null, false);
  }
  return done(null, true);
});

passport.use(jwtLogin);
passport.use(localLogin);
//# sourceMappingURL=passport.js.map