import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"
import Header from "./header"
import Footer from "./footer"
import Post from "./post"
import PostList from "./post_list"
import Loading from "./loading"
import AppContext, { POST_PAGE_ID } from "./contexts.js"
import { refreshToken } from "./api"

const useStyles = makeStyles({
  home: {
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
  const { state, dispatch } = React.useContext(AppContext)

  React.useEffect(() => {
    ;(async () => {
      const token = await refreshToken()
      dispatch({ type: "refresh_token", payload: token })
      setTimeout(() => setInit(true), 200)
    })()
  }, [])

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
          <div hidden={state.currentPageID === POST_PAGE_ID}>
            <PostList />
          </div>
          <div hidden={state.currentPageID !== POST_PAGE_ID}>
            <Post />
          </div>
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </Box>
  )
}

export default Home
