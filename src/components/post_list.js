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
} from "./contexts.js"
import { getPosts, getMorePosts } from "./api.js"

const LOADING_STATE = 1
const DONE_STATE = 2

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
    flexGrow: 1,
  },
  noPosts: {
    textAlign: "center",
  },
}))

const PostList = () => {
  const classes = useStyles()
  const [postListState, setPostListState] = React.useState(LOADING_STATE)
  const [postList, setPostList] = React.useState([])
  const { state, dispatch } = React.useContext(AppContext)

  const loadMoreOnClick = () => {
    ;(async () => {
      let post_type = ""
      let after = ""
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
      setPostListState(LOADING_STATE)
      let more_post_list = await getMorePosts(
        state.currentToken,
        post_type,
        after
      )
      dispatch({ type: "refresh_post_lists", payload: more_post_list })
      setPostListState(DONE_STATE)
    })()
  }

  React.useEffect(() => {
    ;(async () => {
      setPostListState(LOADING_STATE)
      let post_lists = await getPosts(state.currentToken)
      post_lists.forEach((post_list) => {
        dispatch({ type: "refresh_post_lists", payload: post_list })
      })
      setPostListState(DONE_STATE)
    })()
  }, [dispatch, setPostListState])

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
          hidden={postListState !== DONE_STATE || postList.length !== 0}
          className={classes.noPosts}
        >
          No posts available.
        </div>
        <List hidden={postList.length === 0}>
          {postList.map((post, index) => (
            <PostSummary key={index} post={post} index={index} />
          ))}
        </List>
        <Box hidden={postListState === DONE_STATE}>
          <Loading />
        </Box>
      </div>

      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.moreButton}
        disabled={postListState !== DONE_STATE}
        onClick={loadMoreOnClick}
      >
        LOAD MORE
      </Button>
    </Box>
  )
}

export default PostList
