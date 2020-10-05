const BASE_URL = "http://localhost:3000/api/v1"

export const newUserSignUp = user => {
  return dispatch => {
    let signUpData = {
      "email": user.email, 
      "password": user.password, 
      "password_confirmation": user.passwordConfirm
    }
    return fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(signUpData)
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return signInNewUser(user)
      } else {
        throw Error(response.statusText);
      }
    })
    .then(returnedUser => {
      dispatch(loginUser(returnedUser.data))
    })
    .catch(error => console.error("SignUp Error:", error))
  }
}

const signInNewUser = user => {
  let userSignInData = {
    "email": user.email,
    "password": user.password
  } 
  return fetch(`${BASE_URL}/auth/sign_in`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userSignInData)
  })
  .then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
 .catch(error => console.error("New User SignIn Error:",error));
}

export const userSignIn = user => {
  return dispatch => {
    let userSignInData = {"email": user.email, "password": user.password}
    return fetch(`${BASE_URL}/auth/sign_in`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userSignInData)
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(data => {
      let returnedUserData = data.data
      dispatch(loginUser(returnedUserData))
    })
    .catch(error => {
      console.log("Error Catch :", error.message)
        //dispatch(loginFail(error.message))
        //return undefined
    })
  }
}
  
const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj
})

const loginFail = failObj => ({
  type: 'LOGIN_FAIL',
  payload: failObj
})

const getUser = email => {
  let loginData = {"user": {"email": email}}
  return fetch(`${BASE_URL}/find_user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.token}`,
    },  
    body: JSON.stringify(loginData)
  })
  .then(response => response.json())
  .then(userJson => {return userJson})
  .catch(error => {
    return error;
  });
}

export const getProfileFetch = () => {
  return dispatch => {
    const token = localStorage.token;
    if (token) {
      return fetch(`${BASE_URL}/profile`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {          
        if (data.user.data) {
          dispatch(loginUser(data.user.data.attributes))
        } else {
          console.log(data)
          localStorage.removeItem("token")
          dispatch(logoutUser())
        }
      })
    }
  }
}

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

export const noAuth = () => ({
  type: 'NOAUTH_USER'
})