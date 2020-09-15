//import { pgPool } from "../services/database";
const isActive = `status = 'A'`;

import {
  pgPool,
  executeCreateUpdateDeleteQuery,
  executeReadQuery,
} from "../services/database";
export const getMaterialDetail = async (ctx) => {
  const { chapterId } = ctx.request.body;
  const res = await executeReadQuery(
    `select * from tr_material 
    where chapter_id = $1
    AND ${isActive}
    ORDER BY id`,
    [chapterId]
  );
  ctx.ok({
    response: res,
  });
  // ctx.ok({
  //   response: {
  //     materialTitle: "this is material title",
  //     materialType: "MATERIAL",
  //     materialDetail: "THIS IS material detail",
  //     materialAttachmentList: null,
  //   },
  // });
};

// TODO add attachment list
export const insertMaterial = async (ctx) => {
  const {
    chapterId,
    materialTitle,
    materialType,
    materialDetail,
    materialAttachmentList,
  } = ctx.request.body;
  const res = await executeCreateUpdateDeleteQuery(
    `insert into tr_material (
      chapter_id,
      material_title,
      material_type,
      material_detail,
      status
    )
  values ($1,$2,$3,$4, 'A');`,
    [chapterId, materialTitle, materialType, materialDetail]
  );
  ctx.ok(res);
};

// TODO add attachment list
export const updateMaterial = async (ctx) => {
  const {
    materialId,
    materialTitle,
    materialType,
    materialDetail,
    materialAttachmentList,
  } = ctx.request.body;
  const res = await executeCreateUpdateDeleteQuery(
    `update tr_material
    set material_title = $2,
      material_type = $3,
      material_detail = $4,
      status = 'A'
    where id = $1`,
    [materialId, materialTitle, materialType, materialDetail]
  );
  ctx.ok(res);
};

export const deleteMaterial = async (ctx) => {
  const { materialId } = ctx.request.body;
  const res = await executeCreateUpdateDeleteQuery(
    `update tr_material
    set status = 'D'
    where id = $1`,
    [materialId]
  );
  ctx.ok(res);
};
