import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { List, Button } from "@material-ui/core"
import AppContext from "./contexts.js"

const useStyles = makeStyles((theme) => ({
  posts: {
    color: "white",
    margin: 12,
  },
  moreButton: {
    width: 410,
  },
}))

const PostList = () => {
  const classes = useStyles()
  const { state, dispatch } = React.useContext(AppContext)

  return (
    <>
      <List className={classes.posts}>
        {/*      {state.currentArticles.map((article, index) => (
        <Article key={index} article={article} />
      ))}*/}
      </List>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.moreButton}
        // onClick={loadMoreOnClick}
      >
        LOAD MORE
      </Button>
    </>
  )
}

export default PostList
