import express from 'express';
import pkg from "../db.cjs";
import authorization from '../middleware/authorization.js';


const router = express.Router();
const {pool} = pkg;

router.get("/", async(req, res) => {
    try {
        const allSubjects = await pool.query("SELECT * FROM subjects;");
        const data = res.json(allSubjects.rows);

    } catch (err) {
        console.error(err.message);        
    }
});

export default router;