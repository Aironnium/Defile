import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (firstname, lastname, phone, gender, email, password) => {
    const {data} = await $host.post('api/user/registration', {firstname, lastname, phone, gender, email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchUsers = async () => {
    const {data} = await $authHost.get('api/user/')
    return data
}