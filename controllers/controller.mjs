
import { newClient, getUsers, deleteUsers } from "../models/db.mjs"
import { validationResult } from "express-validator"
import 'dotenv/config'

//controllers:
export const index = async (req, res) => {
    res.render("index")
}

export const agendar = async (req, res) => {
    if(!validationResult(req).isEmpty){
        res.status(400).render("invalid")
        return
    } else {
        let nome = req.body.nome
        let email = req.body.email
        let tel = req.body.telefone
        let data = req.body.data
        let hora = req.body.hora

        let client = await newClient(nome, email, tel, data, hora)

        if(client){
            res.status(200).render("agendar")
            return
        } else {
            res.status(500).render("error")
            return
        }
    }
}

export const validator = async (req, res) => {
    let nome = req.body.nome
    let password = req.body.senha

    if ( nome === process.env.NOMEADMIN && password === process.env.SENHAADMIN ) {
        let users = await getUsers()
        res.status(200).render("clients", {
            "Users": users
        })
    } else {
        res.status(401).render("invalid")
    }
}

export const deleteClient = async (req, res) => {
    let id = Number(req.body.id)
    let user = deleteUsers(id)
    if (user) {
        res.status(200).render("admin")
    } else {
        res.status(404).render("invalid")
    }
}