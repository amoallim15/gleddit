import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { CssBaseline, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(8),
    width: "100%",
    backgroundColor: "#282c34",
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <CssBaseline />
      <Typography variant="body1">
        Ali Moallim - amoallim15@gmail.com
      </Typography>
    </footer>
  )
}

export default Footer
