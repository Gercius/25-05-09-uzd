import { fetchRequest } from "../utils/auth";

const API_URL = "http://localhost:8000/api/v1/users";

//Login
export const login = async (name, password) => {
    const res = await fetchRequest(API_URL, "/login", {
        method: "POST",
        body: JSON.stringify({ name, password }),
    });

    const userData = res.data;

    if (userData.token) {
        localStorage.setItem("jwtToken", userData.token);
    }

    if (userData.id) {
        localStorage.setItem("userid", userData.id);
    }

    return userData;
};

//Register
export const createUser = async (userData) => {
    const data = await fetchRequest(API_URL, "/signup", {
        method: "POST",
        body: JSON.stringify(userData),
    });

    if (userData.token) {
        localStorage.setItem("jwtToken", userData.token);
    }

    if (userData.id) {
        localStorage.setItem("userid", userData.id);
    }

    return data;
};

//Logout

export const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
};
