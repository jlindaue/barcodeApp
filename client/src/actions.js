import { BACKEND_URL } from './config.js';
import axios from 'axios'


export function loginRequest(credentials, setLoginState) {
    const searchParams = new URLSearchParams({email: credentials.email,password: credentials.password});
    axios.post(`${BACKEND_URL}/login`, searchParams, {credentials: 'include'})
    .then((resp) => {
        setLoginState("logged")
    })
}

export function registerRequest(userInfo, setLoginState) {
    axios.post(`${BACKEND_URL}/signup`, userInfo, {credentials: 'include'})
        .then(() => setLoginState("logged"))
}
