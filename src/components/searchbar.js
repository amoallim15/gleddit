import React from "react"
import { InputBase } from "@material-ui/core"
import { fade, makeStyles } from "@material-ui/core/styles"
import SearchIcon from "@material-ui/icons/Search"
import AppContext, { POST_LIST_LOADING, POST_LIST_DONE } from "./contexts.js"
import { searchQuery } from "./api.js"

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))

const SearchBar = () => {
  const classes = useStyles()
  const { state, dispatch } = React.useContext(AppContext)
  const handleChange = (e) => {
    dispatch({
      type: "change_search_query",
      payload: [e.target.value, state.currentSearchQuery],
    })
  }

  const handleOnSubmit = (e) => {
    if (e.target.value !== state.currentSearchQuery) {
      ;(async () => {
        dispatch({
          type: "update_search_post_list_state",
          payload: POST_LIST_LOADING,
        })
        let search_result = await searchQuery(
          state.currentToken,
          state.currentSearchQuery
        )
        dispatch({
          type: "refresh_search_lists",
          payload: search_result,
          query: e.target.value,
        })
        dispatch({
          type: "update_search_post_list_state",
          payload: POST_LIST_DONE,
        })
      })()
    }
    e.preventDefault()
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form onSubmit={handleOnSubmit}>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default SearchBar
