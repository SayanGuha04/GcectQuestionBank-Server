import express from 'express';
import pkg from "../db/db.cjs";

const router = express.Router();
const {pool} = pkg;



router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleteQuestion = await pool.query("DELETE FROM questions WHERE suvid = $1",
            [id]
        );
        const deleteModule = await pool.query("DELETE FROM modules WHERE subid = $1",
            [id]
        );
        const deleteSubject = await pool.query("DELETE FROM subjects WHERE subid = $1",
            [id]
        );

        res.json("Subject and related modules and questions was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

export default router;