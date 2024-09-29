import dotenv from "dotenv";
import cors from "cors";
import pkg from "./db.js";

import jwtAuth from './routes/jwtAuth.js';
import dashboard from './routes/dashboard.js'

import addQuestions from './routes/addQuestions.js'
import editQuestions from './routes/editQuestions.js'
import deleteQuestions from './routes/deleteQuestions.js'
import getQuestions from './routes/getQuestions.js'
import getAllQuestions from './routes/getAllQuestions.js'

import studentDashboard from "./routes/studentDashboard.js";
import teacherDashboard from "./routes/teacherDashboard.js";
import coeDashboard from "./routes/coeDashboard.js";

import addSubject from "./routes/addSubject.js"
import addModule from "./routes/addModule.js"

import editModule from "./routes/editModule.js"
import editSubject from "./routes/editSubject.js"
import deleteModule from "./routes/deleteModule.js"
import deleteSubject from "./routes/deleteSubject.js"

import getAllSubjects from "./routes/getAllSubjects.js"
import getModules from "./routes/getModules.js"
import getQuesFromModule from "./routes/getQuesFromModule.js"

import getFilters from "./routes/getFilters.js"

dotenv.config({
    path: "./env"
})

const app = express();
const port = process.env.PORT;
const {pool} = pkg;

//middleware

app.use(cors());
app.use(express.json());   // helps us to access req.body

//ROUTES//

//register and login routes

app.use('/auth', jwtAuth);

//dashboard route

app.use('/dashboard', dashboard);

//add a question 

app.use('/questions', addQuestions);

//get all question 

app.use('/questions', getAllQuestions);

//get specific questions

app.use('/questions', getQuestions);

//edit a question 

app.use('/questions', editQuestions);

//delete a question 

app.use('/questions', deleteQuestions);



//verify type

app.use('/isstudent', studentDashboard);
app.use('/isteacher', teacherDashboard);
app.use('/iscoe', coeDashboard);


app.use("/addSubject", addSubject)
app.use("/addModule", addModule)

app.use("/editModule", editModule)
app.use("/editSubject", editSubject)
app.use("/deleteModule", deleteModule)
app.use("/deleteSubject", deleteSubject)

app.use("/getAllSubjects", getAllSubjects)

app.use("/getModules", getModules)

app.use("/getQuestions", getQuesFromModule)


app.use("/getFilters", getFilters)


app.listen(port, () => {
    console.log(`server has started on port ${port}`);
})
