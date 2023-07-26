import React, { memo, useState } from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import ImageModal from "../../modals/ImageModal";
const BookingImages = ({ file, fileArr, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        display: "inline-block",
        p: 0.8,
        marginInline: 0.5,
        borderRadius: "8px",
        display: "flex",
        position: "relative",
      }}
    >
      <ImageModal
        open={open}
        setOpen={setOpen}
        fileArr={fileArr}
        index={index}
      />
      <img
        onClick={() => setOpen(true)}
        style={{
          maxHeight: "10rem",
          cursor: "pointer",
          outline: "1px solid #888",
          outlineOffset: "2px",
          borderRadius: "8px",
        }}
        src={file?.path}
      />
      <span
        style={{
          position: "absolute",
          backgroundColor: "#00000077",
          paddingInline: "8px",
          borderRadius: " 0 0 12px 12px",
          right: 3.5,
          left: 3.5,
          bottom: 3.5,
          textAlign: "center",
          color: "#fff",
        }}
      >
        {file?.type}
      </span>
    </Box>
  );
};

export default BookingImages;
