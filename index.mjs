import express from "express"
import { body, validationResult } from "express-validator"
import { index, agendar, validator, deleteClient } from "./controllers/controller.mjs"
//app
const app = express()
const host = "localhost"
const port = 8080

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'pug')

//rotas de usuario
app.get("/", (req, res) => { index(req, res) })

app.post("/agendar", [
        body('nome').trim().isLength({ min: 1 }),
        body('email').trim().isEmail().normalizeEmail(),
        body('telefone').trim().isNumeric().isLength({ min: 11, max: 11 }),
        body('data').trim().isDate(),
        body('hora').trim().isTime()
    ],(req, res) => { agendar(req, res) })

//rotas de administrador
app.post("/login", (req, res) => { validator(req, res) })

app.get("/admin", (req, res) => { res.render("admin") })

app.post("/deleteClient", (req, res) => { deleteClient(req, res) })

try{
    new Promise((resolve, reject) => {
        app.listen(port, (err) => {
            if(err) reject(err)
            else console.log(`Running at http://${host}:${port}`)
        })
    })
} catch (err) {
    console.error(err)
}