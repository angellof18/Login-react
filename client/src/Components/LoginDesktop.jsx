import React from 'react'

import axios from "axios"
import { SHA256 } from "crypto-js"
import { useRef, useState } from "react"
import { Link, redirect, useNavigate } from 'react-router-dom'

export const LoginDesktop = () => {
    const route = useNavigate()
    const form = useRef(null)
    const [password, setPassword] = useState('')
    const [usuario, setUsuario] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name == 'password') {
            setPassword(value)
        } else {
            setUsuario(value.toUpperCase())
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = { usuario, password: SHA256(password).toString() }
        const { data } = await axios.post('/api/login', userData)
        if (data == `El usuario ${usuario} no existe`) {
            alert(data)
            form.current.reset()
            return
        }

        const encryptPass = await data.password
        if (userData.password === encryptPass) {
            alert('SESION CORRECTA')
        } else {
            alert('Contraseña incorrecta')
        }

        form.current.reset()
    }

    return (
        <div className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-two-fifths">
                            <div className="box">
                                <div className="mx-4 my-4">
                                    <div className="columns is-vcentered is-centered">
                                        <div className="column is-full">
                                            <p className="has-text-weight-bold is-size-3 is-size-4-mobile is-size-4-tablet mb-5">INICIO DE SESION</p>
                                            <form onSubmit={handleSubmit} ref={form}>
                                                <div className="field has-text-left">
                                                    <label className="label">Usuario</label>
                                                    <div className="control">
                                                        <input name="usuario" type="text" className="input" required autoFocus
                                                            onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="field has-text-left">
                                                    <label className="label">Contraseña</label>
                                                    <div className="control">
                                                        <input name="password" type="password" className="input" required
                                                            onChange={handleChange} />
                                                        <a href="#" className="is-size-7 is-underlined" hidden>Has olvidado tu Contraseña??</a>
                                                    </div>
                                                </div>

                                                <div className="buttons mt-5">
                                                    <button type="submit" className="button is-link">Iniciar sesión</button>
                                                    <button type="button" className="button is-outlined is-link" onClick={() => route('/sign')}>
                                                        Resgitrarse
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

