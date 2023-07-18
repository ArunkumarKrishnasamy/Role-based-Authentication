const express = require("express")
const app = express();
app.use(express.json())

const PORT = process.env.PORT ||3001;

const {authenticate, authRole} =require("./Basic-Auth")
const {Role, users} = require("./data")

// Middleware
const pool = require("./database")

const cors = require("cors")
app.use(cors({
    origin:"http://localhost:3000"
}))

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");




   
// API Routes
// Post SuperAdmin
app.post("/admin",authenticate, async(req,res)=>{
try {
    let {username,email, password, role} = req.body
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    password = hash;
    
    const Add_SuperAdmin = await pool.query("INSERT INTO  super_admin_login (username, email, password, role) VALUES($1, $2,$3, $4) RETURNING *", [username,email, password, role])
    res.status(201).send(Add_SuperAdmin.rows[0])
} catch (error) {
    console.error(error)
    res.status(500).send("Something went wrong")
}
})

// Login SuperAdmin
app.post("/adminlogin", async(req, res)=>{
    try {
        let {email, password} = req.body;
        if(!email|| !password) {
            res.status(400).json({message :"Email and Password are required"})
        }
        let admin = await pool.query("SELECT * FROM super_admin_login WHERE email=$1", [email])
        admin = admin.rows[0];
        if(admin){
            let compare = bcrypt.compareSync(password, admin.password)
            if(compare){
                let token=jwt.sign({email :admin.email, id :admin.id}, "secretkey")
                res.status(200).send(token)
            }
            else{
                res.status(401).send("Password is incorect")
            }
        }
        else{
            res.status(404).send("User doesn't exist")
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Login went wrong")
    }
})


app.get("/users", async(req, res)=>{
    try {
         userslist = await pool.query("SELECT * FROM super_admin_login")
        res.send(userslist.rows)
        
    } catch (error) {
        console.error(error)
    }
})

// Admin pages
app.get("/dashboard",authenticate, async(req, res)=>{
    res.send("Admin Dashboard Page")
})

// Create User
app.post("/create_translator", async(req, res)=>{
    try {
        let {translator_name, translator_email, translator_password } = req.body
        
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(translator_password, salt)
        translator_password = hash
       
        let Add_Translator = await pool.query("INSERT INTO translator_login(translator_name,translator_email, translator_password) VALUES ($1, $2,$3) RETURNING * ", [translator_name, translator_email, translator_password])
    res.status(201).json(Add_Translator.rows[0])
    } catch (error) {
        console.error(error)
        res.status(400).send("Something is wrong with creating user")
    }
})
// Global Error handler
const  errorhandler = require('errorhandler')
app.use(errorhandler())

const role_list = require("./data")

app.listen(PORT,()=>{
console.log("Web server started")
})
