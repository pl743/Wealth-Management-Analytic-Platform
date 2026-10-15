# Wealth Management Analytics Platform

A data engineering and business intelligence project developed as part of **Practice School – I (PS-I)** at Anytime Invest.

The project focuses on organizing customer and investment data, building a structured data warehouse, creating business-specific data marts, and making data accessible through dashboards and REST APIs. It also explores AI-assisted financial report generation.

## About the Project

Financial organizations work with different types of customer, investment, transaction, and portfolio data. Organizing this information in a structured way helps make reporting and analysis easier.

This project explores an end-to-end analytics platform that transforms raw data into structured information for business analysis and reporting.

## Project Objectives

- Organize raw data for further processing and analysis.
- Design an Enterprise Data Warehouse (EDW).
- Model data using fact and dimension tables.
- Create business-specific Data Marts.
- Explore Power BI dashboards for business reporting.
- Develop REST APIs using Node.js and Express.js.
- Explore AI-assisted financial report generation using the OpenRouter API.

## System Architecture

The proposed data flow is:

```text
Raw Data
   |
   v
Data Lake
   |
   v
Enterprise Data Warehouse
   |
   v
Fact and Dimension Tables
   |
   v
Business Data Marts
   |
   +------------------+
   |                  |
   v                  v
Power BI Dashboards  REST APIs
   |                  |
   +--------+---------+
            |
            v
    AI-Assisted Reports
```

## Technology Stack

| Technology | Purpose |
|---|---|
| Databricks | Data platform and SQL analytics |
| Apache Spark / PySpark | Data processing and transformation |
| SQL | Data querying and analysis |
| Delta Lake / Parquet | Data storage and processing formats, where applicable |
| Node.js | Backend development |
| Express.js | REST API development |
| Power BI | Business intelligence and dashboards |
| Postman | API testing |
| OpenRouter API | AI-assisted report generation |

## Data Warehouse Design

The warehouse schema contains the following tables.

### Dimension Tables

- `dim_client` — Customer information
- `dim_advisor` — Advisor information
- `dim_amc` — Asset Management Company information
- `dim_goal` — Investment goal information
- `dim_scheme` — Investment scheme information
- `dim_time` — Date and time attributes

### Fact Tables

- `fact_transactions` — Transaction-related records
- `fact_sip` — Systematic Investment Plan records
- `fact_redemptions` — Redemption-related records
- `fact_commissions` — Commission-related records
- `fact_portfolio` — Portfolio-related records

The design uses a fact-and-dimension approach to support business reporting. Actual relationships depend on the keys defined in the warehouse tables.

## Business Data Marts

The project covers the design of business-specific analytical areas, including:

- **Client Portfolio:** Investment holdings and portfolio analysis
- **Advisor Performance:** Advisor-wise metrics and client analysis
- **Scheme Performance:** Scheme-level analysis
- **Revenue Analytics:** Brokerage and commission analysis
- **SIP Analytics:** SIP registrations and installments
- **Redemption Analytics:** Redemption and withdrawal trends
- **AMC Business:** AMC-wise investment analysis
- **Executive Reporting:** Consolidated business KPIs

## Backend REST API

The backend layer uses Node.js and Express.js to provide access to warehouse data.

Example endpoint:

```http
GET /customer/:id
```

The endpoint is designed to retrieve customer details using a customer ID and return the response in JSON format.

Postman can be used to send requests and validate API responses.

> Note: Configure the Databricks connection and required environment variables before running the backend. The endpoint and connection settings depend on the implementation in the repository.

## AI-Assisted Financial Reporting

The project explores generating readable financial summaries from structured portfolio data.

The intended workflow is:

1. Retrieve the required portfolio data.
2. Prepare a structured prompt in the backend.
3. Send the prompt to an AI model through the OpenRouter API.
4. Generate a readable report for review.

Possible report sections include an executive summary, investment analysis, revenue analysis, and risk assessment.

AI-generated financial content should be reviewed for accuracy before being used for financial decisions.

## Getting Started

### Prerequisites

Install or configure the following as required by the implementation:

- Node.js and npm
- Git
- Databricks workspace and SQL Warehouse access
- Postman for API testing
- Power BI Desktop for dashboard development

### Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

Install the Node.js dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root and add the environment variables required by your backend.

Example placeholders:

```env
PORT=3000
DATABRICKS_SERVER_HOSTNAME=your_workspace_hostname
DATABRICKS_HTTP_PATH=your_sql_warehouse_http_path
DATABRICKS_TOKEN=your_databricks_token
OPENROUTER_API_KEY=your_openrouter_api_key
```

Use the exact variable names expected by your code. Keep `.env` out of Git and never commit real API keys or access tokens.

### Run the Backend

If your backend entry point is `index.js`, run:

```bash
node index.js
```

If your project uses a different entry point or an npm script, follow the configuration in `package.json`.

## Learning Outcomes

Through this project, I explored:

- Data engineering and warehouse architecture
- Fact and dimension table modelling
- SQL-based data analysis
- Business-specific Data Mart design
- Backend development and REST APIs
- API testing with Postman
- Business intelligence concepts
- AI-assisted report generation

## Future Scope

- Expand automated data validation and transformation.
- Develop additional business dashboards.
- Improve API security and error handling.
- Add monitoring and logging for backend services.
- Improve AI report validation and reporting workflows.

## Author

**Parth Lavti**  
B.Tech — Computer Science and Engineering  
JK Lakshmipat University, Jaipur

## Acknowledgement

This project was undertaken as part of Practice School – I (PS-I), associated with Anytime Invest, with a focus on learning and applying data engineering, business intelligence, backend development, and AI integration concepts.

---

*This repository represents an academic internship project. Features described as exploratory or planned should be distinguished from components fully implemented and tested.*
