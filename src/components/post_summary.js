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
  CardActionArea,
} from "@material-ui/core"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown"
import CommentIcon from "@material-ui/icons/Comment"
import AppContext from "./contexts.js"

const useStyles = makeStyles({
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
})

const PostSummary = ({ post, index }) => {
  const classes = useStyles()
  const { state, dispatch } = React.useContext(AppContext)
  const onFavClick = () => {
    console.log("a")
    dispatch({ type: "favorite_post", payload: post })
  }
  const onPostClick = () => {
    dispatch({ type: "view_post", payload: post })
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={`r/${post.data.subreddit}`}
        subheader={`Posted By u/${post.data.author} ${format(
          post.data.created * 1000
        )}`}
      />
      <CardActionArea
        onClick={onPostClick}
        // href={`https://reddit.com${post.data.permalink}`}
        // target="_blank"
      >
        {post.data.thumbnail.includes("jpg") ? (
          <CardMedia
            className={classes.media}
            image={post.data.thumbnail}
            title="Contemplative Reptile"
          />
        ) : (
          <></>
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.data.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton disabled>
          <ThumbsUpDownIcon />
        </IconButton>
        <span>{post.data.score}</span>
        <IconButton disabled>
          <CommentIcon />
        </IconButton>
        <span>{post.data.num_comments}</span>
        <IconButton
          onClick={onFavClick}
          className={classes.favButton}
          color={
            state.currentFavPostsURLs.includes(post.data.permalink)
              ? "secondary"
              : "default"
          }
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostSummary
