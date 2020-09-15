import { pgPool } from "../services/database";
const isActive = `status = 'A'`;
export const list = async ctx => {
  const { churchid } = ctx.request.body.requestData;
  const mainQuery = `from trservices 
  where churchid = $1
  AND ${isActive}`;
  const res = await pgPool.query(`select id,servicename,starttime,endtime,latetime ${mainQuery}
    ORDER BY id`, [churchid]);
  ctx.ok({ response: { rows: res.rows } });
};

export const add = async ctx => {
  const {
    servicename,
    starttime,
    latetime,
    endtime,
    churchid
  } = ctx.request.body.requestData;
  const res = await pgPool.query(`INSERT INTO trservices(servicename,starttime,endtime,latetime,churchid,status)
  values($1,$2,$3,$4,$5,'A')`, [servicename, starttime, endtime, latetime, churchid]);
  ctx.ok({ response: res.rows });
};

export const update = async ctx => {
  const {
    servicename,
    starttime,
    latetime,
    endtime,
    editingId
  } = ctx.request.body.requestData;
  const res = await pgPool.query(`UPDATE trservices SET
  servicename = $1,
  starttime = $2,
  latetime = $3,
  endtime = $4
  where id = $5`, [servicename, starttime, latetime, endtime, editingId]);
  ctx.ok({ response: res.rows });
};

export const deactivate = async ctx => {
  const { editingId } = ctx.request.body.requestData;
  const res = await pgPool.query(`update trservices set status='D'
  where id=$1`, [editingId]);
  ctx.ok({ response: res.rows });
};
//# sourceMappingURL=services.js.map