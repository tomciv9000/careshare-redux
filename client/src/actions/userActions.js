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

const signInNewUser = async user => {
  let userSignInData = {
    "email": user.email,
    "password": user.password
  } 
  try {
    const response = await fetch(`${BASE_URL}/auth/sign_in`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userSignInData)
    })
    if (response.ok) {
      sessionStorage.setItem('user',
        JSON.stringify({
          'access-token': response.headers.get("access-token"),
          client: response.headers.get("client"),
          uid: response.headers.get("uid"),
        }))
      // console.log(response.headers.get("uid"))
      // console.log(response.headers.get("access-token"))
      // console.log(response.headers.get("client"))
      return response.json()
    } else {
      throw Error(response.statusText)
    }
  } catch (error) {
    return console.error("New User SignIn Error:", error)
  }
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
        sessionStorage.setItem('user',
        JSON.stringify({
        'access-token': response.headers.get("access-token"),
                 client: response.headers.get("client"),
                 uid: response.headers.get("uid"), 
               }));
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(data => {
      console.log(data)
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
    return fetch(`${BASE_URL}/auth/sign_out`, {
      method: "DELETE",
      headers: JSON.parse(sessionStorage.user)
      
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(data => {
      console.log("Please label this:", data.success)
      sessionStorage.removeItem("user")
      dispatch(signOutUser())
    })
    .catch(error => {
      console.log("SignOut Fail Error:", error.message)
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




// async function fetchMoviesBadStatus() {
//   const response = await fetch('/oops');

//   if (!response.ok) {
//     const message = `An error has occured: ${response.status}`;
//     throw new Error(message);
//   }

//   const movies = await response.json();
//   return movies;
// }

// fetchMoviesBadStatus().catch(error => {
//   error.message; // 'An error has occurred: 404'
// });
// export const getSpeakers = () => async (dispatch, getState) => {
//   try {
//     const response = await fetch(`${API_SERVER}/speakers`);
//     const speakers = await response.json();
//     console.log("speakers success", speakers);
//     dispatch(saveSpeakers(speakers));
//   } catch (error) {
//     console.log("throwing Error", error);
//     throw error;
//   }
// };