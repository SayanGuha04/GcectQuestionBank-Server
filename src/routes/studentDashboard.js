import express from 'express';
import pkg from "../db.cjs";
import isStudent from '../middleware/isStudent.js';


const router = express.Router();
const {pool} = pkg;


router.get("/", isStudent, async (req, res) => {
    try {
        
        const { user_id } = req.user;

        //req.user has the payload
        
        const user = await pool.query("SELECT user_type FROM users WHERE user_id = $1", [
            user_id
        ]);

        if(user.rows[0].user_type === 'Student'){
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