import express from 'express';
import pkg from "../db/db.cjs";

const router = express.Router();
const {pool} = pkg;


router.get("/subjects", async(req, res) => {
    try {
        const subjects = await pool.query("SELECT subject FROM subjects;");
        const data = Array.from(
            new Set((subjects.rows).map(item => item.subject)));
        res.json(data);

    } catch (err) {
        console.error(err.message);        
    }
});

router.get("/modules", async(req, res) => {
    try {
        const modules = await pool.query("SELECT module FROM modules;");
        const data = Array.from(
            new Set((modules.rows).map(item => item.module)));
        res.json(data);

    } catch (err) {
        console.error(err.message);        
    }
});

router.get("/marks", async(req, res) => {
    try {
        const marks = await pool.query("SELECT marks FROM questions;");
        const data = (marks.rows);

        const uniqueSortedMarks = Array.from(
            new Set(data
                .map(item => item.marks) // Extract the marks
                .filter(mark => mark !== null) // Remove null values
            )
        ).sort((a, b) => a - b); // Sort numerically

        res.json(uniqueSortedMarks);


    } catch (err) {
        console.error(err.message);        
    }
});

export default router;