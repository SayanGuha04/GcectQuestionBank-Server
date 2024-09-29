import express from 'express';
import pkg from "../db.cjs";
import isTeacher from '../middleware/isTeacher.js';


const router = express.Router();
const {pool} = pkg;


router.get("/", isTeacher, async (req, res) => {
    try {
        
        const { user_id } = req.user;

        //req.user has the payload
        
        const user = await pool.query("SELECT user_type FROM teachers WHERE user_id = $1", [
            user_id
        ]);

        if(user.rows[0].user_type === 'Teacher'){
            res.json(true);
        }
        else{
            res.json(false);
        }

    } catch (err) {
        
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});



export default router;