import { authHeader } from "../_helpers/auth-header";
const BASE_URL = "http://localhost:3000/api/v1"


export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

async function login(user) {
    let userSignInData = {
        "email": user.email, 
        "password": user.password
    }
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userSignInData)
    };

    const response = await fetch(`${BASE_URL}/auth/sign_in`, requestOptions);
    const authUser = await handleResponse(response);

    //store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem("user", JSON.stringify({
        "access-token": authUser.headers.get("access-token"),
        "client": authUser.headers.get("client"),
        "uid": authUser.headers.get("uid"),
    }));
    
    return authUser;
    
}

function logout() {
    localStorage.removeItem("user");
}

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    return fetch(`${BASE_URL}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    return fetch(`${BASE_URL}/users/${id}`, requestOptions).then(handleResponse);
}

async function register(user) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    const response = await fetch(`${BASE_URL}/auth`, requestOptions);
    return handleResponse(response);
}

function update(user) {
    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    return fetch(`${BASE_URL}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: "DELETE",
        headers: authHeader()
    };

    return fetch(`${BASE_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        
        const data = {
            "user": text && JSON.parse(text),
            "headers": response.headers
        }

        
        if (data.user.status === "error"){
            let errorMessages = data.user.errors.full_messages
            console.log(errorMessages)
        }

        if (!response.ok) {
            if (response.status === 401) {
                console.log("Logout action was executed")
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }
            
            const error = (data && data.user.errors.full_messages) || response.statusText;
            console.log("Error response:", error)
            return Promise.reject(error);
        }

        return data;
    });
}