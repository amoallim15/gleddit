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
const TOKEN_LOCAL_STORAGE_KEY = "TOKEN"
const POST_TYPES = ["hot", "top", "new"]
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
//
const getAPIOptions = (token) => {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // => "Bearer token".
    },
  }
}

export const refreshToken = async () => {
  // check if token is stored in the localStorage.
  let token = Store.get("TOKEN")
  if (token) {
    // validate token
    let res = await fetch(`${API_URL}/hot`, getAPIOptions(token.access_token))
    if (res.status === 200) {
      return token
    }
  }
  // get a new token and store it in localStorage.
  let res = await fetch(TOKEN_URL, AUTH_OPTIONS)
  token = await res.json()
  Store.set(TOKEN_LOCAL_STORAGE_KEY, token)
  return token
}

export const getPosts = async () => {
  // fetching posts for hot/top/new will be done concurrently.
  let promises = []
  let token = await refreshToken()
  POST_TYPES.forEach((post_type) => {
    promises.push(
      (async () => {
        let res = await fetch(
          `${API_URL}/${post_type}`,
          getAPIOptions(token.access_token)
        )
        let data = await res.json()
        return {
          type: post_type,
          after: data.data.after,
          dist: data.data.dist,
          children: data.data.children,
        }
      })()
    )
  })
  return Promise.all(promises)
}

export const getPostComments = async (post_id) => {
  let token = await refreshToken()
  let res = await fetch(
    `${API_URL}/comments/${post_id}`,
    getAPIOptions(token.access_token)
  )
  if (res.status !== 200) return []

  let data = await res.json()
  let last_item = data[1].data.children.pop()
  if (last_item && last_item.kind !== "more")
    data[1].data.children.push(last_item)
  return data[1].data.children
}
