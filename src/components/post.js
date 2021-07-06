import React from "react"
import { format } from "timeago.js"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
  Box,
  List,
  CardActionArea,
} from "@material-ui/core"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown"
import CommentIcon from "@material-ui/icons/Comment"
import AppContext from "./contexts.js"
import Loading from "./loading"
import Comment from "./comment"
import { getPostComments } from "./api.js"

const LOADING_STATE = 1
const DONE_STATE = 2

const useStyles = makeStyles(() => ({
  container: {
    minWidth: 510,
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
  },
  root: {
    maxWidth: 510,
    marginBottom: 20,
  },
  media: {
    height: 140,
  },
  favButton: {
    marginLeft: "auto",
  },
  noComments: {
    textAlign: "center",
  },
  comments: {
    textAlign: "center",
    marginBottom: 20,
  },
}))

const Post = () => {
  const classes = useStyles()
  const [commentListState, setCommentListState] = React.useState(LOADING_STATE)
  const [commentList, setCommentList] = React.useState([])
  const { state, dispatch } = React.useContext(AppContext)

  const onFavClick = () => {
    dispatch({ type: "favorite_post", payload: state.currentPost })
  }

  React.useEffect(() => {
    if (state.currentPost === null) return
    ;(async () => {
      setCommentListState(LOADING_STATE)
      let comment_list = await getPostComments(
        state.currentToken,
        state.currentPost.data.id
      )
      setCommentList(comment_list)
      setCommentListState(DONE_STATE)
    })()
  }, [
    setCommentListState,
    setCommentList,
    state.currentToken,
    state.currentPost,
  ])

  if (state.currentPost === null) return <></>
  return (
    <Box display="flex" flexDirection="column" className={classes.container}>
      <Card className={classes.root}>
        <CardHeader
          title={`r/${state.currentPost.data.subreddit}`}
          subheader={`Posted By u/${state.currentPost.data.author} ${format(
            state.currentPost.data.created * 1000
          )}`}
        />
        <CardActionArea
          href={`https://reddit.com${state.currentPost.data.permalink}`}
          target="_blank"
        >
          {state.currentPost.data.thumbnail.includes("jpg") ? (
            <CardMedia
              className={classes.media}
              image={state.currentPost.data.thumbnail}
              title="Contemplative Reptile"
            />
          ) : (
            <></>
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {state.currentPost.data.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton disabled>
            <ThumbsUpDownIcon />
          </IconButton>
          <span>{state.currentPost.data.score}</span>
          <IconButton disabled>
            <CommentIcon />
          </IconButton>
          <span>{state.currentPost.data.num_comments}</span>
          <IconButton
            onClick={onFavClick}
            className={classes.favButton}
            color={
              state.currentFavPostsURLs.includes(
                state.currentPost.data.permalink
              )
                ? "secondary"
                : "default"
            }
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <div className={classes.comments}>TOP COMMENTS</div>
      <div
        hidden={commentListState !== DONE_STATE || commentList.length !== 0}
        className={classes.noComments}
      >
        No comments available.
      </div>
      <List
        hidden={commentListState !== DONE_STATE || commentList.length === 0}
      >
        {commentList.map((comment, index) => (
          <Comment key={index} comment={comment} index={index} />
        ))}
      </List>
      <Box hidden={commentListState === DONE_STATE}>
        <Loading />
      </Box>
    </Box>
  )
}

export default Post
