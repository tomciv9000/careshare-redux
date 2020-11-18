import { authHeader } from "../_helpers/auth-header";
const BASE_URL = "http://localhost:3000/api/v1"


export const childService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    return fetch(`${BASE_URL}/children`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };

    return fetch(`${BASE_URL}/children/${id}`, requestOptions).then(handleResponse);
}

async function register(child) {
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(child)
    };

    const response = await fetch(`${BASE_URL}/auth`, requestOptions);
    return handleResponse(response);
}

function update(child) {
    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(child)
    };

    return fetch(`${BASE_URL}/children/${child.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: "DELETE",
        headers: authHeader()
    };

    return fetch(`${BASE_URL}/children/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        
        const data = {
            "child": text && JSON.parse(text),
            "headers": response.headers
        }

        
        if (data.child.status === "error"){
            let errorMessages = data.child.errors.full_messages
            console.log(errorMessages)
        }

        if (!response.ok) {
            if (response.status === 401) {
                console.log("Logout action was executed")
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }
            
            const error = (data && data.child.errors.full_messages) || response.statusText;
            console.log("Error response:", error)
            return Promise.reject(error);
        }

        return data;
    });
}