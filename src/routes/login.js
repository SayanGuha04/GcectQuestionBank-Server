
import express from 'express';
import pkg from "../db.cjs";
import bcrypt from 'bcrypt';
import jwtGenerator from '../utils/jwtGenerator.js';
import validInfo from '../middleware/validinfo.js'
import authorization from '../middleware/authorization.js';



const router = express.Router();
const {pool} = pkg;




router.post("/student", validInfo, async (req, res) => {
    try {
        
        //1. destructure the req.body

        const { name, password } = req.body;


        if (!name || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        //2. check if user doesn't exit (if not then we throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [
            name
        ]);

        if(user.rows.length === 0) {
            return res.status(401).json("Password or ID is incorrect");
        }
        
        //3. check if incoming password is the same as the datebaes pass

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword) {
            return res.status(401).json("Password or ID is incorrect");
        }

        //4. give them a jwt token

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});



router.post("/teacher", async (req, res) => {
    try {
        
        //1. destructure the req.body

        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        //2. check if user doesn't exit (if not then we throw error)

        const user = await pool.query("SELECT * FROM teachers WHERE user_name = $1", [
            name
        ]);

        if(user.rows.length === 0) {
            return res.status(401).json("Password or ID is incorrect");
        }
        
        //3. check if incoming password is the same as the datebaes pass

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword) {
            return res.status(401).json("Password or ID is incorrect");
        }

        //4. give them a jwt token

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});




router.post("/coe", async (req, res) => {
    try {
        
        //1. destructure the req.body

        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        //2. check if user doesn't exit (if not then we throw error)

        const user = await pool.query("SELECT * FROM coe WHERE user_name = $1", [
            name
        ]);

        if(user.rows.length === 0) {
            return res.status(401).json("Password or ID is incorrect");
        }
        
        //3. check if incoming password is the same as the datebaes pass

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword) {
            return res.status(401).json("Password or ID is incorrect");
        }

        //4. give them a jwt token

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});






export default router;