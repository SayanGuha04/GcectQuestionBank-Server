import express from 'express';
import pkg from "../db/db.cjs";
import authorization from '../middleware/authorization.js';


const router = express.Router();
const {pool} = pkg;


router.get("/", authorization, async (req, res) => {
    try {
        
        
        const { user_id } = req.user;

        //req.user has the payload
        
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [
            user_id
        ]);
        
        res.json(user.rows[0]);

    } catch (err) {
        
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});



export default router;