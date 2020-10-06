const BASE_URL = "http://localhost:3000/api/v1"

export const signUpRequest = user => {
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
      dispatch(signInUser(returnedUser.data))
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

export const signInRequest = user => {
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
        console.log(response.headers.get("uid"))
        console.log(response.headers.get("expiry"))
        console.log(response.headers.get("access-token"))
        console.log(response.headers.get("client"))
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })

//     const contentType = response.headers.get('content-type');
//     if (!contentType || !contentType.includes('application/json')) {
//       throw new TypeError("Oops, we haven't got JSON!");
//     }
//     return response.json();
//  })



    .then(data => {
      let returnedUserData = data.data
      dispatch(signInUser(returnedUserData))
    })
    .catch(error => {
      console.log("Error Catch :", error.message)
        dispatch(signInFail(error.message))
        return undefined
    })
  }
}
  
export const signOutRequest = () => {
  return dispatch => {
    //let userSignInData = {"email": user.email, "password": user.password}
    return fetch(`${BASE_URL}/auth/sign_out`, {
      method: "DELETE",
      // headers: {
      //   'Content-Type': 'application/json',
      //   Accept: 'application/json',
      // },
      //body: JSON.stringify(userSignInData)
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(data => {
      console.log(data)
      // let returnedUserData = data.data
      // dispatch(signInUser(returnedUserData))
    })
    .catch(error => {
      console.log("Error Catch :", error.message)
        // dispatch(signInFail(error.message))
        // return undefined
    })
  }
}


const signInUser = userObj => ({
  type: 'SIGNIN_USER',
  payload: userObj
})

const signInFail = failObj => ({
  type: 'SIGNIN_FAIL',
  payload: failObj
})

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
          dispatch(signInUser(data.user.data.attributes))
        } else {
          console.log(data)
          localStorage.removeItem("token")
          dispatch(signOutUser())
        }
      })
    }
  }
}

export const signOutUser = () => ({
  type: 'SIGNOUT_USER'
})

// export const noAuth = () => ({
//   type: 'NOAUTH_USER'
// })