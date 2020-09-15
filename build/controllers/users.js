import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import { pgPool } from "../services/database";
import { decodeToken } from "../services/token";

export const exec = async ctx => {
  const res = await pgPool.query(`insert into testyea values(3,'andreas2')`);
  ctx.ok({ res });
};

const hashpassword = async (password, next) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) return next(err);
        resolve(hash);
      });
    });
  });
  return hashedPassword;
};

export const tokenOfUser = user => {
  const privKey = "qwerasdfqwerqwer12341sfasdfasdgcvbxclgsjldkfjasdf";
  const timestamp = new Date().getTime() + 7200000;
  return jwt.sign({ user, iat: timestamp }, privKey);
};

const getUser = async username => {
  const res = await pgPool.query(`select id, username,role from truser where username = $1`, [username]);
  return res.rows[0];
};

export const signin = async (ctx, next) => {
  const { username } = ctx.request.body;
  const user = await getUser(username);
  ctx.ok({ response: { success: true, token: tokenOfUser(user) } });
};

export const signup = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const hpass = await hashpassword(password, next);
  await pgPool.query(`insert into tr_user(username,password) values('${username}','${hpass}')`);
  ctx.ok({ test: "asdf" });
};

export const checkAuthorize = async (ctx, next) => {
  const { role } = ctx.request.body;
  const { authoken } = ctx.request.headers;
  const { payload } = decodeToken(authoken);
  const username = payload.user.username;
  const roles = {
    SADMIN: ["SADMIN"],
    ADMIN: ["SADMIN", "ADMIN"],
    OPERATOR: ["SADMIN", "ADMIN", "OPERATOR"]
  };
  const user = await getUser(username);
  const timestampNow = new Date().getTime();
  const isTimeout = timestampNow > payload.iat;
  const haveToRefreshToken = timestampNow > payload.iat - 3600000;
  const token = isTimeout || !haveToRefreshToken ? false : tokenOfUser(user);
  const therole = user.role;
  const authorized = roles[role].includes(therole);
  ctx.ok({
    response: {
      authorized: authorized,
      role: therole,
      timeout: isTimeout,
      token,
      haveToRefreshToken
    }
  });
};
//# sourceMappingURL=users.js.map