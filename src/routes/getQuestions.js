import express from 'express';
import pkg from "../db/db.cjs";

const router = express.Router();
const {pool} = pkg;

//:column/:value

router.get("/filter", async (req, res) => {
    try {

        const filters = req.query;

        // List of allowed columns for validation
        const allowedColumns = [
            "question",
            "marks",
            "module",
            "subject",
            "sem",
            "isCS",
            "isIT",
            "isCT",
            "degree"
        ];

        // Construct the query dynamically
        let queryString = "SELECT * FROM questions INNER JOIN modules ON questions.moduleid = modules.moduleid INNER JOIN subjects ON modules.subid = subjects.subid WHERE 1=1";
        let queryParams = [];

        Object.keys(filters).forEach((key, index) => {
            if (allowedColumns.includes(key)) {
                queryParams.push(filters[key]);
                queryString += ` AND ${key} = $${index + 1}`;
            }
        });

        if (queryParams.length === 0) {
            return res.status(400).json({ error: "No valid filters provided" });
        }

        const question = await pool.query(queryString, queryParams);

        if (question.rows.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }

        res.json(question.rows);
        

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router;