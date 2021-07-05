import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"
import Header from "./header"
import Footer from "./footer"
import Post from "./post"
import PostList from "./post_list"
import Loading from "./loading"
import AppContext, { POST_LIST_PAGE_TYPE } from "./contexts.js"

const useStyles = makeStyles({
  home: {
    textAlign: "center",
    backgroundColor: "#282c34",
    minHeight: "100vh",
    color: "white",
  },
  divider: {
    margin: 10,
  },
})

const Home = () => {
  const classes = useStyles()
  const [init, setInit] = React.useState(false)
  const { state } = React.useContext(AppContext)

  React.useEffect(() => setTimeout(() => setInit(true), 500), [])

  return (
    <Box
      className={classes.home}
      flexDirection="column"
      display="flex"
      alignItems="center"
      flexGrow={1}
    >
      {init ? (
        <>
          <Header />
          {state.currentPageType === POST_LIST_PAGE_TYPE ? (
            <PostList />
          ) : (
            <Post />
          )}
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </Box>
  )
}

export default Home
