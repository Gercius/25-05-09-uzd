const API_URL = "http://localhost:8000/api/v1/users";

const getAuthHeaders = () => {
    const token = localStorage.getItem("jwtToken");
    return token
        ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" };
};

const fetchRequest = async (url, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: getAuthHeaders(),
        });

        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                const message = errorData.message || errorData.error || errorData.msg || "Ivyko klaida";
                console.error("Klaidos atsakymas is serverio:", errorData);
                throw new Error(message);
            } else {
                const text = await response.text();
                throw new Error(text || `HTTP error: ${response.status}`);
            }
        }

        return await response.json();
    } catch (err) {
        console.log("Uzklausos klaida: ", err.message);
    }
};

//Login
export const login = async (name, password) => {
    const res = await fetchRequest("/login", {
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
    const data = await fetchRequest("/signup", {
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
