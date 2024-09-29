import express from 'express';
import pkg from "../db/db.cjs";
import bcrypt from 'bcrypt';
import jwtGenerator from '../utils/jwtGenerator.js';
import validInfo from '../middleware/validinfo.js'

const router = express.Router();
const {pool} = pkg;


router.post("/student", validInfo, async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)

        const { name, password, type} = req.body;

        if (!name || !password || !type) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }


        //2. check if user exist (if user exist then throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [
            name
        ]);

        if(user.rows.length !== 0) {
            return res.status(401).send("User already exist")
        }

        //3. bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter the new user inside our database

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_password, user_type) VALUES ($1, $2, $3) RETURNING *", 
            [name, bcryptPassword, type]);


        //5. genrating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.post("/teacher", async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)

        const { name, password, type} = req.body;

        if (!name || !password || !type) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }


        //2. check if user exist (if user exist then throw error)

        const user = await pool.query("SELECT * FROM teachers WHERE user_name = $1", [
            name
        ]);

        if(user.rows.length !== 0) {
            return res.status(401).send("User already exist")
        }

        //3. bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter the new user inside our database

        const newUser = await pool.query(
            "INSERT INTO teachers (user_name, user_password, user_type) VALUES ($1, $2, $3) RETURNING *", 
            [name, bcryptPassword, type]);


        //5. genrating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.post("/coe", async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)

        const { name, password, type} = req.body;

        if (!name || !password || !type) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }


        //2. check if user exist (if user exist then throw error)

        const user = await pool.query("SELECT * FROM coe WHERE user_name = $1", [
            name
        ]);

        if(user.rows.length !== 0) {
            return res.status(401).send("User already exist")
        }

        //3. bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter the new user inside our database

        const newUser = await pool.query(
            "INSERT INTO coe (user_name, user_password, user_type) VALUES ($1, $2, $3) RETURNING *", 
            [name, bcryptPassword, type]);


        //5. genrating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;