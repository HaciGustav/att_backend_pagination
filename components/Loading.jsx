"use client";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <>
      <Backdrop
        sx={{
          backgroundColor: "#000000dd",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 3,
        }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Loading;
