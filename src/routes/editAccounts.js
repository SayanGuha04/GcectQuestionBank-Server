import express from 'express';
import pkg from "../db/db.cjs";
import bcrypt from 'bcrypt';
import validInfo from '../middleware/validinfo.js'


const router = express.Router();
const {pool} = pkg;


router.delete("/student", validInfo, async (req, res) => {
    try {
        
        const { name, password } = req.body;
        if(!name || !password) {
            return res.status(400).json({error: "Please fill in all fields"});
        }
        
        const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [
            name
        ]);
        
        if(user.rows.length === 0) {
            return res.status(401).send("User does not exist");
        }
        
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const bcryptPassword = await bcrypt.hash(password, salt);
        
        const editedUser = await pool.query("UPDATE users SET user_password = $1 WHERE user_name = $2 RETURNING *", [
            bcryptPassword, name
        ]);

        res.json(editedUser)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.delete("/teacher", async (req, res) => {
    try {
        
        const { name, password } = req.body;
        if(!name || !password) {
            return res.status(400).json({error: "Please fill in all fields"});
        }
        
        const user = await pool.query("SELECT * FROM teachers WHERE user_name = $1", [
            name
        ]);
        
        if(user.rows.length === 0) {
            return res.status(401).send("User does not exist");
        }
        
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const bcryptPassword = await bcrypt.hash(password, salt);
        
        const editedUser = await pool.query("UPDATE teachers SET user_password = $1 WHERE user_name = $2 RETURNING *", [
            bcryptPassword, name
        ]);

        res.json(editedUser)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.delete("/coe", async (req, res) => {
    try {
        
        const { name, password } = req.body;
        if(!name || !password) {
            return res.status(400).json({error: "Please fill in all fields"});
        }
        
        const user = await pool.query("SELECT * FROM coe WHERE user_name = $1", [
            name
        ]);
        
        if(user.rows.length === 0) {
            return res.status(401).send("User does not exist");
        }
        
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const bcryptPassword = await bcrypt.hash(password, salt);
        
        const editedUser = await pool.query("UPDATE coe SET user_password = $1 WHERE user_name = $2 RETURNING *", [
            bcryptPassword, name
        ]);

        res.json(editedUser)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


export default router;