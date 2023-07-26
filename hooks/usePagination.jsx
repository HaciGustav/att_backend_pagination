import React, { useCallback, useEffect, useState } from "react";
import useAtinaCalls from "./useAtinaCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setPageSize,
  setSortType,
  setTotalPages,
} from "@/redux/slices/tableUtilsSlice";

const usePagination = (table) => {
  const dispatch = useDispatch();
  const { mobileBookings } = useSelector((state) => state.atina);

  const { sortingParams, paginationParams } = useSelector(
    (state) => state.tableUtils[table]
  );

  const [params, setParams] = useState(null);

  const makeUrlParams = () => {
    let fields = "";
    let directions = "";

    if (Object.keys(sortingParams).length) {
      fields = Object.keys(sortingParams).join("%7C");
      directions = Object.values(sortingParams).join("%7C");
    }

    const PARAMS = `pageNumber=${paginationParams.currentPage}&pageSize=${paginationParams.pageSize}&sortingFields=${fields}&sortingDirections=${directions}`;
    const PAGI_STRING = `pageNumber=${paginationParams.currentPage}&pageSize=${paginationParams.pageSize}`;
    const SORT_STRING = `pageNumber=${paginationParams.currentPage}&pageSize=${paginationParams.pageSize}`;
    // dispatch(makePaginationParamsString({ str: PAGI_STRING }));
    // dispatch(makeSortParamsString({ str: SORT_STRING }));
    setParams(PARAMS);
    return PARAMS;
  };

  //! SORT HANDLING FUNCTIONS

  const singleSort = (column) => {
    if (!sortingParams[column.id]) {
      const tempObj = { [column.id]: "asc" };
      dispatch(setSortType({ field: tempObj }));
    } else if (sortingParams[column.id] === "asc") {
      const tempObj = { [column.id]: "desc" };
      dispatch(setSortType({ field: tempObj }));
    } else {
      const tempObj = { ...sortingParams };
      delete tempObj[column.id];
      dispatch(setSortType({ field: tempObj }));
    }
  };

  const multiSort = (column) => {
    if (!sortingParams[column.id]) {
      const tempObj = { ...sortingParams, [column.id]: "asc" };
      dispatch(setSortType({ field: tempObj }));
    } else if (sortingParams[column.id] === "asc") {
      const tempObj = { ...sortingParams, [column.id]: "desc" };
      dispatch(setSortType({ field: tempObj }));
    } else {
      const tempObj = { ...sortingParams, [column.id]: null };
      dispatch(setSortType({ field: tempObj }));
    }
  };

  const handleSortParams = (column, e) => {
    if (e.ctrlKey) {
      multiSort(column);
    } else {
      singleSort(column);
    }
  };

  //! PAGINATION HANDLING FUNCTIONS

  const handlePaginationParams = () => {
    if (!Object.keys(mobileBookings).length) return;

    dispatch(setTotalPages({ total: mobileBookings?.totalPages }));
  };
  const handleNextPage = () => {
    dispatch(setCurrentPage({ number: paginationParams.currentPage + 1 }));
  };
  const handlePreviousPage = () => {
    dispatch(setCurrentPage({ number: paginationParams.currentPage - 1 }));
  };
  const handlePageSize = (size) => {
    dispatch(setPageSize({ size }));
  };

  const gotoPage = (pgNumber) => {
    dispatch(setCurrentPage({ number: pgNumber }));
  };

  return {
    handleSortParams,
    handleNextPage,
    handlePageSize,
    makeUrlParams,
    handlePaginationParams,
    handlePreviousPage,
    gotoPage,
  };
};

export default usePagination;
