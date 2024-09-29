import express from 'express';
import pkg from "../db.cjs";
import authorization from '../middleware/authorization.js';


const router = express.Router();
const {pool} = pkg;


router.post("/", async (req, res) => {
    try {
        const {
            subject,
            degree,
            isCS,
            isIT,
            isCT,
            sem
        } = req.body;

        if (!subject) {
            return res.status(400).json({ error: "A subject is required" });
        }

        const newSubject = await pool.query(
            `INSERT INTO subjects (subject, degree, cs, it, ct, sem)
             VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            [subject, degree, isCS, isIT, isCT, sem]
        );

        res.json(newSubject.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;