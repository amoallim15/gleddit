import React from "react"

//
export const DISCOVERY_PAGE_ID = 0
export const FAVORITE_PAGE_ID = 1
export const PROFILE_PAGE_ID = 2
export const SEARCH_PAGE_ID = 3
export const POST_PAGE_ID = 4
//
export const HOT_SUB_PAGE_ID = 0
export const TOP_SUB_PAGE_ID = 1
export const NEW_SUB_PAGE_ID = 2
export const POST_LIST_LOADING = 0
export const POST_LIST_DONE = 1
//
const initialState = {
  currentToken: null,
  currentPageID: DISCOVERY_PAGE_ID,
  currentPageSubID: HOT_SUB_PAGE_ID,
  currentPost: null,
  currentPostListState: POST_LIST_LOADING,
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
  oldSearchQuery: null,
  resetPostListFlag: 0,
  //
  currentFavPosts: [],
  currentFavPostsURLs: [],
}

const AppContext = React.createContext(initialState)
const { Provider } = AppContext

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "update_search_post_list_state":
        return {
          ...state,
          currentPostListState: action.payload,
          currentPageID: SEARCH_PAGE_ID,
        }
      case "update_post_list_state":
        return {
          ...state,
          currentPostListState: action.payload,
        }
      case "refresh_token":
        return {
          ...state,
          currentToken: action.payload,
        }
      case "change_search_query":
        return {
          ...state,
          currentSearchQuery: action.payload[0],
          oldSearchQuery: action.payload[1],
        }
      case "refresh_search_lists":
        return {
          ...state,
          currentPageID: SEARCH_PAGE_ID,
          currentSearchPosts: action.payload.children,
          currentSearchAfter: action.payload.after,
        }
      case "append_search_lists":
        return {
          ...state,
          currentPageID: SEARCH_PAGE_ID,
          currentSearchPosts: state.currentSearchPosts.concat(
            action.payload.children
          ),
          currentHotAfter: action.payload.after,
        }
      case "navigate_tabs":
        return {
          ...state,
          currentPageID: action.payload,
        }
      case "navigate_discovery_sub_tabs":
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
        //
        if (state.currentFavPostsURLs.includes(action.payload.data.permalink)) {
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
        } else {
          return {
            ...state,
            currentFavPosts: state.currentFavPosts.concat([action.payload]),
            currentFavPostsURLs: state.currentFavPostsURLs.concat([
              action.payload.data.permalink,
            ]),
          }
        }
      case "view_post":
        return {
          ...state,
          currentPageID: POST_PAGE_ID,
          currentPost: action.payload,
        }
      default:
        throw new Error("Unknown action type value.")
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export default AppContext
