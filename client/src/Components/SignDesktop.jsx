import axios from "axios"
import { SHA256 } from "crypto-js"
import { useState } from "react"
import { useRef } from "react"

export const SignDesktop = () => {
    const form = useRef(null)
    const [nombre, setNombre] = useState('')
    const [ap_paterno, setAp_paterno] = useState('')
    const [ap_materno, setAp_materno] = useState('')
    const [correo, setCorreo] = useState('')
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [passVerify, setPassVerify] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name == 'password') {
            setPassword(SHA256(value).toString())
        } else if (name == 'nombre') {
            setNombre(value.toUpperCase())
        } else if (name == 'ap_paterno') {
            setAp_paterno(value.toUpperCase())
        } else if (name == 'ap_materno') {
            setAp_materno(value.toUpperCase())
        } else if (name == 'correo') {
            setCorreo(value.toUpperCase())
        } else {
            setUsuario(value.toUpperCase())
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = { nombre, ap_paterno, ap_materno, correo, usuario, password }
        if (userData.password == SHA256(passVerify).toString()) {
            const response = await axios.post('/api/sign', userData)
            console.log(response)
            if (response.data == 'Usuario agregado exitosamente') {
                alert(response.data)
                form.current.reset()
            } else {
                alert(response.data)
            }

        } else {
            alert('Las contraseñas no son iguales')
            console.log(`pass: ${password} pass2: ${SHA256(passVerify).toString()}`)
        }
    }

    return (
        <>
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-three-fifths">
                                <div className="box">
                                    <div className="mx-4 my-4">
                                        <p className="title">REGISTRO</p>

                                        <form onSubmit={handleSubmit} ref={form}>
                                            <div className="field">
                                                <label className="label">Nombre(s)</label>
                                                <div className="control">
                                                    <input name="nombre" type="text" className="input" required autoFocus
                                                        onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="fixed-grid has-2-cols">
                                                <div className="grid">
                                                    <div className="cell">
                                                        <div className="field">
                                                            <label className="label">Apellido paterno</label>
                                                            <div className="control">
                                                                <input name="ap_paterno" type="text" className="input" required
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="cell">
                                                        <div className="field">
                                                            <label className="label">Apellido materno</label>
                                                            <div className="control">
                                                                <input name="ap_materno" type="text" className="input" required
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="field">
                                                <label className="label">Correo</label>
                                                <div className="control">
                                                    <input name="correo" type="email" className="input" required
                                                        onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                <label className="label">Usuario</label>
                                                <div className="control">
                                                    <input name="usuario" type="text" className="input" required
                                                        onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="fixed-grid has-2-cols">
                                                <div className="grid">
                                                    <div className="cell">
                                                        <div className="field">
                                                            <label className="label">Contraseña</label>
                                                            <div className="control">
                                                                <input name="password" type="password" className="input" required
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="cell">
                                                        <div className="field">
                                                            <label className="label">Verifica contraseña</label>
                                                            <div className="control">
                                                                <input type="password" className="input" required
                                                                    onChange={e => setPassVerify(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="container has-text-centered">
                                                <button type="submit" className="button is-link btn-sign">Registrar</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}