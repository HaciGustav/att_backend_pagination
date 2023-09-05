import { Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

const Loading = ({ init }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 600);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Fade in={loading} timeout={350}>
      <Backdrop
        sx={{
          backgroundColor: "#000000ef",
          filter: "blur(1px)",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 3,
        }}
        open={true}
      >
        <CircularProgress color="inherit" size={45} />
      </Backdrop>
    </Fade>
  );
};

export default Loading;
