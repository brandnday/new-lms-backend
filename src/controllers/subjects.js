import {
  pgPool,
  executeReadQuery,
  executeCreateUpdateDeleteQuery,
} from "../services/database";
const isActive = `status = 'A'`;

// TODO :  get mapping class and teacher. - filter
export const getSubjectList = async (ctx) => {
  //might want to make this with pagination
  const { schoolId, gradeId, specializationId, teacherId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_subject 
    where school_id = $1
    AND ${isActive}
    ORDER BY id`,
    [schoolId]
  );
  ctx.ok({
    response: res,
  });
  // ctx.ok({
  //   response: [
  //     {
  //       subjectName: "Physics",
  //       subjectCode: "PHY0123",
  //       major: "Science",
  //       majorCode: "SCI",
  //       primaryTeacherCode: "Desi lalal",
  //       secondaryTeacherCode: "Chandra Winata",
  //       classList: [
  //         { classId: 1, classCode: "XIIA1", className: "XIIA 1" },
  //         { classId: 2, classCode: "XIIA2", className: "XIIA 2" },
  //         { classId: 3, classCode: "XIIA3", className: "XIIA 3" },
  //       ],
  //     },
  //     {
  //       subjectName: "Physics",
  //       subjectCode: "PHY0123",
  //       major: "Science",
  //       majorCode: "SCI",
  //       primaryTeacherCode: "Desi lalal",
  //       secondaryTeacherCode: "Chandra Winata",
  //       classList: [
  //         { classId: 1, classCode: "XIIA1", className: "XIIA 1" },
  //         { classId: 2, classCode: "XIIA2", className: "XIIA 2" },
  //         { classId: 3, classCode: "XIIA3", className: "XIIA 3" },
  //       ],
  //     },
  //   ],
  // });
};

export const getSubjectDetail = async (ctx) => {
  const { subjectId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_subject
    where id= $1
    AND ${isActive}
    ORDER BY id`,
    [subjectId]
  );
  ctx.ok({
    response: res,
  });
  // ctx.ok({
  //   response: {
  //     subjectName: "Physics",
  //     subjectCode: "PHY0123",
  //     major: "Science",
  //     majorCode: "SCI",
  //     primaryTeacherCode: "Desi lalal",
  //     secondaryTeacherCode: "Chandra Winata",
  //     classList: [
  //       { classId: 1, classCode: "XIIA1", className: "XIIA 1" },
  //       { classId: 2, classCode: "XIIA2", className: "XIIA 2" },
  //       { classId: 3, classCode: "XIIA3", className: "XIIA 3" },
  //     ],
  //     subjectChapters: [
  //       {
  //         chapterId: "342314",
  //         chapterTitle: "Gelombang dan bunyi",
  //         chapterDetail: ` Kompetensi Dasar: Menerapkan konsep dan prinsip gelombang bunyi dan cahaya dalam teknologi. 1. Mengemukakan beberapa sumber dan perambatan gelombang bunyi.\n
  //       2. Menyelidiki sifat-sifat gelombang bunyi.\n
  //       3. Menentukan frekuensi pengamat pada peristiwa efek Doppler.\n
  //       4. Menghitung frekuensi pelayangan gelombang.\n
  //       5. Menentukan intensitas dan taraf intensitas bunyi.\n
  //       6. Menerapkan gelombang ultrasonik dalam berbagai teknologi.`,
  //         discussionList: [{}],
  //         materialList: [
  //           {
  //             materialId: "34234",
  //             materialType: "material",
  //             materialTitle: "Bunyi sebagai gelombang & cepat rambat bunyi",
  //           },
  //         ],
  //         videoMaterialList: [
  //           {
  //             materialId: "23451",
  //             materialType: "video",
  //             materialTitle: "Video penjelasan bunyi sebagai gelombang",
  //           },
  //         ],
  //         assignmentMaterialList: [
  //           {
  //             materialId: "532342",
  //             materialType: "assignment",
  //             materialTitle: "Soal latihan 1 - Bunyi sebagai gelombang",
  //           },
  //           {
  //             materialId: "532342",
  //             materialType: "assignment",
  //             materialTitle: "Soal latihan 2 - Cepat rambat bunyi",
  //           },
  //         ],
  //         examMaterialList: [
  //           {
  //             materialId: "235123",
  //             materialType: "exam",
  //             materialTitle: "Ulangan Harian 1 - Bunyi sebagai gelombang",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // });
};

// TODO :  insert mapping class and teacher.
export const insertSubject = async (ctx) => {
  const {
    schoolId,
    subjectName,
    subjectCode,
    specializationId,
    subjectClassMapping,
  } = ctx.request.body;

  const res = await executeReadQuery(
    `insert into tr_subject (
        subject_name,
        subject_code,
        specialization_id,
        school_id,
        status
      )
    values ($1,$2, $3,$4, 'A') RETURNING id;`,
    [subjectName, subjectCode, specializationId, schoolId]
  );
  ctx.ok(res);
};

export const deleteSubject = async (ctx) => {
  const { subjectId } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `select * from tr_grade 
    where school_id = $1
    AND ${isActive}
    ORDER BY id`,
    [schoolId]
  );
  ctx.ok(res);
};

