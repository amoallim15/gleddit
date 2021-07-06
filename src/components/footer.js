import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { CssBaseline, Typography, Box } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(8),
    backgroundColor: "#282c34",
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer>
      <Box display="flex" className={classes.root}>
        {" "}
        <CssBaseline />
        <Typography variant="body1">
          Ali Moallim - amoallim15@gmail.com
        </Typography>
      </Box>
    </footer>
  )
}

export default Footer
