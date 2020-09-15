const { Pool } = require("pg");
export const pgPool = new Pool({
  user: "brandnday",
  host: "localhost",
  database: "newlms",
  password: "iwillliveandlove",
  port: 5432,
});

export const executeCreateUpdateDeleteQuery = async (
  queryString,
  paramList
) => {
  try {
    const res = await pgPool.query(queryString, paramList);
    return {
      response: {
        status: "success",
      },
    };
  } catch (e) {
    console.log(e)
    return {
      response: {
        status: "failed",
      },
    };
  }
};

export const executeReadQuery = async (queryString, paramList) => {
  try {
    const res = await pgPool.query(queryString, paramList);
    return {
      response: {
        content: res.rows || {},
        status: "success",
      },
    };
  } catch (e) {
    return {
      response: {
        status: "failed",
      },
    };
  }
};
