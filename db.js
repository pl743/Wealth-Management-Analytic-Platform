const { DBSQLClient } = require("@databricks/sql");
require("dotenv").config();

const client = new DBSQLClient();

async function connectDB() {

    await client.connect({
        host: process.env.DB_HOST,
        path: process.env.DB_HTTP_PATH,
        token: process.env.DB_TOKEN
    });

    return await client.openSession();
}

module.exports = connectDB;