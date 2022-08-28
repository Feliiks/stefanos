import api from "../lib/api"
import { login, logout } from '../reducers/user.reducer'


const AuthService = () => {};

AuthService.getSession = async (dispatch, sessionToken) => {
    let res = await api.post("/users/getsession", { token: sessionToken })

    dispatch(login({
        user: res.data.result
    }))
}

AuthService.signIn = async (dispatch, email, password) => {
    let res = await api.post("/users/login", {
        username: email,
        password: password
    })

    if (res.status !== 200) throw new Error()

    dispatch(login({ user: res.data.result }))

    localStorage.setItem("sessionToken", res.data.token)
}

AuthService.signInWithGoogle = async (dispatch, googleId) => {
    let res = await api.post("/users/login/google", {
        googleId: googleId
    })

    if (res.status !== 200) throw new Error()

    dispatch(login({ user: res.data.result }))

    localStorage.setItem("sessionToken", res.data.token)
}

AuthService.signUp = async (dispatch, email, password) => {
    let res = await api.post("/users", {
        username: email,
        password: password
    })

    if (res.status !== 201) throw new Error()

    dispatch(login({ user: res.data.result }))

    localStorage.setItem("sessionToken", res.data.token)
}

AuthService.signUpWithGoogle = async (dispatch, googleProfile) => {
    let res = await api.post("/users/google", {
        username: googleProfile.email,
        googleId: googleProfile.googleId
    })

    if (res.status !== 201) throw new Error()

    dispatch(login({ user: res.data.result }))

    localStorage.setItem("sessionToken", res.data.token)
}

AuthService.logout = async (dispatch, userId) => {
    await api.post("/users/logout", {
        user_id: userId
    })

    dispatch(logout())

    localStorage.removeItem("sessionToken")
}

export default AuthService