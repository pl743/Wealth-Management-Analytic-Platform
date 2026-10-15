const express = require("express");
const router = express.Router();

const OpenAI = require("openai");
const connectDB = require("../db");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

function safe(value, prefix = "") {
  if (value === null || value === undefined || value === "") {
    return "Data not available";
  }
  return `${prefix}${value}`;
}

router.get("/", async (req, res) => {
  try {

    const session = await connectDB();

    const operation = await session.executeStatement(`
      SELECT *
      FROM wealth_management.datamart.executive_dashboard_mart
      LIMIT 1
    `);

    const rows = await operation.fetchAll();

    await operation.close();
    await session.close();

    if (!rows || rows.length === 0) {
      return res.status(404).send("No dashboard data found.");
    }

    const dashboard = rows[0];

const currentDateTime = new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

    const prompt = `
Generate a professional Executive Wealth Management Report.

Report Generated On : ${currentDateTime}

Dashboard Data Date : ${safe(dashboard.dashboard_date)}


IMPORTANT RULES

Return ONLY valid HTML.

Do not return JSON.

Do not return Markdown.

Do not use \\\\n

Start directly with <!DOCTYPE html>

Use inline CSS.

Create a professional corporate report.

Use only the dashboard data below.

If any information is unavailable, write "Data not available".

Dashboard Data

Total Clients : ${safe(dashboard.total_clients)}

Total Advisors : ${safe(dashboard.total_advisors)}

Total AUM : ${safe(dashboard.total_aum, "₹")}

Total Investment : ${safe(dashboard.total_investment, "₹")}

Total Redemption : ${safe(dashboard.total_redemption, "₹")}

Total Revenue : ${safe(dashboard.total_revenue, "₹")}

Active SIPs : ${safe(dashboard.active_sips)}

Active Schemes : ${safe(dashboard.active_schemes)}

Dashboard Date : ${safe(dashboard.dashboard_date)}

Sections

1 Executive Summary

2 KPI Analysis

3 Business Insights

4 Investment Analysis

5 Revenue Analysis

6 Risk Assessment

7 Growth Opportunities

8 SWOT Analysis

9 Strategic Recommendations

10 30 Day Plan

11 90 Day Plan

12 1 Year Strategy

13 Conclusion
`;

    const response = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    let report = response.choices[0].message.content;

    // remove markdown fences
    report = report.replace(/```html/gi, "");
    report = report.replace(/```/g, "");

    // decode escaped html if needed
    if (report.startsWith('"') && report.endsWith('"')) {
      try {
        report = JSON.parse(report);
      } catch {}
    }

    report = report
      .replace(/\\r\\n/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .trim();

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    res.send(report);

  } catch (err) {

    console.error(err);

    res.status(500).send(`
        <h2>Server Error</h2>
        <pre>${err.message}</pre>
    `);

  }
});

module.exports = router;