import moment from "moment";
import {
  pgPool,
  executeCreateUpdateDeleteQuery,
  executeReadQuery,
} from "../services/database";
const isActive = `status = 'A'`;
// export const list = async (ctx) => {
//   const { churchid } = ctx.request.body;
//   const mainQuery = `from trservices
//   where churchid = $1
//   AND ${isActive}`;
//   const res = await pgPool.query(
//     `select id,servicename,starttime,endtime,latetime ${mainQuery}
//     ORDER BY id`,
//     [churchid]
//   );
//   ctx.ok({ response:{ { rows: res } });
// };

// export const add = async (ctx) => {
//   const {
//     servicename,
//     starttime,
//     latetime,
//     endtime,
//     churchid,
//   } = ctx.request.body;
//   const res = await pgPool.query(
//     `INSERT INTO trservices(servicename,starttime,endtime,latetime,churchid,status)
//   values($1,$2,$3,$4,$5,'A')`,
//     [servicename, starttime, endtime, latetime, churchid]
//   );
//   ctx.ok({ response:{ res });
// };

// export const update = async (ctx) => {
//   const {
//     servicename,
//     starttime,
//     latetime,
//     endtime,
//     editingId,
//   } = ctx.request.body;
//   const res = await pgPool.query(
//     `UPDATE trservices SET
//   servicename = $1,
//   starttime = $2,
//   latetime = $3,
//   endtime = $4
//   where id = $5`,
//     [servicename, starttime, latetime, endtime, editingId]
//   );
//   ctx.ok({ response:{ res });
// };

// export const deactivate = async (ctx) => {
//   const { editingId } = ctx.request.body;
//   const res = await pgPool.query(
//     `update trservices set status='D'
//   where id=$1`,
//     [editingId]
//   );
//   ctx.ok({ response:{ res });
// };

export const getClassList = async (ctx) => {
  // may want to add pagination for this
  const { gradeId, specializationId, termId, schoolId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_class
    where ${isActive}
    and school_id=$1
    ORDER BY id`,
    [schoolId]
  );
  ctx.ok({
    response: res,
  });
  // ctx.ok({
  //   response: [
  //     {
  //       id: 8,
  //       classCode: "01011",
  //       termId: "122131",
  //       className: "XII1",
  //       specialization: "IPA",
  //       gradeCode: "10",
  //       grade: "10",
  //       bannerSrc: "",
  //       memberCount: 36,
  //       startDate: "2020-04-04",
  //       endDate: "2020-10-04",
  //     },
  //     {
  //       id: 8,
  //       classCode: "01011",
  //       termId: "122131",
  //       className: "XII1",
  //       specialization: "IPA",
  //       gradeCode: "10",
  //       grade: "10",
  //       bannerSrc: "",
  //       memberCount: 36,
  //       startDate: "2020-04-04",
  //       endDate: "2020-10-04",
  //     },
  //   ],
  // });
};

export const getClassDetail = async (ctx) => {
  const { classId } = ctx.request.body;

  const res = await executeReadQuery(
    `select * from tr_class 
    where id = $1
    AND ${isActive}
    ORDER BY id`,
    [classId]
  );
  ctx.ok({
    response: res,
  });
  // ctx.ok({
  //   response: {
  //     id: 8,
  //     classCode: "01011",
  //     termId: "122131",
  //     className: "XII1",
  //     specialization: "IPA",
  //     gradeCode: "10",
  //     grade: "10",
  //     bannerSrc: "",
  //     memberCount: 36,
  //     startDate: "2020-04-04",
  //     endDate: "2020-10-04",
  //   },
  // });
};

export const getClassStudentList = async (ctx) => {
  // may want to add pagination for this
  const { gradeId, specializationId, termId, schoolId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_grade 
    where school_id = $1
    AND ${isActive}
    ORDER BY id`,
    [schoolId]
  );
  ctx.ok({
    response: res,
  });
  // return [
  //   {
  //     id: 0,
  //     name: "student 1",
  //     nis: "1234",
  //     username: "username1",
  //     email: "email@em.ail",
  //   },
  //   {
  //     id: 0,
  //     name: "student 1",
  //     nis: "1234",
  //     username: "username1",
  //     email: "email@em.ail",
  //   },
  //   {
  //     id: 0,
  //     name: "student 1",
  //     nis: "1234",
  //     username: "username1",
  //     email: "email@em.ail",
  //   },
  // ];
};

