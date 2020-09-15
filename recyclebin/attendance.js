import { pgPool } from "../services/database";

const isActive = `status = 'A'`;
export const list = async ctx => {
  const {
    churchId,
    date,
    serviceId,
    termId,
    pagination,
    name,
    attendanceType
  } = ctx.request.body;
  const queryParam = [churchId, date, serviceId, termId, `%${name}%`];
  const mainQuery = `from mschildren 
  where id not in
  (select childrenid from trattendance
  where churchId = $1
  and date=$2
  and serviceId = $3
  and termId = $4
  and status='A') 
  and name like $5`;

  const res = await pgPool.query(
    `select id, name,birthdate  ${mainQuery}
    ORDER BY id
    OFFSET ${(pagination.page - 1) * pagination.size} LIMIT ${pagination.size}`,
    queryParam
  );

  const resCount = await pgPool.query(
    `select count(*) ${mainQuery}`,
    queryParam
  );
  ctx.ok({ response: { rows: res.rows, totalData: resCount.rows[0].count } });
};

export const childrenAttendanceId = async ctx => {
  const { attendanceid } = ctx.request.body;
  const queryParam = [attendanceid];
  const mainQuery = `from mschildren 
  where attendanceid = $1`;
  const res = await pgPool.query(
    `select id ${mainQuery}
`,
    queryParam
  );
  const childrenId = res.rows.length === 0 ? -1 : res.rows[0].id;
  ctx.ok({ response: { childrenId } });
};

export const add = async ctx => {
  const {
    churchId,
    childrenId,
    date,
    serviceId,
    termId,
    time,attendancestatus
  } = ctx.request.body.requestData;

  const checkAttendance = await pgPool.query(
    `select count(id) from trattendance where churchid = $1 and  childrenid = $2 and  date = $3 and  serviceid = $4`,
    [churchId, childrenId, date, serviceId]
  );
  if (checkAttendance.rows.count > 0) {
    ctx.ok({ response: -1 });
  } else {
    await pgPool.query(
      `insert into 
      trattendance(churchid,childrenid,date,serviceid,termid,time,status,attendancestatus) 
    values($1,$2,$3,$4,$5,$6,'A',$7)`,
      [churchId, childrenId, date, serviceId, termId,time,attendancestatus]
    );
    ctx.ok({ response: 200 });
  }
};

export const attendedList = async ctx => {
  const { churchId, date, serviceId, termId, pagination } = ctx.request.body;
  const queryParam = [churchId, date, serviceId, termId];
  const mainQuery = `from trattendance a
  join mschildren c on a.childrenid = c.id
  where churchId = $1
  and date=$2
  and serviceId = $3
  and termId = $4
  and a.status='A'
  `;

  const res = await pgPool.query(
    `select a.id,name, birthdate, time,attendancestatus ${mainQuery}
    ORDER BY a.id
    OFFSET ${(pagination.page - 1) * pagination.size} LIMIT ${pagination.size}`,
    queryParam
  );

  const resCount = await pgPool.query(
    `select count(*) ${mainQuery}`,
    queryParam
  );
  ctx.ok({ response: { rows: res.rows, totalData: resCount.rows[0].count } });
};

export const deactivate = async ctx => {
  const { editingId } = ctx.request.body.requestData;
  const res = await pgPool.query(
    `update trattendance set status='D'
  where id=$1`,
    [editingId]
  );
  ctx.ok({ response: res.rows });
};
