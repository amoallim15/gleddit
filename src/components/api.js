import Store from "./store"

// WARNING::
// =========
// Current project implementation uses a single-page-application
// The reddit username/password and App secret will be shown to
// all users who access the current project.
// To tackle this issue, all third party APIs must be offloaded
// to the server-side, but for now, will be ignoring this secuirty
// issue in order to implement a totally single-page-application
// architecture.

const TOKEN_URL = "https://www.reddit.com/api/v1/access_token"
const API_URL = "https://oauth.reddit.com"
//
const AUTH_OPTIONS = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Authorization:
      "Basic TWtGdDh6cmdCRVZUOVE6YnFCRjFLbFlPRnlqNHdDVkQxeF9icEdROGpGTHRR",
  },
  body: "grant_type=client_credentials&username=amoallim15&password=a1l5i9j15",
  // mode: "no-cors",
}

const getAPIOptions = (token) => {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // => "Bearer token"
    },
  }
}

export const updateToken = async () => {
  // check if token is stored in the localStorage.
  let token = Store.get("TOKEN")
  if (token) {
    // validate token
    let res = await fetch(`${API_URL}/hot`, getAPIOptions(token.access_token))
    if (res.status === 200) {
      return token
    }
  }
  // if no token, get a new one and store it in localStorage.
  let res = await fetch(TOKEN_URL, AUTH_OPTIONS)
  token = await res.json()
  Store.set("TOKEN", token)
  return token
}
