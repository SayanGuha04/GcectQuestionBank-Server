import express from 'express';
import pkg from "../db.cjs";
import authorization from '../middleware/authorization.js';


const router = express.Router();
const {pool} = pkg;



router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            module
        } = req.body;

        // Collect the fields that are being updated
        const fields = [];
        const values = [];
        let queryString = 'UPDATE modules SET ';

        const data = {module};
        
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                fields.push(key);
                values.push(value);
            }
        }

        if (fields.length === 0) {
            return res.status(400).json({ error: "No fields provided for update" });
        }

        queryString += fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
        queryString += ` WHERE moduleid = $${fields.length + 1}`;

        // Add the id to the values array
        values.push(id);

        const updateModule = await pool.query(queryString, values);

        res.json("Module was updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router;