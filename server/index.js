const express = require('express')
const cors = require('cors')
const http = require('http')
const mysql = require('mysql2/promise')
const { join } = require('path')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static(join(__dirname, '../client/dist')))

const server = http.createServer(app)

const dbConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT
}

const pool = mysql.createPool(dbConfig)

app.post('/api/sign', async (req, res) => {
    try {
        const { nombre, ap_paterno, ap_materno, correo, usuario, password } = req.body
        const addUser = 'INSERT INTO usuarios (nombre, ap_paterno, ap_materno, correo, usuario, password) VALUES(?,?,?,?,?,?)'
        const usuarioQuery = 'SELECT * FROM usuarios WHERE usuario = ?'
        const correoQuery = 'SELECT * FROM usuarios WHERE correo = ?'

        const [usuarioResult] = await pool.execute(usuarioQuery, [usuario])
        const [correoResult] = await pool.execute(correoQuery, [correo])

        if (correoResult.length > 0) {
            return res.json('Ese correo ya esta registrado')
        } else if (usuarioResult.length > 0) {
            return res.json('Ese usuario ya existe')
        } else {
            const [result] = await pool.execute(addUser, [nombre, ap_paterno, ap_materno, correo, usuario, password])

            if (result.affectedRows > 0) {
                return res.json('Usuario agregado exitosamente')
            }
            return res.json('Ocurrio un error al guardar')
        }

    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const { usuario } = req.body
        const queryLogin = 'SELECT * FROM usuarios WHERE usuario = ?'
        const [result] = await pool.execute(queryLogin, [usuario])

        if (result.length > 0) {
            return res.json(result[0])
        }
        return res.json(`El usuario ${usuario} no existe`)

    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

const port = process.env.PORT || 3001
server.listen(port, () => {
    console.log(`RUNNING SERVER PORT: ${port}`)
})