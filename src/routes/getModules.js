import express from 'express';
import pkg from "../db/db.cjs";

const router = express.Router();
const {pool} = pkg;

router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const modules = await pool.query("SELECT * FROM modules WHERE subid = $1;",
            [id]
        );
        const data = res.json(modules.rows);

    } catch (err) {
        console.error(err.message);        
    }
});

export default router;