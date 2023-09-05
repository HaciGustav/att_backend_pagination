import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Fade } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { useSelector } from "react-redux";

const CustomTableBody = ({
  getTableBodyProps,
  prepareRow,
  page,
  resetResize,
  TableRow,
  handleRightClick,
}) => {
  const { loading } = useSelector((state) => state.atina);
  return (
    <>
      <TableSkeleton
        loading={loading}
        getTableBodyProps={getTableBodyProps}
        page={page}
      />

      {/* <Fade in={!loading} timeout={450}> */}
      <TableBody
        {...getTableBodyProps()}
        onContextMenu={(e) => handleRightClick(e, "body")}
        sx={{
          opacity: loading ? 0 : 1,
          transition: "0.7s",
        }}
      >
        {page?.map((row, i) => {
          prepareRow(row);

          return (
            <TableRow
              resetResize={resetResize}
              key={i}
              row={row}
              prepareRow={prepareRow}
            />
          );
        })}
      </TableBody>
      {/* </Fade> */}
    </>
  );
};

export default CustomTableBody;

//!BACKUP
{
  /* <TableBody
{...getTableBodyProps()}
onContextMenu={(e) => handleRightClick(e, "body")}
>
{page?.map((row, i) => {
  prepareRow(row);
  return (
    <TableRow
      resetResize={resetResize}
      key={i}
      row={row}
      prepareRow={prepareRow}
    />
  );
})}
</TableBody> */
}
/* 

 const Row = ({ index, style }) => {
    const row = page[index] || {};

    return (
      <span style={style}>
        <TableRow
          resetResize={resetResize}
          key={index}
          row={row}
          prepareRow={prepareRow}
        />
      </span>
    );
  };



<TableBody
sx={{ width: "100%", height: "100vh" }}
{...getTableBodyProps()}
onContextMenu={(e) => handleRightClick(e, "body")}
>
<AutoSizer>
  {({ height, width }) => (
    <List
      height={height}
      itemCount={page.length}
      itemSize={50}
      width={width}
    >
      {Row}
    </List>
  )}
</AutoSizer>
</TableBody> */
