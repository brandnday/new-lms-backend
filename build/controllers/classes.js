import { pgPool } from "../services/database";
const isActive = `status = 'A'`;
// export const list = async (ctx) => {
//   const { churchid } = ctx.request.body.requestData;
//   const mainQuery = `from trservices
//   where churchid = $1
//   AND ${isActive}`;
//   const res = await pgPool.query(
//     `select id,servicename,starttime,endtime,latetime ${mainQuery}
//     ORDER BY id`,
//     [churchid]
//   );
//   ctx.ok({ response:{ { rows: res.rows } });
// };

// export const add = async (ctx) => {
//   const {
//     servicename,
//     starttime,
//     latetime,
//     endtime,
//     churchid,
//   } = ctx.request.body.requestData;
//   const res = await pgPool.query(
//     `INSERT INTO trservices(servicename,starttime,endtime,latetime,churchid,status)
//   values($1,$2,$3,$4,$5,'A')`,
//     [servicename, starttime, endtime, latetime, churchid]
//   );
//   ctx.ok({ response:{ res.rows });
// };

// export const update = async (ctx) => {
//   const {
//     servicename,
//     starttime,
//     latetime,
//     endtime,
//     editingId,
//   } = ctx.request.body.requestData;
//   const res = await pgPool.query(
//     `UPDATE trservices SET
//   servicename = $1,
//   starttime = $2,
//   latetime = $3,
//   endtime = $4
//   where id = $5`,
//     [servicename, starttime, latetime, endtime, editingId]
//   );
//   ctx.ok({ response:{ res.rows });
// };

// export const deactivate = async (ctx) => {
//   const { editingId } = ctx.request.body.requestData;
//   const res = await pgPool.query(
//     `update trservices set status='D'
//   where id=$1`,
//     [editingId]
//   );
//   ctx.ok({ response:{ res.rows });
// };

export const getClassList = async ctx => {
  // may want to add pagination for this
  const {
    gradeId,
    specializationId,
    termId,
    schoolId
  } = ctx.request.body.requestData;

  return [{
    id: 8,
    classCode: "01011",
    termId: "122131",
    className: "XII1",
    specialization: "IPA",
    gradeCode: "10",
    grade: "10",
    bannerSrc: "",
    memberCount: 36,
    startDate: "2020-04-04",
    endDate: "2020-10-04"
  }, {
    id: 8,
    classCode: "01011",
    termId: "122131",
    className: "XII1",
    specialization: "IPA",
    gradeCode: "10",
    grade: "10",
    bannerSrc: "",
    memberCount: 36,
    startDate: "2020-04-04",
    endDate: "2020-10-04"
  }];
};

export const getClassDetail = () => {
  const { classId } = ctx.request.body.requestData;
  ctx.ok({
    response: {
      id: 8,
      classCode: "01011",
      termId: "122131",
      className: "XII1",
      specialization: "IPA",
      gradeCode: "10",
      grade: "10",
      bannerSrc: "",
      memberCount: 36,
      startDate: "2020-04-04",
      endDate: "2020-10-04"
    }
  });
};

export const getClassStudentList = async ctx => {
  // may want to add pagination for this
  const {
    gradeId,
    specializationId,
    termId,
    schoolId
  } = ctx.request.body.requestData;

  return [{
    id: 0,
    name: "student 1",
    nis: "1234",
    username: "username1",
    email: "email@em.ail"
  }, {
    id: 0,
    name: "student 1",
    nis: "1234",
    username: "username1",
    email: "email@em.ail"
  }, {
    id: 0,
    name: "student 1",
    nis: "1234",
    username: "username1",
    email: "email@em.ail"
  }];
};

export const insertClass = async ctx => {
  const {
    classCode,
    termId,
    className,
    specialization,
    gradeCode,
    grade,
    bannerSrc,
    memberCount,
    startDate,
    endDate
  } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};

export const updateClass = async ctx => {
  const {
    classId,
    classCode,
    termId,
    className,
    specialization,
    gradeCode,
    grade,
    bannerSrc,
    memberCount,
    startDate,
    endDate
  } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};

export const deleteClass = async ctx => {
  const { classId } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};

export const getGradeList = async ctx => {
  const {
    gradeId,
    specializationId,
    termId,
    schoolId
  } = ctx.request.body.requestData;

  return [{
    id: 8,
    gradeCode: "10",
    grade: "10",
    classCount: 10
  }, {
    id: 8,
    gradeCode: "11",
    grade: "11",
    classCount: 11
  }, {
    id: 8,
    gradeCode: "12",
    grade: "12",
    classCount: 12
  }];
};

export const insertGrade = async ctx => {
  const { gradeCode, grade } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};

export const updateGrade = async ctx => {
  const { gradeId, gradeCode, grade } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};

export const deleteGrade = async ctx => {
  const { gradeId } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};

export const getSpecializationList = async ctx => {
  const {} = ctx.request.body.requestData;

  return [{
    id: 8,
    specializationCode: "80",
    specialization: "IPA",
    initial: "IPA",
    classCount: 10
  }, {
    id: 2,
    specializationCode: "80",
    specialization: "IPS",
    initial: "IPS",
    classCount: 10
  }];
};

export const insertSpecialization = async ctx => {
  const {
    specializationCode,
    specialization,
    initial
  } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};

export const updateSpecialization = async ctx => {
  const {
    specializationId,
    specializationCode,
    specialization,
    initial
  } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};

export const deleteSpecialization = async ctx => {
  const { specializationId } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};

export const getPeriodList = async ctx => {
  const {} = ctx.request.body.requestData;

  return [{
    id: 8,
    periodCode: "2020",
    period: "2020/2021",
    effectiveDate: "2020 - 2021"
  }];
};

export const insertPeriod = async ctx => {
  const { periodCode, period, effectiveDate } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};

export const deletePeriod = async ctx => {
  const { periodId } = ctx.request.body.requestData;

  ctx.ok({
    response: {
      status: "success"
    }
  });
};
//# sourceMappingURL=classes.js.map