import express from 'express';
import pkg from "../db.cjs";
import bcrypt from 'bcrypt';
import jwtGenerator from '../utils/jwtGenerator.js';
import validInfo from '../middleware/validinfo.js'
import authorization from '../middleware/authorization.js';



const router = express.Router();
const {pool} = pkg;


router.put("/student", async (req, res) => {
    try {
        
        const { name } = req.body;
        if(!name) {
            return res.status(400).json({error: "Please fill in all fields"});
        }
        
        const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [
            name
        ]);
        
        if(user.rows.length === 0) {
            return res.status(401).send("User does not exist");
        }
        
        
        const deleteUser = await pool.query("DELETE FROM users WHERE user_name = $1", [
            name
        ]);

        res.json("User Deleted");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put("/teacher", async (req, res) => {
    try {
        
        const { name } = req.body;
        if(!name) {
            return res.status(400).json({error: "Please fill in all fields"});
        }
        
        const user = await pool.query("SELECT * FROM teachers WHERE user_name = $1", [
            name
        ]);
        
        if(user.rows.length === 0) {
            return res.status(401).send("User does not exist");
        }
        
        
        const deleteUser = await pool.query("DELETE FROM teachers WHERE user_name = $1", [
            name
        ]);

        res.json("User Deleted");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put("/coe", async (req, res) => {
    try {
        
        const { name } = req.body;
        if(!name) {
            return res.status(400).json({error: "Please fill in all fields"});
        }
        
        const user = await pool.query("SELECT * FROM coe WHERE user_name = $1", [
            name
        ]);
        
        if(user.rows.length === 0) {
            return res.status(401).send("User does not exist");
        }
        
        
        const deleteUser = await pool.query("DELETE FROM coe WHERE user_name = $1", [
            name
        ]);

        res.json("User Deleted");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


export default router;