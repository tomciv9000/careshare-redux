export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.hasOwnProperty("access-token")) {
      return { 'Authorization': 'Bearer ' + user};
  } else {
      return {};
  }
}