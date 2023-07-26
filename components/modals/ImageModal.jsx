import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { memo, useEffect, useMemo, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
const ImageModal = ({ open, setOpen, index, fileArr }) => {
  const style = useMemo(() => ({
    card: {
      minWidth: 500,
      maxHeight: "100%",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 2,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      // alignItems: "center",
      borderRadius: "8px",
      position: "relative",
    },

    buttonWrapLeft: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      display: "grid",
      placeItems: "center",
      opacity: 0.2,
      backgroundColor: "#fff4",
      borderRadius: "8px 0 0 8px",
      transition: "0.2s",
      "&:hover": {
        opacity: 1,
      },
    },
    buttonWrapRight: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      display: "grid",
      placeItems: "center",
      transition: "0.2s",
      opacity: 0.2,
      backgroundColor: "#fff4",
      borderRadius: "0 8px 8px 0 ",
      "&:hover": {
        opacity: 1,
      },
    },
  }));

  const [imageIndex, setImageIndex] = useState(index);
  const [path, setPath] = useState("");
  const handleNextImage = () => {
    let total = fileArr.length - 1;
    if (imageIndex < total) {
      // let temp = imageIndex
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };
  const handlePrevImage = () => {
    let total = fileArr.length - 1;
    if (imageIndex > 0) {
      // let temp = imageIndex
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(total);
    }
  };
  useEffect(() => {
    setPath(fileArr[imageIndex]?.path);
  }, [imageIndex]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Box component={Paper} sx={style.card}>
        <Box sx={style.buttonWrapLeft} onClick={handlePrevImage}>
          <IconButton>
            <NavigateBeforeIcon />
          </IconButton>
        </Box>
        <img
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "70vh",
            width: "auto",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "-2px 19px 48px -24px rgba(66, 68, 90, 1)",
          }}
          src={path}
        />
        <Box sx={style.buttonWrapRight} onClick={handleNextImage}>
          <IconButton>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(ImageModal);
