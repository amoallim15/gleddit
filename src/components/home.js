import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"
import { ContextProvider } from "./contexts"
import Header from "./header"
import Footer from "./footer"
import Discovery from "./discovery"
import Search from "./search"
import Favorites from "./favorites"
import Loading from "./loading"
import { updateToken } from "./api"

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

  React.useEffect(() => {
    ;(async () => await updateToken())()
    setTimeout(() => setInit(true), 200)
  }, [])

  return (
    <ContextProvider>
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
            <Discovery />
            <Search />
            <Favorites />
            <Footer />
          </>
        ) : (
          <Loading />
        )}
      </Box>
    </ContextProvider>
  )
}

export default Home
