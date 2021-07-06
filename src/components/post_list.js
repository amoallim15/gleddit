import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { List, Button, Box } from "@material-ui/core"
import Loading from "./loading.js"
import PostSummary from "./post_summary.js"
import AppContext, {
  DISCOVERY_PAGE_ID,
  FAVORITE_PAGE_ID,
  SEARCH_PAGE_ID,
  HOT_SUB_PAGE_ID,
  TOP_SUB_PAGE_ID,
  NEW_SUB_PAGE_ID,
  POST_LIST_LOADING,
  POST_LIST_DONE,
} from "./contexts.js"
import { getPosts, getMorePosts, searchQuery } from "./api.js"

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 510,
  },
  container: {
    color: "white",
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
  },
  moreButton: {
    width: "100%",
    flexGrow: 1,
  },
  noPosts: {
    textAlign: "center",
  },
}))

const PostList = () => {
  const classes = useStyles()
  const [postList, setPostList] = React.useState([])
  const { state, dispatch } = React.useContext(AppContext)

  const loadMoreOnClick = () => {
    ;(async () => {
      dispatch({ type: "update_post_list_state", payload: POST_LIST_LOADING })
      let post_type = ""
      let after = ""
      switch (state.currentPageID) {
        case DISCOVERY_PAGE_ID:
          switch (state.currentPageSubID) {
            case HOT_SUB_PAGE_ID:
              post_type = "hot"
              after = state.currentHotAfter
              break
            case TOP_SUB_PAGE_ID:
              post_type = "top"
              after = state.currentTopAfter
              break
            case NEW_SUB_PAGE_ID:
              post_type = "new"
              after = state.currentNewAfter
              break
            default:
              break
          }
          let more_post_list = await getMorePosts(
            state.currentToken,
            post_type,
            after
          )
          dispatch({ type: "refresh_post_lists", payload: more_post_list })
          break
        case SEARCH_PAGE_ID:
          let more_search_list = await searchQuery(
            state.currentToken,
            state.currentSearchQuery,
            state.currentSearchAfter
          )
          dispatch({
            type: "append_search_lists",
            payload: more_search_list,
          })
          break
        default:
          break
      }
      dispatch({ type: "update_post_list_state", payload: POST_LIST_DONE })
    })()
  }

  React.useEffect(() => {
    ;(async () => {
      dispatch({ type: "update_post_list_state", payload: POST_LIST_LOADING })
      let post_lists = await getPosts(state.currentToken)
      post_lists.forEach((post_list) => {
        dispatch({ type: "refresh_post_lists", payload: post_list })
      })
      dispatch({ type: "update_post_list_state", payload: POST_LIST_DONE })
    })()
  }, [dispatch, state.currentToken])

  React.useEffect(() => {
    // this effect update pageList contents whether it is going to be
    // 1. search resulted posts
    // 2. discovery posts
    // 3. favorited posts
    switch (state.currentPageID) {
      case DISCOVERY_PAGE_ID:
        switch (state.currentPageSubID) {
          case HOT_SUB_PAGE_ID:
            setPostList(state.currentHotPosts)
            return
          case TOP_SUB_PAGE_ID:
            setPostList(state.currentTopPosts)
            return
          case NEW_SUB_PAGE_ID:
            setPostList(state.currentNewPosts)
            return
          default:
            throw new Error("Invalid page sub state.")
        }
      case FAVORITE_PAGE_ID:
        setPostList(state.currentFavPosts)
        return
      case SEARCH_PAGE_ID:
        setPostList(state.currentSearchPosts)
        return
      default:
        return
    }
  }, [state, setPostList])

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <div className={classes.container}>
        <div
          hidden={
            state.currentPostListState !== POST_LIST_DONE ||
            postList.length !== 0
          }
          className={classes.noPosts}
        >
          No posts available.
        </div>
        <List
          hidden={
            postList.length === 0 ||
            (state.currentPostListState !== POST_LIST_DONE &&
              state.currentPageID === SEARCH_PAGE_ID)
          }
        >
          {postList.map((post, index) => (
            <PostSummary key={index} post={post} index={index} />
          ))}
        </List>
        <Box hidden={state.currentPostListState === POST_LIST_DONE}>
          <Loading />
        </Box>
      </div>

      <Box hidden={state.currentPageID === FAVORITE_PAGE_ID}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.moreButton}
          disabled={state.currentPostListState !== POST_LIST_DONE}
          onClick={loadMoreOnClick}
        >
          LOAD MORE
        </Button>
      </Box>
    </Box>
  )
}

export default PostList
