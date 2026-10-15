const express = require("express");
const router = express.Router();

const connectDB = require("../db");

router.get("/", async (req, res) => {
    try {

        const session = await connectDB();

        const operation = await session.executeStatement(`
            SELECT *
            FROM wealth_management.datamart.executive_dashboard_mart
        `);

        const result = await operation.fetchAll();

        await operation.close();
        await session.close();

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;