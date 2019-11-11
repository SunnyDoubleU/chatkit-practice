import axios from "axios";
import qs from "qs"

export const setUser = function (user) {
    debugger
    localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = function () {
    return JSON.parse(localStorage.getItem("user"));
}

export const clearUser = function () {
    localStorage.removeItem("user");
}

export const login = function (email, password) {
    debugger
    return axios({
        url: "http://localhost:5000/api/login",
        data: qs.stringify({ email, password }),
        method: "POST",
        header: { "content-type": "application/x-www-form-urlencoded" }
    })
        .then((user) => {
            debugger
            setUser(user)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const logout = function () {
    return axios
        .get("http://localhost:5000/api/logout")
        .then((res) => {
            clearUser()
        })
        .catch((err) => {
            console.log(err)
        })
}