import {
  setCurrentPage,
  setFilterParams,
  setSearchTrigger,
} from "@/redux/slices/tableUtilsSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { useDispatch } from "react-redux";

const useFilters = () => {
  const dispatch = useDispatch();
  const adapterDayjs = new AdapterDayjs();

  const filterBookings = (filterVal, setFilterVal) => {
    const isDateFromValid = adapterDayjs.isValid(filterVal.dateFrom);
    const isDateToValid = adapterDayjs.isValid(filterVal.dateTo);
    const currentValues = {
      ...filterVal,
      dateFrom: isDateFromValid ? filterVal.dateFrom : null,
      dateTo: isDateToValid ? filterVal.dateTo : null,
    };
    setFilterVal({
      ...filterVal,
      dateFrom: isDateFromValid ? filterVal.dateFrom : null,
      dateTo: isDateToValid ? filterVal.dateTo : null,
    });

    const {
      bookingType,
      itemType,
      street,
      streetnumber,
      itemNumber,
      zip,
      city,
      country,
      username,
      // personelNumber,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      data1,
      data2,
      data3,
      data4,
      data5,
    } = currentValues;

    // let base = `https://pbsolutions.dev/atina/api/AtinaMobileBookings?`;
    let base = "";

    if (bookingType) {
      base += `&bookingType=${bookingType}`;
    }
    if (itemNumber) {
      base += `&itemnumber=${itemNumber}`;
    }
    if (street) {
      base += `&street=${street}`;
    }
    if (streetnumber) {
      base += `&streetnumber=${streetnumber}`;
    }
    if (zip) {
      base += `&zip=${zip}`;
    }
    if (city) {
      base += `&city=${city}`;
    }
    if (country) {
      base += `&country=${country}`;
    }

    if (username) {
      base += `&userName=${username}`;
    }
    if (itemType) {
      base += `&itemType=${itemType}`;
    }

    if (dateFrom) {
      const editedDate = new Date(dateFrom)
        .toLocaleDateString("sv")
        .replaceAll("-", "");
      // console.log(editedDate);
      base += `&dateFrom=${editedDate}`;
    }
    if (dateTo) {
      const editedDate = new Date(dateTo)
        .toLocaleDateString("sv")
        .replaceAll("-", "");
      // console.log(editedDate);
      base += `&dateTo=${editedDate}`;
    }
    if (timeFrom) {
      base += `&timeFrom=${timeFrom}`;
    }
    if (timeTo) {
      base += `&timeTo=${timeTo}`;
    }
    if (data1) {
      base += `&data1=${data1}`;
    }
    if (data2) {
      base += `&data2=${data2}`;
    }
    if (data3) {
      base += `&data3=${data3}`;
    }
    if (data4) {
      base += `&data4=${data4}`;
    }
    if (data5) {
      base += `&data5=${data5}`;
    }

    dispatch(setFilterParams({ params: base, table: "bookings" }));
    dispatch(setCurrentPage({ number: 1, table: "bookings" }));
    dispatch(setSearchTrigger({ table: "bookings" }));

    return base;
  };
  const filterItems = (filterVal) => {
    const {
      type,
      filterOptions,
      id,
      itemType,
      itemID,
      itemNumber,
      street,
      streetnumber,
      zip,
      city,
      country,
      data1,
      data2,
      data3,
      data4,
      data5,
    } = filterVal;

    let base = "";

    if (id) {
      base += `&ID=${id}`;
    }
    if (itemType) {
      base += `&ItemType=${itemType}`;
    }
    if (itemID) {
      base += `&ItemId=${itemID}`;
    }
    if (itemNumber) {
      base += `&ItemNumber=${itemNumber}`;
    }
    if (filterOptions) {
      base += `&filterOptions=${filterOptions}`;
    }
    if (street) {
      base += `&Street=${street}`;
    }
    if (streetnumber) {
      base += `&Streetnumber=${streetnumber}`;
    }
    if (zip) {
      base += `&Zip=${zip}`;
    }
    if (city) {
      base += `&City=${city}`;
    }
    if (country) {
      base += `&Country=${country}`;
    }
    if (data1) {
      base += `&Data1=${data1}`;
    }
    if (data2) {
      base += `&Data2=${data2}`;
    }
    if (data3) {
      base += `&Data3=${data3}`;
    }
    if (data4) {
      base += `&Data4=${data4}`;
    }
    if (data5) {
      base += `&Data5=${data5}`;
    }

    dispatch(setFilterParams({ params: base, table: "items" }));
    dispatch(setCurrentPage({ number: 1, table: "items" }));
    dispatch(setSearchTrigger({ table: "items" }));

    return base;
  };
  const resetFilter = (table) => {
    dispatch(setFilterParams({ params: "", table }));
  };

  return { filterBookings, resetFilter, filterItems };
};

export default useFilters;
