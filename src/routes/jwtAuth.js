import express from 'express';
import pkg from "../db/db.cjs";
import authorization from '../middleware/authorization.js';

import register from './register.js';
import login from './login.js';

import editAccount from './editAccounts.js';
import deleteAccount from './deleteAccounts.js'

const router = express.Router();
const {pool} = pkg;

router.use('/edit', editAccount);
router.use('/delete', deleteAccount);

router.use('/register', register);
router.use('/login', login);

router.get("/is-verify", authorization, async (req, res) => {
    try {
        
        res.json(true);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;