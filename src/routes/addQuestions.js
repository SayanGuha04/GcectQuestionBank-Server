import express from 'express';
import pkg from "../db/db.cjs";

const router = express.Router();
const {pool} = pkg;


router.post("/", async (req, res) => {
    try {
        const {
            question,
            marks,
            moduleid,
            subid
        } = req.body;

        if (!question) {
            return res.status(400).json({ error: "A question is required" });
        }

        const newQuestion = await pool.query(
            `INSERT INTO questions (question, marks, moduleid, subid)
             VALUES($1, $2, $3, $4) RETURNING *`,
            [question, marks, moduleid, subid]
        );

        res.json(newQuestion.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;