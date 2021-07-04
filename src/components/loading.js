import React from "react"
import { CircularProgress, Box } from "@material-ui/core"

const Loading = () => {
  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <CircularProgress color="secondary" />
    </Box>
  )
}

export default Loading
