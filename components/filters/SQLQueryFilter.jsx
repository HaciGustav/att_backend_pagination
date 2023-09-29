import React, { useEffect, useRef, useState } from "react";
import { filterStyles } from "@/styles/filter_styles";
import { Box, Button, Collapse, Paper, TextField } from "@mui/material";
import FilterHead from "./filter_components/FilterHead";
import SQLHighlightInput from "./filter_components/SQLHighlightInput";

const SQLQueryFilter = ({ handleSubmit, dataCount }) => {
  const [sqlQuery, setSqlQuery] = useState(
    "SELECT TOP 150 * FROM ATINA_MobileBookings"
  );
  const [openEditor, setOpenEditor] = useState(false);

  return (
    <Box component={Paper} style={filterStyles.container}>
      <FilterHead
        open={openEditor}
        setOpen={setOpenEditor}
        pageTitle="SQL Editor"
      />
      <Collapse
        component="form"
        onSubmit={(e) => handleSubmit(e, sqlQuery)}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "end",
          rowGap: "8px",
          paddingInline: "1rem",
          position: "relative",
        }}
        in={openEditor}
        timeout={350}
        unmountOnExit
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            rowGap: "8px",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            minHeight: "10rem",
          }}
        >
          <SQLHighlightInput sqlQuery={sqlQuery} setSqlQuery={setSqlQuery} />
        </div>
      </Collapse>
    </Box>
  );
};

export default SQLQueryFilter;
