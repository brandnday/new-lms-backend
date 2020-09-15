import {
  executeReadQuery,
  executeCreateUpdateDeleteQuery,
} from "../services/database";

//import { pgPool } from "../services/database";
const isActive = `status = 'A'`;
export const getExamDetail = async (ctx) => {
  const { examId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_exam 
    where id = $1
    AND ${isActive}
    ORDER BY id`,
    [examId]
  );
  ctx.ok({
    response: res,
  });
  // ctx.ok({
  //   response: {
  //     materialId: "12",
  //     examTitle: "asdf",
  //     multipleQuestions: [
  //       {
  //         questionText: "",
  //         answerList: [
  //           { answerText: "", isAnswer: true },
  //           { answerText: "", isAnswer: false },
  //         ],
  //       },
  //     ],
  //     essayQuestions: [
  //       {
  //         questionText: "",
  //         answerGuide: "",
  //       },
  //     ],
  //     appliedClassList: [
  //       {
  //         classId: "XIIA3",
  //         examStartTime: "timestamp",
  //         examEndTime: "timestamp",
  //       },
  //     ],
  //   },
  // });
};

export const insertExam = async (ctx) => {
  const {
    chapterId,
    materialId,
    examTitle,
    examDetail,
    multipleQuestions,
    essayQuestions,
    appliedClassList,
  } = ctx.request.body;
  //insert  as material

  const res = await executeCreateUpdateDeleteQuery(
    `insert into tr_exam (
      material_id,
      exam_title,
      chapter_id,
      exam_detail,
      status
    )
  values ($1,$2,$3, $4, 'A');`,
    [materialId, examTitle, chapterId, examDetail]
  );
  if (typeof multipleQuestions === "array" && multipleQuestions.length > 0) {
    // TODO : insert multiple question
  }
  if (typeof essayQuestions === "array" && essayQuestions.length > 0) {
    // TODO : insert essay question
  }
  if (typeof appliedClassList === "array" && appliedClassList.length > 0) {
    // TODO : insert exam class mapping
  }

  ctx.ok(res);
};

export const updateExam = async (ctx) => {
  const {
    examId,
    examTitle,
    examDetail,
    multipleQuestions,
    essayQuestions,
    appliedClassList,
  } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update tr_exam
    set
      exam_title = $2,
      exam_detail = $3,
      status = 'A'
    where id = $1`,
    [examId, examTitle, examDetail]
  );

  if (typeof multipleQuestions === "array" && multipleQuestions.length > 0) {
    // TODO : update multiple question
  }
  if (typeof essayQuestions === "array" && essayQuestions.length > 0) {
    // TODO : update essay question
  }
  if (typeof appliedClassList === "array" && appliedClassList.length > 0) {
    // TODO : update exam class mapping
  }

  ctx.ok(res);
};

export const deleteExam = async (ctx) => {
  const { examId } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update tr_exam
    set status = 'D'
    where id = $1`,
    [examId]
  );
  ctx.ok(res);
};
