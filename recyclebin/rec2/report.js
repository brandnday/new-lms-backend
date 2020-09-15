import { pgPool } from "../services/database";

const isActive = `status = 'A'`;
export const birthday = async ctx => {
  const { churchId, monthId } = ctx.request.body;
  const queryParam = [churchId, monthId + 1];
  const mainQuery =
    monthId === 12
      ? `from mschildren 
  where registered_at = $1
  and EXTRACT(MONTH FROM birthdate)<=$2
  and status='A'`
      : `from mschildren 
  where registered_at = $1
  and EXTRACT(MONTH FROM birthdate)=$2
  and status='A'`;
  const res = await pgPool.query(
    `select id, name,birthdate  ${mainQuery}
   `,
    queryParam
  );

  ctx.ok({ response: { rows: res.rows } });
};

export const lateThisTerm = async ctx => {
  const { churchId, termId, name } = ctx.request.body;
  const queryParam = [termId, churchId, `%${name}%`];
  const mainQuery = ` from trattendance a
  join mschildren c on a.childrenid = c.id
    where attendancestatus = 'L'
  and termid = $1
  and churchid= $2
  and a.status='A'
  and name like $3
  group by c.id,name`;
  const res = await pgPool.query(
    `select c.id, name, count(date)*2 as points  ${mainQuery}
   `,
    queryParam
  );

  ctx.ok({ response: { rows: res.rows } });
};

export const attendancePointThisTerm = async ctx => {
  const { churchId, termId } = ctx.request.body;
  const queryParam = [termId, churchId, `%${name}%`];
  const mainQuery = ` from trattendance a
  join mschildren c on a.childrenid = c.id
    where attendancestatus = 'G'
  and termid = $1
  and churchid= $2
  and name like $3
  and a.status='A'
  group by c.id,name`;
  const res = await pgPool.query(
    `select c.id, name, count(date)*4 as points  ${mainQuery}
   `,
    queryParam
  );

  ctx.ok({ response: { rows: res.rows } });
};

export const perService = async ctx => {
  const { churchId, serviceId, date } = ctx.request.body;
  const queryParam = [churchId, serviceId, date];
  const mainQuery = `from trattendance a
  join mschildren c on a.childrenid = c.id
  join trservices s on a.serviceid = s.id
    where a.status='A'
    and a.churchid= $1
  ${serviceId === 0 ? "and 0=$2" : "and a.serviceid =$2"}
  and date like $3`;
  const res = await pgPool.query(
    `select c.id, name,date, attendancestatus,time, servicename ${mainQuery}
   `,
    queryParam
  );
  ctx.ok({ response: { rows: res.rows } });
};

export const childrenAttendancePerService = async ctx => {
  const { childrenId } = ctx.request.body;
  const queryParam = [childrenId];
  const mainQuery = `from trattendance a
  join trservices s on a.serviceid = s.id
  join mschildren c on a.childrenid = c.id
    where a.status='A'
    and a.childrenid= $1`;
  const res = await pgPool.query(
    `select name,date, attendancestatus,time, servicename   ${mainQuery}
   `,
    queryParam
  );
  ctx.ok({ response: { rows: res.rows } });
};

export const monthlyPerService = async ctx => {
  const { churchId, date } = ctx.request.body;
  const queryParam = [churchId, `${date}%`];
  const mainQuery = `from trattendance a
  join trservices s on a.serviceid=s.id
    where a.status='A'
  and a.churchid= $1
  and s.churchid= $1
  and a.date like $2
  group by date, serviceid,servicename
  order by date, servicename`;
  const res = await pgPool.query(
    `select date, serviceid,servicename, count(a.id) as totalAttendance  ${mainQuery}
   `,
    queryParam
  );
  ctx.ok({ response: { rows: res.rows } });
};

export const yearlyPerService = async ctx => {
  const { churchId, year } = ctx.request.body;
  const queryParam = [churchId, `${year}%`];
  const mainQuery = `
from trattendance a
  join trservices s on a.serviceid=s.id
    where a.status='A'
  and a.churchid= $1
  and s.churchid= $1
  and a.date like $2
  group by substring(date from 1 for 7), serviceid,servicename
  order by substring(date from 1 for 7), servicename`;
  const res = await pgPool.query(
    `select substring(date from 1 for 7) as monthdate, serviceid,servicename, count(a.id) as totalAttendance , count(distinct a.date) as totalWeek  ${mainQuery}
   `,
    queryParam
  );
  ctx.ok({ response: { rows: res.rows } });
};

export const followUp = async ctx => {
  const { date, range } = ctx.request.body;
  const queryParam = [date, range];
  const mainQuery = ` from trattendance an
  join mschildren ch on an.childrenid = ch.id
  where an.childrenid in
(select distinct a.childrenid from trattendance a
where a.date between $1 and $2 and a.status='A')
and an.childrenid not in
(select distinct a2.childrenid from trattendance a2
where a2.date > $2 and a2.status='A')  and an.status='A'
group by ch.name,
ch.nickname,
ch.birthdate`;
  const res = await pgPool.query(
    `
    select ch.name, ch.nickname, ch.birthdate,max(date) as lastattendance ${mainQuery}
   `,
    queryParam
  );
  ctx.ok({ response: { rows: res.rows } });
};

export const point = async ctx => {
  const { churchId, startDate, endDate } = ctx.request.body;
  const queryParam = [churchId, startDate, endDate];
  const mainQuery = ` 
   trattendance an
   join mschildren ch on an.childrenid=ch.id
   join mspoint p on an.attendancestatus=p.id
  where an.churchid = $1
and  an.date between $2 AND $3
  group by name,nickname,birthdate`;
  const res = await pgPool.query(
    `
    select name,nickname,birthdate, sum(point) as point from ${mainQuery}
   `,
    queryParam
  );
  ctx.ok({ response: { rows: res.rows } });
};
