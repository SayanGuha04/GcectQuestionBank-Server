import express from 'express';
import pkg from "../db.cjs";
import bcrypt from 'bcrypt';
import jwtGenerator from '../utils/jwtGenerator.js';
import validInfo from '../middleware/validinfo.js'
import authorization from '../middleware/authorization.js';



import register from './register.js';
import login from './login.js';

import editAccount from './editAccounts.js';
import deleteAccount from './deleteAccounts.js'

const router = express.Router();
const {pool} = pkg;


router.use('/edit', editAccount);
router.use('/delete', deleteAccount);

//registering


router.use('/register', register);

/*
router.post("/register", validInfo, async (req, res) => {
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
*/


//login route


router.use('/login', login);
/*
router.post("/login", validInfo, async (req, res) => {
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
*/

router.get("/is-verify", authorization, async (req, res) => {
    try {
        
        res.json(true);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});





export default router;