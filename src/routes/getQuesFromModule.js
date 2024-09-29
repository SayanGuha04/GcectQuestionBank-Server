import express from 'express';
import pkg from "../db/db.cjs";

const router = express.Router();
const {pool} = pkg;

router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const questions = await pool.query("SELECT * FROM questions WHERE moduleid = $1;",
            [id]
        );
        const data = res.json(questions.rows);

    } catch (err) {
        console.error(err.message);        
    }
});

export default router;