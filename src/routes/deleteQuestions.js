import express from 'express';
import pkg from "../db.cjs";
import authorization from '../middleware/authorization.js';


const router = express.Router();
const {pool} = pkg;



router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteQuestion = await pool.query("DELETE FROM questions WHERE quid = $1",
            [id]
        );

        res.json("Question was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

export default router;