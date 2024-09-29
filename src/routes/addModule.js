import express from 'express';
import pkg from "../db.cjs";
import authorization from '../middleware/authorization.js';


const router = express.Router();
const {pool} = pkg;


router.post("/", async (req, res) => {
    try {
        const {
            module,
            subid
        } = req.body;

        if (!module) {
            return res.status(400).json({ error: "A module is required" });
        }

        const newModule = await pool.query(
            `INSERT INTO modules (module, subid)
             VALUES($1, $2) RETURNING *`,
            [module, subid]
        );

        res.json(newModule.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;