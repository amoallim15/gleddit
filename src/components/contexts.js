import React from "react"

export const DISCOVERY_PAGE_ID = 0
export const FAVORITE_PAGE_ID = 1
export const PROFILE_PAGE_ID = 2
export const SEARCH_PAGE_ID = 3
export const POST_PAGE_ID = 4
//
export const HOT_SUB_PAGE_ID = 0
export const TOP_SUB_PAGE_ID = 1
export const NEW_SUB_PAGE_ID = 2
//
const initialState = {
  currentPageID: DISCOVERY_PAGE_ID,
  currentPageSubID: HOT_SUB_PAGE_ID,
  currentPost: null,
  //
  currentHotPosts: [],
  currentHotAfter: "",
  //
  currentTopPosts: [],
  currentTopAfter: "",
  //
  currentNewPosts: [],
  currentNewAfter: "",
  //
  currentSearchPosts: [],
  currentSearchAfter: "",
  currentSearchQuery: "",
  //
  currentFavPosts: [],
  currentFavPostsURLs: [],
}

const AppContext = React.createContext(initialState)
const { Provider } = AppContext

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "search":
        return {
          ...state,
          currentPageID: SEARCH_PAGE_ID,
          searchPosts: [],
          currentSearchQuery: action.payload,
        }
      case "navigate":
        return {
          ...state,
          currentPageID: action.payload,
        }
      case "discovery":
        return {
          ...state,
          currentPageID: DISCOVERY_PAGE_ID,
          currentPageSubID: action.payload,
        }
      case "refresh_post_lists":
        switch (action.payload.type) {
          case "hot":
            return {
              ...state,
              currentHotPosts: state.currentHotPosts.concat(
                action.payload.children
              ),
              currentHotAfter: action.payload.after,
            }
          case "top":
            return {
              ...state,
              currentTopPosts: state.currentTopPosts.concat(
                action.payload.children
              ),
              currentTopAfter: action.payload.after,
            }
          case "new":
            return {
              ...state,
              currentNewPosts: state.currentNewPosts.concat(
                action.payload.children
              ),
              currentNewAfter: action.payload.after,
            }
          default:
            throw new Error("Unknown action payload after value.")
        }
      case "favorite_post":
        if (state.currentFavPostsURLs.includes(action.payload.data.permalink))
          return {
            ...state,
            currentFavPosts: state.currentFavPosts.filter((value, index) => {
              return value !== action.payload
            }),
            currentFavPostsURLs: state.currentFavPostsURLs.filter(
              (value, index) => {
                return value !== action.payload.data.permalink
              }
            ),
          }
        else
          return {
            ...state,
            currentFavPosts: state.currentFavPosts.concat([action.payload]),
            currentFavPostsURLs: state.currentFavPostsURLs.concat([
              action.payload.data.permalink,
            ]),
          }
      case "view_post":
        return {
          ...state,
          currentPageID: POST_PAGE_ID,
          currentPost: action.payload,
        }
      default:
        throw new Error("Unknown action type value.")
      // case "more":
      //     return {
      //         ...state,
      //         currentPage: state.currentPage + 1
      //     }
      // case "refresh":
      //     return {
      //         ...state,
      //         currentPage: state.currentPosts.concat(action.payload)
      //     }
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export default AppContext
