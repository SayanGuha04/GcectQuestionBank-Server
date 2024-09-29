import express from 'express';
import pkg from "../db/db.cjs";

const router = express.Router();
const {pool} = pkg;

router.get("/", async(req, res) => {
    try {
        const allQuestions = await pool.query("SELECT * FROM questions INNER JOIN modules ON questions.moduleid = modules.moduleid INNER JOIN subjects ON modules.subid = subjects.subid;");
        const data = res.json(allQuestions.rows);

    } catch (err) {
        console.error(err.message);        
    }
});

export default router;