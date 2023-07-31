import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useMemo, useState } from "react";
import BookingsFilter from "../filters/BookingsFilter";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import Tooltip from "@mui/material/Tooltip";
import { tableStyles } from "@/styles/table_styles";
import BookingsTableRow from "../table_rows/BookingsTableRow";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BookingsModal from "../modals/BookingsModal";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import { useSelector } from "react-redux";
import useColumns from "@/hooks/useColumns";
import ErrorModal from "../modals/ErrorModal";
import CustomTableHead from "./table_heads/CustomTableHead";
import CustomTableBody from "./table_bodies/CustomTableBody";
import useTableUtils from "@/hooks/table_hooks/useTableUtils";
import SSR_Pagination from "../SSR_Pagination";
import usePagination from "@/hooks/usePagination";
import Loading_Icon from "../Loading_Icon";
import useFilters from "@/hooks/useFilters";

// import axios from "axios";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
  point: "",
};

const bookingsFilterParams = {
  id: null,
  bookingType: null,
  street: null,
  streetnumber: null,
  zip: null,
  city: null,
  country: null,
  nfcTagID: null,
  nfcTagInfo: null,
  userID: null,
  itemID: null,
  username: null,
  dateFrom: null,
  dateTo: null,
  timeFrom: null,
  timeTo: null,
};

const MobileBookings = () => {
  const { BUCHUNGEN_TABLE_COLUMNS } = useColumns();
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [allData, setAllData] = useState([]);
  const [resetResize, setResetResize] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [filterVal, setFilterVal] = useState(bookingsFilterParams);

  //! User Credentials State ▼▼▼▼▼▼
  const { user } = useSelector((state) => state.settings);
  //! Bookings Data and Relevants ▼▼▼▼▼▼
  const { bookingTypes, errorMsg, error, mobileBookings, loading } =
    useSelector((state) => state.atina);

  //! Pagination, Sorting and Filtering State ▼▼▼▼▼▼
  const { paginationParams, sortingParams, filterParams, searchTrigger } =
    useSelector((state) => state.tableUtils.bookings);

  //#region //! Custom Hooks ▼▼▼▼▼▼
  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);
  const { getBookingTypes, getMobileBookingsData } = useAtinaCalls();
  const { filterBookings, resetFilter } = useFilters();
  const { handleSortParams, makeUrlParams, handlePaginationParams } =
    usePagination("bookings");

  const defaultColumn = useMemo(
    () => ({
      minWidth: 75,
      width: 130,
      maxWidth: 400,
    }),
    []
  );
  const tableColumns = useMemo(
    () => BUCHUNGEN_TABLE_COLUMNS,
    [bookingTypes, hiddenColumns]
  );
  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page,
    prepareRow,
    allColumns,
    resetResizing,
    state,
  } = useTableUtils(tableColumns, allData, defaultColumn, hiddenColumns);
  //#endregion //! Custom Hooks ▲▲▲▲▲▲

  const getTableBodyPropsMemo = useCallback(() => getTableBodyProps(), []);

  //#region ===Table Filter START===
  const handleFilter = useCallback(
    (e) => {
      e.preventDefault();
      filterBookings(filterVal, setFilterVal);
    },
    [filterVal]
  );

  const handleReset = useCallback(() => {
    setFilterVal(bookingsFilterParams);
    resetFilter();
  }, []);
  //#endregion

  useEffect(() => {
    const params = makeUrlParams();
    getMobileBookingsData(params + filterParams);
    console.log("RENDER");
    console.log(sortingParams);
  }, [paginationParams, sortingParams, filterParams, searchTrigger]);

  useEffect(() => {
    if (!mobileBookings?.entries) return;
    setAllData(mobileBookings?.entries);
  }, [mobileBookings]);

  useEffect(() => {
    getBookingTypes();
    const x = localStorage.getItem("hiddenColumns/mobile-bookings");
    setHiddenColumns(JSON.parse(x));
  }, []);

  return (
    <>
      <BookingsModal
        openBookingModal={openBookingModal}
        setOpenBookingModal={setOpenBookingModal}
      />

      {error && <ErrorModal error={errorMsg} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {contextMenu.show && (
          <ContextMenu
            allColumns={allColumns}
            X={contextMenu.x}
            Y={contextMenu.y}
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
            setOpenModal={setOpenBookingModal}
            tableColumns={tableColumns}
            state={state}
          />
        )}
        <TableContainer component={Paper} sx={tableStyles.tableContainer}>
          <BookingsFilter
            handleReset={handleReset}
            handleFilter={handleFilter}
            filterVal={filterVal}
            setFilterVal={setFilterVal}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              columnGap: "15px",
            }}
          >
            {loading && <Loading_Icon />}

            <SSR_Pagination
              paginationParams={paginationParams}
              totalPages={mobileBookings?.totalPages}
              table={"bookings"}
            />

            <Tooltip title="Spaltengröße rückgängig machen" arrow>
              <IconButton
                onClick={() => {
                  resetResizing();
                  setResetResize(!resetResize);
                }}
              >
                <UndoIcon />
              </IconButton>
            </Tooltip>

            <DownloadCSV rawData={allData} fileName={"mobile_buchungen"} />
            {user?.isAdmin && (
              <Tooltip title="Neuen Datensatz anlegen" arrow>
                <IconButton onClick={() => setOpenBookingModal(true)}>
                  <AddCircleIcon
                    sx={{
                      borderRadius: "10px",
                      color: "green",
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <Table
            {...getTableProps()}
            sx={{ minWidth: 650 }}

            // onContextMenu={handleRightClick}
          >
            <CustomTableHead
              headerGroups={headerGroups}
              resetResize={resetResize}
              setResetResize={setResetResize}
              handleRightClick={handleRightClick}
              handleSortParams={handleSortParams}
            />
            <CustomTableBody
              resetResize={resetResize}
              getTableBodyProps={getTableBodyPropsMemo}
              prepareRow={prepareRow}
              page={page}
              TableRow={BookingsTableRow}
              handleRightClick={handleRightClick}
            />
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MobileBookings;
