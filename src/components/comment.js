import React from "react"
import { format } from "timeago.js"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core"
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown"
import CommentIcon from "@material-ui/icons/Comment"

const useStyles = makeStyles({
  root: {
    maxWidth: 510,
    marginBottom: 20,
  },
})

const Comment = ({ comment, index }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        subheader={`Posted By u/${comment.data.author} ${format(
          comment.data.created * 1000
        )}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {comment.data.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton disabled>
          <ThumbsUpDownIcon />
        </IconButton>
        <span>{comment.data.score}</span>
        <IconButton disabled>
          <CommentIcon />
        </IconButton>
        <span>
          {comment.data.replies ? comment.data.replies.data.children.length : 0}
        </span>
      </CardActions>
    </Card>
  )
}

export default Comment