export const insertClass = async (ctx) => {
  const {
    schoolId,
    classCode,
    periodId,
    className,
    specializationId,
    gradeCode,
    gradeId,
  } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `insert into tr_class (
      class_code,
      period_id,
      class_name,
      specialization_id,
      grade_code,
      grade_id,
      school_id,
      status
    )
  values ($1, $2, $3, $4, $5,  $6, $7, 'A');`,
    [
      classCode,
      periodId,
      className,
      specializationId,
      gradeCode,
      gradeId,
      schoolId,
    ]
  );
  ctx.ok(res);
};

export const updateClass = async (ctx) => {
  const {
    classId,
    classCode,
    periodId,
    className,
    specializationId,
    gradeCode,
    gradeId,
  } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update tr_class
    set class_code = $2,
      period_id = $3,
      class_name = $4,
      specialization_id = $5,
      grade_code = $6,
      grade_id = $7
    where id = $1`,
    [
      classId,
      classCode,
      periodId,
      className,
      specializationId,
      gradeCode,
      gradeId,
    ]
  );
  ctx.ok(res);
};

export const deleteClass = async (ctx) => {
  const { classId } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update tr_class set
    status='D'
    where id = $1`,
    [classId]
  );
  ctx.ok(res);
};

export const getGradeList = async (ctx) => {
  const { gradeId, specializationId, termId, schoolId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_grade 
    where school_id = $1
    AND ${isActive}
    ORDER BY id`,
    [schoolId]
  );
  ctx.ok({
    response: res,
  });
};

export const insertGrade = async (ctx) => {
  const { schoolId, gradeCode, grade } = ctx.request.body;
  console.log(schoolId);
  const res = await executeCreateUpdateDeleteQuery(
    `insert into tr_grade (school_id, grade_code, grade, status) values ($1,$2,$3,'A');`,
    [schoolId, gradeCode, grade]
  );
  console.log(res);
  ctx.ok(res);
};

export const updateGrade = async (ctx) => {
  const { gradeId, gradeCode, grade } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update tr_grade set
    grade_code=$2,
    grade=$3,
    status='A'
    where id = $1`,
    [gradeId, gradeCode, grade]
  );
  ctx.ok(res);
};

export const deleteGrade = async (ctx) => {
  const { gradeId } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update tr_grade set
    status='D'
    where id = $1`,
    [gradeId]
  );
  ctx.ok(res);
};

export const getSpecializationList = async (ctx) => {
  const { schoolId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from ms_specialization 
    where school_id = $1
    and ${isActive}`,
    [schoolId]
  );
  ctx.ok({
    response: res,
  });
};

export const insertSpecialization = async (ctx) => {
  const {
    schoolId,
    specializationCode,
    specialization,
    initial,
  } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `insert into ms_specialization (
      school_id,
      specialization,
      specialization_code,
      initial,
      status
    )
  values ($1, $2, $3, $4, 'A')`,
    [schoolId, specialization, specializationCode, initial]
  );
  ctx.ok(res);
};

export const updateSpecialization = async (ctx) => {
  const {
    specializationId,
    specializationCode,
    specialization,
    initial,
  } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update ms_specialization
    set specialization = $3,
      specialization_code = $2,
      initial = $4,
      status = 'A'
    where id = $1`,
    [specializationId, specializationCode, specialization, initial]
  );
  ctx.ok(res);
};

export const deleteSpecialization = async (ctx) => {
  const { specializationId } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update ms_specialization
    set
      status = 'D'
    where id = $1`,
    [specializationId]
  );
  ctx.ok(res);
};

export const getPeriodList = async (ctx) => {
  const { schoolId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_period
    where school_id = $1
    AND ${isActive}
    ORDER BY id`,
    [schoolId]
  );
  ctx.ok({
    response: res,
  });
};

export const insertPeriod = async (ctx) => {
  const { schoolId, periodStartTime, periodEndTime } = ctx.request.body;
  const periodCode = moment(periodStartTime, "YYYY-MM-DD").format("YYYYMM");
  const periodStart = moment(periodStartTime, "YYYY-MM-DD").format("YYYY");
  const periodEnd = moment(periodStartTime, "YYYY-MM-DD").format("YYYY");
  const periodName = `${periodStart}/${periodEnd}`;
  const res = await executeCreateUpdateDeleteQuery(
    `insert into tr_period (
      school_id,
      period,
      period_code,
      period_start_time,
      period_end_time,
      status
    )
  values ($1, $2, $3, $4, $5, 'A');`,
    [schoolId, periodName, periodCode, periodStartTime, periodEndTime]
  );
  ctx.ok(res);
};

export const deletePeriod = async (ctx) => {
  const { periodId } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update tr_period
    set status='D'
    where id = $1`,
    [periodId]
  );
  ctx.ok(res);
};