export const updateSubject = async (ctx) => {
  const {
    subjectId,
    subjectName,
    subjectCode,
    specializationId,
    subjectClassMapping,
  } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update tr_subject
    set subject_name = $1,
      subject_code = $2,
      specialization_id = $3,
      status = 'A'
    where id = $4`,
    [subjectName, subjectCode, specializationId, subjectId]
  );
  ctx.ok(res);
};

// TODO : fix format
export const getSubjectClassMappingList = async (ctx) => {
  const { subjectId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_class_subject_mapping
    where subject_id = $1
    AND ${isActive}
    ORDER BY id`,
    [subjectId]
  );
  ctx.ok({
    response: res,
  });
  // return [
  //   { classId: 1, classCode: "XIIA1", className: "XIIA 1" },
  //   { classId: 2, classCode: "XIIA2", className: "XIIA 2" },
  //   { classId: 3, classCode: "XIIA3", className: "XIIA 3" },
  // ];
};

export const upsertSubjectClassMappingList = async (ctx) => {
  const { subjectId, classMappingList } = ctx.request.body;
  const res = await executeCreateUpdateDeleteQuery(
    `update tr_class_subject_mapping 
    set status = 'D'
    where subject_id=$1`,
    [subjectId]
  );

  if (classMappingList.length > 0) {
    await classMappingList.forEach(async (classSubjectMapping) => {
      const {
        primaryTeacherCode,
        secondaryTeacherCode,
        classId,
      } = classSubjectMapping;
      const res = await executeCreateUpdateDeleteQuery(
        `insert into tr_class_subject_mapping 
      (class_id, subject_id, primary_teacher_code ,secondary_teacher_code,status)
      values ($1,$2,$3,$4, 'A');`,
        [classId, subjectId, primaryTeacherCode, secondaryTeacherCode]
      );
    });
  }

  ctx.ok(res);
};

// const getSubjectTeacherMappingList =  async (ctx) => {
//   const { teacherId }= ctx.request.body;
//   ctx.ok({
// };

// TODO : add material to chapter list
export const getSubjectChapterList = async (ctx) => {
  const { subjectId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_chapters
    where subject_id = $1
    AND ${isActive}
    ORDER BY id`,
    [subjectId]
  );
  ctx.ok({
    response: res,
  });

  // ctx.ok({
  //   response: [
  //     {
  //       chapterId: "342314",
  //       chapterTitle: "Gelombang dan bunyi",
  //       chapterDetail: ` Kompetensi Dasar: Menerapkan konsep dan prinsip gelombang bunyi dan cahaya dalam teknologi. 1. Mengemukakan beberapa sumber dan perambatan gelombang bunyi.\n
  //     2. Menyelidiki sifat-sifat gelombang bunyi.\n
  //     3. Menentukan frekuensi pengamat pada peristiwa efek Doppler.\n
  //     4. Menghitung frekuensi pelayangan gelombang.\n
  //     5. Menentukan intensitas dan taraf intensitas bunyi.\n
  //     6. Menerapkan gelombang ultrasonik dalam berbagai teknologi.`,
  //       discussionList: [{}],
  //       materialList: [
  //         {
  //           materialId: "34234",
  //           materialType: "material",
  //           materialTitle: "Bunyi sebagai gelombang & cepat rambat bunyi",
  //         },
  //         {
  //           materialId: "23451",
  //           materialType: "video",
  //           materialTitle: "Video penjelasan bunyi sebagai gelombang",
  //         },
  //         {
  //           materialId: "532342",
  //           materialType: "assignment",
  //           materialTitle: "Soal latihan 1 - Bunyi sebagai gelombang",
  //         },
  //         {
  //           materialId: "532342",
  //           materialType: "assignment",
  //           materialTitle: "Soal latihan 2 - Cepat rambat bunyi",
  //         },
  //         {
  //           materialId: "235123",
  //           materialType: "exam",
  //           materialTitle: "Ulangan Harian 1 - Bunyi sebagai gelombang",
  //         },
  //       ],
  //     },
  //   ],
  // });
};

export const insertChapter = async (ctx) => {
  const { subjectId, chapterTitle, chapterDetail } = ctx.request.body;
  const res = await executeCreateUpdateDeleteQuery(
    `insert into tr_chapters (
      subject_id,
      chapter_title,
      chapter_detail,
      status
    )
  values ($1, $2, $3, 'A');`,
    [subjectId, chapterTitle, chapterDetail]
  );
  ctx.ok(res);
};

export const updateChapter = async (ctx) => {
  const { chapterId, chapterTitle, chapterDetail } = ctx.request.body;
  const res = await executeCreateUpdateDeleteQuery(
    `update tr_chapters
    set chapter_title = $2,
      chapter_detail = $3
    where id = $1`,
    [chapterId, chapterTitle, chapterDetail]
  );
  ctx.ok(res);
};

export const deleteChapter = async (ctx) => {
  const { chapterId } = ctx.request.body;
  const res = await executeCreateUpdateDeleteQuery(
    `update tr_chapters
    set status = 'D'
    where id = $1`,
    [chapterId]
  );
  ctx.ok(res);
};
