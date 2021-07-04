// INFO::
// =========
// It is possible to store the access_token obj in a
// react context object, but as we will store favorited
// posts in localStorage, we will not consider using
// react context objects for storing the access_token.
export default class Store {
  static set(key, value) {
    value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }

  static get(key) {
    let value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (err) {
      return value
    }
  }

  static remove(key) {
    localStorage.removeItem(key)
  }
}
