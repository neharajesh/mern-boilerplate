import { useState } from "react"
import { registerRequest } from "../../api/AuthAPI"

export const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const [message, setMessage] = useState("")

    const submitButtonHandler = () => {
        const {success, message} = registerRequest(username, password);
        setMessage(message)
    }

    return (<>
        <h1> Register Page </h1>
        <label>Username <input type="text" onChange={(e) => setUsername(e.target.value)} /> </label>
        <label>Password <input type="password" onChange={(e) => setPassword(e.target.value)} /> </label>
        <label>ReType Password <input type="password" onChange={(e) => setRetypePassword(e.target.value)} /> </label>
        <button onClick={submitButtonHandler} disabled={!(password === retypePassword)}> Submit </button>
        <p>username : {username}</p>
        <p>password : {password===retypePassword ? "maaaatches" : "no match :c"}</p>
        {message}
    </>)
}