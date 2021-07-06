import React from "react"
import SearchBar from "./searchbar"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tabs,
  Tab,
  Paper,
} from "@material-ui/core/"
import PersonIcon from "@material-ui/icons/Person"
import { makeStyles } from "@material-ui/core/styles"
import FavoriteIcon from "@material-ui/icons/Favorite"
import PublicIcon from "@material-ui/icons/Public"
import RefreshIcon from "@material-ui/icons/Refresh"
import AppContext, {
  DISCOVERY_PAGE_ID,
  FAVORITE_PAGE_ID,
  PROFILE_PAGE_ID,
  HOT_SUB_PAGE_ID,
  TOP_SUB_PAGE_ID,
  NEW_SUB_PAGE_ID,
} from "./contexts.js"

const useStyles = makeStyles((theme) => ({
  refreshButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    width: "100%",
  },
}))

const Header = () => {
  const classes = useStyles()
  const { state, dispatch } = React.useContext(AppContext)
  const handleTabChange = (event, page_id) => {
    dispatch({ type: "navigate", payload: page_id })
  }
  const handleSubTabChange = (event, page_id) => {
    dispatch({ type: "discovery", payload: page_id })
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.refreshButton}
          >
            <RefreshIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Gleddit - The best of what Gleddit has to offer
          </Typography>
          <SearchBar />
          <Box flexGrow="1" />
          <Tabs value={state.currentPageID} onChange={handleTabChange}>
            <Tab
              label="Discovery"
              index={DISCOVERY_PAGE_ID}
              icon={<PublicIcon />}
            />
            <Tab
              label="Favorites"
              index={FAVORITE_PAGE_ID}
              icon={<FavoriteIcon />}
            />
            <Tab
              label="Profile"
              disabled
              index={PROFILE_PAGE_ID}
              icon={<PersonIcon />}
            />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Paper
        elevation={0}
        square
        className={classes.paper}
        hidden={state.currentPageID !== DISCOVERY_PAGE_ID}
      >
        <Box display="flex" justifyContent="center">
          <Tabs value={state.currentPageSubID} onChange={handleSubTabChange}>
            <Tab label="Hot" index={HOT_SUB_PAGE_ID} />
            <Tab label="Top" index={TOP_SUB_PAGE_ID} />
            <Tab label="New" index={NEW_SUB_PAGE_ID} />
          </Tabs>
        </Box>
      </Paper>
    </>
  )
}

export default Header
