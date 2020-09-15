import {
  executeReadQuery,
  executeCreateUpdateDeleteQuery,
} from "../services/database";
const isActive = `status = 'A'`;

// TODO : Add post list as well.
export const getForumThreadList = async (ctx) => {
  const { chapterId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_thread 
    where chapter_id = $1
    AND ${isActive}
    ORDER BY id`,
    [chapterId]
  );
  ctx.ok({
    response: res,
  });
  // ctx.ok({
  //   response: [
  //     {
  //       author: "bryan andreas",
  //       createdDate: "20 Jan 2010",
  //       title: "Tralala lala alala",
  //       postList: [
  //         {
  //           threadId: "sekian",
  //           author: "bryan andreas",
  //           createdDate: "20 Jan 2010",
  //           postContent: "Tralala lala alala",
  //         },
  //         {
  //           threadId: "sekian",
  //           author: "bryan andreas",
  //           createdDate: "20 Jan 2010",
  //           postContent: "Tralala lala alala",
  //         },
  //         {
  //           threadId: "sekian",
  //           author: "bryan andreas",
  //           createdDate: "20 Jan 2010",
  //           postContent: "Tralala lala alala",
  //         },
  //       ],
  //     },
  //     {
  //       author: "bryan andreas",
  //       createdDate: "20 Jan 2010",
  //       title: "Tralala lala alala",
  //       postList: [
  //         {
  //           threadId: "sekian",
  //           author: "bryan andreas",
  //           createdDate: "20 Jan 2010",
  //           postContent: "Tralala lala alala",
  //         },
  //       ],
  //     },
  //     {
  //       author: "bryan andreas",
  //       createdDate: "20 Jan 2010",
  //       title: "Tralala lala alala",
  //       postList: [
  //         {
  //           threadId: "sekian",
  //           author: "bryan andreas",
  //           createdDate: "20 Jan 2010",
  //           postContent: "Tralala lala alala",
  //         },
  //       ],
  //     },
  //   ],
  // });
};

export const getForumThreadAnswerList = async (ctx) => {
  const { threadId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_thread_detail 
    where thread_id = $1
    AND ${isActive}
    ORDER BY id`,
    [threadId]
  );
  ctx.ok({
    response: res,
  });
  // ctx.ok({
  //   response: {
  //     threadId: "sekian",
  //     author: "bryan andreas",
  //     createdDate: "20 Jan 2010",
  //     postContent: "Tralala lala alala",
  //   },
  // });
};
export const insertForumThread = async (ctx) => {
  const { chapterId, userId, author, title } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `insert into tr_thread (chapter_id, title, user_id, user_name, status)
    values ($1,$2,$3,$4,'A');`,
    [chapterId, title, userId, author]
  );

  ctx.ok(res);
};

export const updateForumThread = async (ctx) => {
  const { threadId, userId, author, title } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update tr_thread
    set 
      title = $2,
      user_id = $3,
      user_name = $4,
      status = 'A'
    where id = $1`,
    [threadId, title, userId, author]
  );
  ctx.ok(res);
};

export const deleteForumThread = async (ctx) => {
  const { threadId } = ctx.request.body;
  const res = await executeCreateUpdateDeleteQuery(
    `update tr_thread
    set status = 'D'
    where id = $1`,
    [threadId]
  );
  ctx.ok(res);
};

// TODO minor : Add attachment
export const insertAnswer = async (ctx) => {
  const { threadId, userId, author, postContent } = ctx.request.body;
  const res = await executeCreateUpdateDeleteQuery(
    `insert into tr_thread_detail(
        thread_id,
        user_id,
        user_name,
        content,
        status
      )
    values ($1,$2,$3,$4, 'A');`,
    [threadId, userId, author, postContent]
  );
  ctx.ok(res);
};

export const deleteAnswer = async (ctx) => {
  const { answerId } = ctx.request.body;

  const res = await executeCreateUpdateDeleteQuery(
    `update tr_thread_detail
    set status = 'D'
    where id = $1`,
    [answerId]
  );
  ctx.ok(res);
};
