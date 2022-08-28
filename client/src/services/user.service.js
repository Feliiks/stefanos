import api from "../lib/api"
import jwt from 'jwt-decode'


const UserService = () => {};

UserService.getByEmail = async (email) => {
    return await api.get(`/users/${email}`)
}

UserService.getSubscriptions = async (userId) => {
    return await api.get(`/subscriptions/${userId}`)
}

UserService.updateEmail = async (userId, email) => {
    return await api.put(`/users/username/${userId}`, {
        new_username: email
    })
}

UserService.passwordRecovery = async (email) => {
    let res = await api.post("/users/recovery/password", {
        email: email
    })

    localStorage.setItem("passwordToken", res.data.token)

    return res
}

UserService.sendNewPassword = async (token, newPassword) => {
    let payload = await jwt(token)

    await api.put(`/users/password/${payload._id}`, {
        new_password: newPassword
    })

    localStorage.removeItem("passwordToken")
}

UserService.updatePassword = async (userId, newPassword) => {
    return await api.put(`/users/password/${userId}`, {
        new_password: newPassword
    })
}

UserService.updateAdminStatus = async (userId) => {
    return await api.put(`/users/admin/${userId}`)
}

UserService.delete = async (userId) => {
    return await api.delete(`/users/${userId}`)
}

export default UserService