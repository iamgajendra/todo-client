export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { 'auth-token': user.accessToken, 'Content-type':'application/json' };
  } else {
    return {};
  }
}
