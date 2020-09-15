import { pgPool } from "../services/database";
import bcrypt from 'bcrypt-nodejs';

const saltRounds = 10;
const isActive = `status = 'A'`;
export const list = async ctx => {
  const { username, role, pagination } = ctx.request.body;
  const rolequery = `and role = $2`;
  const queryParam = [`%${username}%`];
  role !== "ALL" && queryParam.push(role);
  const mainQuery = `from truser 
  where username like $1 ${role !== "ALL" ? rolequery : ""}
  and ${isActive}`;
  const res = await pgPool.query(`select id,username,role,email,phone, status ${mainQuery}
    ORDER BY id
    OFFSET ${(pagination.page - 1) * pagination.size} LIMIT ${pagination.size}`, queryParam);
  const resCount = await pgPool.query(`select count(*) ${mainQuery}`, queryParam);
  ctx.ok({ response: { rows: res.rows, totalData: resCount.rows[0].count } });
};

export const add = async ctx => {
  const { username, password, email, phone, role } = ctx.request.body.requestData;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedpass = bcrypt.hashSync(password, salt);
  const res = await pgPool.query(`insert into 
  truser(username,password,role,email,phone,status) 
  values($1,$2,$3,$4,$5,'A')`, [username, hashedpass, role, email, phone]);
  ctx.ok({ response: res.rows });
};

export const update = async ctx => {
  const { username, password, email, phone, role, editingId } = ctx.request.body.requestData;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedpass = await bcrypt.hashSync(password, salt);
  const res = await pgPool.query(`update truser set username=$1, password=$2,
  role=$3, email = $4, phone = $5, status='A'
  where id=$6`, [username, hashedpass, role, email, phone, editingId]);
  ctx.ok({ response: res.rows });
};
export const deactivate = async ctx => {
  const { editingId } = ctx.request.body.requestData;
  const res = await pgPool.query(`update truser set status='D'
  where id=$1`, [editingId]);
  ctx.ok({ response: res.rows });
};
//# sourceMappingURL=admins.js.map