import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"
import Header from "./header"
import Footer from "./footer"
import Discovery from "./discovery"
import Search from "./search"
import Favorites from "./favorites"
import Loading from "./loading"
import { updateToken } from "./api"
import AppContext, {
  DISCOVERY_PAGE_ID,
  FAVORITE_PAGE_ID,
  SEARCH_PAGE_ID,
} from "./contexts.js"

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
  const { state, dispatch } = React.useContext(AppContext)

  React.useEffect(() => {
    ;(async () => await updateToken())()
    setTimeout(() => setInit(true), 200)
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
          <Discovery hidden={state.currentPageID != DISCOVERY_PAGE_ID} />
          <Search hidden={state.currentPageID != FAVORITE_PAGE_ID} />
          <Favorites hidden={state.currentPageID != SEARCH_PAGE_ID} />
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </Box>
  )
}

export default Home
