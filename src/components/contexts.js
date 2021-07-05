import React from "react"

export const DISCOVERY_PAGE_ID = 0
export const FAVORITE_PAGE_ID = 1
export const PROFILE_PAGE_ID = 2
export const SEARCH_PAGE_ID = 3
export const HOT_SUB_PAGE_ID = 0
export const TOP_SUB_PAGE_ID = 1
export const NEW_SUB_PAGE_ID = 2
export const POST_LIST_PAGE_TYPE = 0
export const POST_PAGE_TYPE = 1

const initialState = {
  currentPageID: DISCOVERY_PAGE_ID,
  currentPageSubID: HOT_SUB_PAGE_ID,
  currentPageType: POST_LIST_PAGE_TYPE,
  currentPostURL: null,
  //
  currentHotPosts: [],
  currentTopPosts: [],
  currentNewPosts: [],
  currentFavPosts: [],
  currentSearchPosts: [],
  //
  currentSearchQuery: "",
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
      default:
        throw new Error("no action")
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
