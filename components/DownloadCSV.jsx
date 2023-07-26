"use client";

import React, { useState } from "react";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import {
  bookingsTableCSV,
  itemsTableCSV,
  nfcTableCSV,
  userTableCSV,
} from "@/helpers/DownloadCsvFunctions";

const DownloadCSV = ({ rawData, fileName, type }) => {
  const date = new Date().toJSON().slice(0, 10).replaceAll("-", "");
  const [url, setUrl] = useState("");

  const editData = (arr) => {
    let newArr = [...arr];
    newArr.forEach((element, i) => {
      let el = element.toLowerCase();
      if (el === "id" || el === "externaluserid" || el === "isadministrator") {
        newArr = newArr.splice(i, 1);
        // console.log(el);
      }
    });
  };

  const convertJsonToCsv = () => {
    let headers;
    let main;
    let res;
    // const h = Object.keys(rawData[0]).join(";").toUpperCase();
    // // const h = Object.keys(rawData[0]);
    // editData(h);
    // const main = rawData.map((item) => Object.values(item).join(";"));

    switch (fileName) {
      case "benutzer":
        res = userTableCSV(rawData);
        headers = res.h;
        main = res.m;
        break;
      case "mobile_buchungen":
        res = bookingsTableCSV(rawData);
        headers = res.h;
        main = res.m;
        break;
      case "nfc_tags":
        res = nfcTableCSV(rawData);
        headers = res.h;
        main = res.m;
        break;
      case "items":
        res = itemsTableCSV(rawData, type);

        headers = res.h;
        main = res.m;
        break;

      default:
        return;
    }
    const csv = [headers, ...main].join("\n");
    console.table(csv);
    const blob = new Blob([csv], { type: "application/csv" });
    const url = URL.createObjectURL(blob);
    setUrl(url);
  };
  return (
    <>
      {rawData && (
        <Tooltip
          title="CSV Datei Herunterladen"
          arrow
          sx={{ display: "flex", alignItems: "center" }}
          onClick={() => rawData && convertJsonToCsv()}
          // onClick={() => userTableCSV(rawData)}
        >
          <a
            href={url}
            download={`${date + "_" + fileName}.csv`}
            style={{
              color: "#888",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton>
              <DownloadForOfflineIcon fontSize="medium" />
            </IconButton>
          </a>
        </Tooltip>
      )}
    </>
  );
};

export default DownloadCSV;
