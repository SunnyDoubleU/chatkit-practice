import React, { useState } from 'react'
import { login, setUser } from '../utils/auth'
import BasicLayout from '../layout/BasicLayout'



export default function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        debugger
        login(email, password)
            .then(() => {
                props.history.push('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <BasicLayout>
            <form onSubmit={submitHandler}>
                <label>email</label>
                <input required type="text" name="username" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>password</label>
                <input requireede type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" Value="Submit">Login</button>
            </form>
        </BasicLayout>
    )
}
