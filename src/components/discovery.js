import React from "react"
import { Paper, Toolbar, Tabs, Tab, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AppContext, {
  HOT_SUB_PAGE_ID,
  TOP_SUB_PAGE_ID,
  NEW_SUB_PAGE_ID,
} from "./contexts.js"

const useStyles = makeStyles((theme) => ({
  refreshButton: {
    marginRight: theme.spacing(2),
  },
  subTabs: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
}))
const Discovery = ({ hidden }) => {
  const classes = useStyles()
  const { state, dispatch } = React.useContext(AppContext)
  const handleChange = (event, page_id) => {
    dispatch({ type: "discovery", payload: page_id })
  }
  if (hidden) return <></>
  return (
    <>
      <Paper elevation={0} square className={classes.subTabs}>
        <Tabs value={state.currentPageSubID} onChange={handleChange}>
          <Tab label="Hot" index={HOT_SUB_PAGE_ID} />
          <Tab label="Top" index={TOP_SUB_PAGE_ID} />
          <Tab label="New" index={NEW_SUB_PAGE_ID} />
        </Tabs>
      </Paper>
    </>
  )
}

export default Discovery
