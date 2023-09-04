import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Collapse } from "@mui/material";

const TableSkeleton = ({ getTableBodyProps, page, loading }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    // <Fade in={loading} timeout={450}>
    <Collapse in={loading} timeout={50} unmountOnExit>
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          height: "60vh",
          left: 0,
          opacity: loading ? 1 : 0,
          transition: "1s",
        }}
      >
        {arr.map((row, i) => (
          <Box key={i} sx={{ width: "100%", display: "flex" }}>
            {arr.map((cell, i) => (
              <Box
                key={i}
                sx={{
                  borderRight: "1px solid #999",
                  width: "10%",
                  height: 58,
                  diplay: "grid",
                  placeItems: "center",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "0.5rem" }}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "0.5rem", width: "50%" }}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Collapse>
    // </Fade>
  );
};

export default TableSkeleton;
{
  /* <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => (
            <TableRow key={i} {...row?.getRowProps()}>
              {row?.cells?.map((cell, i) => (
                <TableCell
                  key={i}
                  sx={{ borderRight: "1px solid #999" }}
                  {...cell?.getCellProps()}
                >
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "0.5rem" }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "0.5rem", width: "50%" }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody> */
}
